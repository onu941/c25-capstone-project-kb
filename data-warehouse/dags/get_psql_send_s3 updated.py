import os, json, boto3, pathlib, psycopg2, requests, datetime
import pandas as pd
from airflow import DAG
from pathlib import Path
import airflow.utils.dates
from airflow.sensors.python import PythonSensor
from airflow.operators.python import PythonOperator

dag = DAG(
    dag_id="get_psql_send_s3_updated",
    start_date=airflow.utils.dates.days_ago(1),
    schedule_interval="0 * * FRI",)

def _wait_for_csv(filepath):
    return Path(filepath).exists()

def _send_csv_s3():
    with open("/opt/airflow/dags/configuration.json","r") as output:
        configurations = json.load(output)

    s3_client = boto3.client(
        service_name=configurations["service_name"],
        region_name=configurations["region_name"],
        aws_access_key_id=configurations["aws_access_key_id"],
        aws_secret_access_key=configurations["aws_secret_access_key"])

    s3_client.upload_file(
        f"/tmp/csv/staging_{var}.csv",
        configurations["bucket_name"],
        f"staging_{var}-{datetime.datetime.now()}.csv")

    os.remove(f"/tmp/csv/staging_{var}.csv")

def _fetch_psql_save_csv(file_path):
    # csv_path_list = csv_path.split('/')
    # csv_file_name = csv_path_list.pop()
    # if not os.path.exists(os.path.join(csv_path_list)):
    #     os.mkdir(os.path.join(csv_path_list))
    conn = psycopg2.connect(database="data_warehouse", user="postgres", password="postgres", host="data_warehouse_db", port="5432")
    cursor = conn.cursor()
    cursor.execute(f"""SELECT * FROM staging_{var}""")
    rows = cursor.fetchall()
    conn.commit()
    df = pd.concat([
        pd.DataFrame(rows)
        ], ignore_index=True)
    df.to_csv(f"/tmp/csv/staging_{var}.csv", index=False)
    print(f"{var}-CSV saved!")
    cursor.close()
    conn.close()

# Poke interval is for every 30 seconds check
# timeout is to prevent sensor deadlock
# mode is reschedule to make free of the sensor's slot if it is not poking.

fetch_psql_save_csv = PythonOperator(
    task_id="fetch_psql_save_csv",
    python_callable=_fetch_psql_save_csv,
    op_kwargs={"file_path":"/tmp/csv"},
    dag=dag)

wait_for_csv = PythonSensor(
    task_id="wait_for_csv",
    python_callable=_wait_for_csv,
    poke_interval=30,
    timeout=24*60*60,
    mode="reschedule",
    op_kwargs={f"filepath":"/tmp/csv/staging_{var}.csv"},
    dag=dag)

send_csv_s3 = PythonOperator(
    task_id="send_csv_s3",
    python_callable=_send_csv_s3,
    dag=dag)



for i in range (1, 4):
    arr = ['booking','registered_partyroom','registered_users']
    var = arr[i-2]
    fetch_psql_save_csv >> wait_for_csv >> send_csv_s3