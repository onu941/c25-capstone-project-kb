import os, json, boto3, pathlib, psycopg2, requests, datetime
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

def _wait_for_csv_booking(filepath):
    return Path(filepath).exists()

def _wait_for_csv_partyroom(filepath):
    return Path(filepath).exists()

def _wait_for_csv_user(filepath):
    return Path(filepath).exists()

def _send_csv_s3_booking():
    with open("/opt/airflow/dags/configuration.json","r") as output:
        configurations = json.load(output)

    s3_client = boto3.client(
        service_name=configurations["service_name"],
        region_name=configurations["region_name"],
        aws_access_key_id=configurations["aws_access_key_id"],
        aws_secret_access_key=configurations["aws_secret_access_key"])

    s3_client.upload_file(
        f"/tmp/csv/staging_booking.csv",
        configurations["bucket_name"],
        f"staging_booking-{datetime.datetime.now()}.csv")

    os.remove("/tmp/csv/staging_booking.csv")

def _send_csv_s3_partyroom():
    with open("/opt/airflow/dags/configuration.json","r") as output:
        configurations = json.load(output)

    s3_client = boto3.client(
        service_name=configurations["service_name"],
        region_name=configurations["region_name"],
        aws_access_key_id=configurations["aws_access_key_id"],
        aws_secret_access_key=configurations["aws_secret_access_key"])

    s3_client.upload_file(
        f"/tmp/csv/staging_partyroom.csv",
        configurations["bucket_name"],
        f"staging_partyroom-{datetime.datetime.now()}")

    os.remove("/tmp/csv/staging_partyroom.csv")

def _send_csv_s3_user():
    with open("/opt/airflow/dags/configuration.json","r") as output:
        configurations = json.load(output)

    s3_client = boto3.client(
        service_name=configurations["service_name"],
        region_name=configurations["region_name"],
        aws_access_key_id=configurations["aws_access_key_id"],
        aws_secret_access_key=configurations["aws_secret_access_key"])

    s3_client.upload_file(
        f"/tmp/csv/staging_user.csv",
        configurations["bucket_name"],
        f"staging_user-{datetime.datetime.now()}")

    os.remove("/tmp/csv/staging_user.csv")

def _fetch_psql_save_csv(file_path):
    # csv_path_list = csv_path.split('/')
    # csv_file_name = csv_path_list.pop()
    # if not os.path.exists(os.path.join(csv_path_list)):
    #     os.mkdir(os.path.join(csv_path_list))
    conn = psycopg2.connect(database="data_warehouse", user="postgres", password="postgres", host="data_warehouse_db", port="5432")
    cursor = conn.cursor()
    cursor.execute("""SELECT * FROM staging_booking""")
    booking_rows = cursor.fetchall()
    cursor.execute("""SELECT * FROM staging_registered_partyroom""")
    partyroom_rows = cursor.fetchall()
    cursor.execute("""SELECT * FROM staging_registered_users""")
    user_rows = cursor.fetchall()
    conn.commit()
    df_booking = pd.concat([
        pd.DataFrame(booking_rows)
        ], ignore_index=True)
    df_partyroom = pd.concat([
        pd.DataFrame(partyroom_rows)
        ], ignore_index=True)
    df_user = pd.concat([
        pd.DataFrame(user_rows)
        ], ignore_index=True)
    df_booking.to_csv("/tmp/csv/staging_booking.csv", index=False)
    df_partyroom.to_csv("/tmp/csv/staging_partyroom.csv", index=False)
    df_user.to_csv("/tmp/csv/staging_user.csv", index=False)
    print("CSV saved!")
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

wait_for_csv_booking = PythonSensor(
    task_id="wait_for_csv_booking",
    python_callable=_wait_for_csv_booking,
    poke_interval=30,
    timeout=24*60*60,
    mode="reschedule",
    op_kwargs={"filepath":"/tmp/csv/staging_booking.csv"},
    dag=dag)

wait_for_csv_partyroom = PythonSensor(
    task_id="wait_for_csv_partyroom",
    python_callable=_wait_for_csv_partyroom,
    poke_interval=30,
    timeout=24*60*60,
    mode="reschedule",
    op_kwargs={"filepath":"/tmp/csv/staging_partyroom.csv"},
    dag=dag)

wait_for_csv_user = PythonSensor(
    task_id="wait_for_csv_user",
    python_callable=_wait_for_csv_user,
    poke_interval=30,
    timeout=24*60*60,
    mode="reschedule",
    op_kwargs={"filepath":"/tmp/csv/staging_user.csv"},
    dag=dag)

send_csv_s3_booking = PythonOperator(
    task_id="send_csv_s3_booking",
    python_callable=_send_csv_s3_booking,
    dag=dag)

send_csv_s3_partyroom = PythonOperator(
    task_id="send_csv_s3_partyroom",
    python_callable=_send_csv_s3_partyroom,
    dag=dag)

send_csv_s3_user = PythonOperator(
    task_id="send_csv_s3_user",
    python_callable=_send_csv_s3_user,
    dag=dag)

fetch_psql_save_csv >> [wait_for_csv_booking, wait_for_csv_partyroom, wait_for_csv_user]
wait_for_csv_booking >> send_csv_s3_booking
wait_for_csv_partyroom >> send_csv_s3_partyroom
wait_for_csv_user >> send_csv_s3_user