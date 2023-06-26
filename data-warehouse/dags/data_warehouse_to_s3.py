import os, json, boto3, pathlib, psycopg2, requests
import pandas as pd
from airflow import DAG
from pathlib import Path
import airflow.utils.dates
from airflow.sensors.python import PythonSensor
from airflow.operators.python import PythonOperator

dag = DAG(
    dag_id="get_psql_send_s3",
    start_date=airflow.utils.dates.days_ago(1),
    schedule_interval=None)

def _wait_for_csv(filepath):
    return Path(filepath).exists()

def _send_csv_s3():
    with open("/tmp/conf_file/configurations.json","r") as output:
        configurations = json.load(output)

    s3_client = boto3.client(
        service_name=configurations["service_name"],
        region_name=configurations["region_name"],
        aws_access_key_id=configurations["aws_access_key_id"],
        aws_secret_access_key=configurations["aws_secret_access_key"])

    s3_client.upload_file(
        "/tmp/csv/staging_booking.csv",
        configurations["bucket_name"],
        configurations["file_name"])

    os.remove("/tmp/csv/staging_booking.csv")

def _fetch_psql_save_csv(file_path, csv_path):
    conn = psycopg2.connect(database="data_warehouse", user="postgres", password="postgres", host="postgres", port="5432")
    cursor = conn.cursor()
    cursor.execute("""SELECT * FROM staging_booking""")
    booking_rows = cursor.fetchall()
    cursor.execute("""SELECT * FROM staging_registered_partyroom""")
    partyroom_rows = cursor.fetchall()
    cursor.execute("""SELECT * FROM staging_registered_users""")
    user_rows = cursor.fetchall()
    conn.commit()
    df = pd.concat([
        pd.DataFrame(booking_rows),
        pd.DataFrame(partyroom_rows),
        pd.DataFrame(user_rows)
        ], ignore_index=True)
    df.to_csv(csv_path, index=False)
    print("CSV saved!")
    cursor.close()
    conn.close()

# Poke interval is for every 30 seconds check
# timeout is to prevent sensor deadlock
# mode is reschedule to make free of the sensor's slot if it is not poking.

fetch_psql_save_csv = PythonOperator(
    task_id="fetch_psql_save_csv",
    python_callable=_fetch_psql_save_csv,
    op_kwargs={"file_path":"/tmp/csv",
               "csv_path":"/tmp/csv/staging_booking.csv"},
    dag=dag)

wait_for_csv = PythonSensor(
    task_id="wait_for_csv",
    python_callable=_wait_for_csv,
    poke_interval=30,
    timeout=24*60*60,
    mode="reschedule",
    op_kwargs={"filepath":"/tmp/csv/staging_booking.csv"},
    dag=dag)

send_csv_s3 = PythonOperator(
    task_id="send_csv_s3",
    python_callable=_send_csv_s3,
    dag=dag)

fetch_psql_save_csv >> wait_for_csv >> send_csv_s3