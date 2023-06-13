# Import environment
from dotenv import load_dotenv
import os

load_dotenv()

AWS_ACCESS_KEY = os.getenv('AWS_ACCESS_KEY')
AWS_SECRET_KEY = os.getenv('AWS_SECRET_KEY')

POSTGRES_DB=os.getenv('POSTGRES_DB')
POSTGRES_USER=os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD=os.getenv("POSTGRES_PASSWORD")
POSTGRES_HOST=os.getenv("POSTGRES_HOST")

# Initialize Spark
from pyspark.sql import SparkSession
packages = [
    "com.amazonaws:aws-java-sdk-s3:1.12.95",
    "org.apache.hadoop:hadoop-aws:3.2.2",
    "org.apache.spark:spark-avro_2.12:2.4.4",
    "org.postgresql:postgresql:42.2.18"
]

spark = SparkSession.builder.appName("Transform Recent change stream")\
        .master('spark://localhost:7077')\
        .config("spark.jars.packages",",".join(packages))\
        .config("spark.hadoop.fs.s3a.access.key",AWS_ACCESS_KEY)\
        .config("spark.hadoop.fs.s3a.secret.key",AWS_SECRET_KEY)\
        .config("spark.hadoop.fs.s3a.impl","org.apache.hadoop.fs.s3a.S3AFileSystem")\
        .config("spark.hadoop.fs.s3a.multipart.size",104857600)\
        .getOrCreate()

# Load data from EC2

from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("LoadFromPostgres").getOrCreate()

url = "jdbc:postgresql://<EC2_IP_ADDRESS>:5432/<DATABASE_NAME>"
properties = {
    "user": "<USERNAME>",
    "password": "<PASSWORD>",
    "driver": "org.postgresql.Driver"
}

df = spark.read.jdbc(url=url, table="<TABLE_NAME>", properties=properties)

## Replace `<EC2_IP_ADDRESS>` with the public IP address of your EC2 instance, `<DATABASE_NAME>` with the name of your database, `<USERNAME>` with your database username, `<PASSWORD>` with your [database password](poe://www.poe.com/_api/key_phrase?phrase=database%20password&prompt=Tell%20me%20more%20about%20database%20password.), and `<TABLE_NAME>` with the name of the table that you want to load data from.

project_id = "<GCP_PROJECT_ID>"
dataset_id = "<BIGQUERY_DATASET_ID>"
table_name = "<BIGQUERY_TABLE_NAME>"
bucket_name = "<GCS_BUCKET_NAME>"
temp_folder = "gs://{}/temp".format(bucket_name)

df.write \
    .format("bigquery") \
    .option("temporaryGcsBucket", bucket_name) \
    .option("table", "{}.{}.{}".format(project_id, dataset_id, table_name)) \
    .mode("overwrite") \
    .save()

## Replace `<GCP_PROJECT_ID>` with your [GCP project](poe://www.poe.com/_api/key_phrase?phrase=GCP%20project&prompt=Tell%20me%20more%20about%20GCP%20project.) ID, `<BIGQUERY_DATASET_ID>` with the ID of the [BigQuery dataset](poe://www.poe.com/_api/key_phrase?phrase=BigQuery%20dataset&prompt=Tell%20me%20more%20about%20BigQuery%20dataset.) that you want to write data to, `<BIGQUERY_TABLE_NAME>` with the name of the [BigQuery table](poe://www.poe.com/_api/key_phrase?phrase=BigQuery%20table&prompt=Tell%20me%20more%20about%20BigQuery%20table.) that you want to write data to, and `<GCS_BUCKET_NAME>` with the name of a [GCS bucket](poe://www.poe.com/_api/key_phrase?phrase=GCS%20bucket&prompt=Tell%20me%20more%20about%20GCS%20bucket.) that you have access to.

# Transform our data to fit the staging table

df.createOrReplaceTempView('booking')

df = spark.sql("""
    SELECT
        user as user_text,
        EXTRACT(year from timestamp) as year,
        EXTRACT(month from timestamp) as month,
        EXTRACT(day from timestamp) as day,
        EXTRACT(hour from timestamp ) as hour,
        *
    FROM booking
""")

df = df.drop('_id').drop('timestamp').drop('user')

# Use spark to populate data into staging table.

df.write.format('jdbc')\
    .option('url',"jdbc:postgresql://{}/{}".format(POSTGRES_HOST,POSTGRES_DB))\
    .option('dbtable','staging_edit_pages')\
    .option('user',POSTGRES_USER)\
    .option('password',POSTGRES_PASSWORD)\
    .option('driver','org.postgresql.Driver')\
    .mode('append')\
    .save();