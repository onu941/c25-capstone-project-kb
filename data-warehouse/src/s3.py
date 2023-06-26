from pyspark.sql import SparkSession, DataFrame
from pyspark.sql.functions import lit
from dotenv import load_dotenv
import os
load_dotenv()

class Config_env:
    POSTGRES_DB=os.getenv('POSTGRES_DB')
    POSTGRES_USER=os.getenv("POSTGRES_USER")
    POSTGRES_PASSWORD=os.getenv("POSTGRES_PASSWORD")
    POSTGRES_HOST=os.getenv("POSTGRES_HOST")
    WAREHOUSE_DB=os.getenv("WAREHOUSE_DB")
    WAREHOUSE_USER=os.getenv("WAREHOUSE_USER")
    WAREHOUSE_PASSWORD=os.getenv("WAREHOUSE_PASSWORD")
    WAREHOUSE_HOST=os.getenv("WAREHOUSE_HOST")
    AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
    AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")

cfg = Config_env()

# Prepare environment
def prepare_env(cfg: Config_env):
    global spark
    packages = [
        "com.amazonaws:aws-java-sdk-s3:1.12.95",
        "org.apache.hadoop:hadoop-aws:3.2.2",
        "org.apache.spark:spark-avro_2.12:3.3.0",
        "org.postgresql:postgresql:42.2.18"
    ]

    spark = SparkSession.builder.appName("Transform Recent change stream")\
        .master("spark://spark:7077")\
        .config("spark.jars.packages",",".join(packages))\
        .config("spark.hadoop.fs.s3a.access.key",{cfg.AWS_ACCESS_KEY})\
        .config("spark.hadoop.fs.s3a.secret.key",{cfg.AWS_SECRET_KEY})\
        .config("spark.hadoop.fs.s3a.impl","org.apache.hadoop.fs.s3a.S3AFileSystem")\
        .config("spark.hadoop.fs.s3a.aws.credentials.provider","org.apache.hadoop.fs.s3a.SimpleAWSCredentialsProvider")\
        .config("spark.hadoop.fs.s3a.multipart.size",104857600)\
        .config("com.amazonaws.services.s3a.enableV4","true")\
        .config("spark.hadoop.fs.s3a.path.style.access","false")\
        .getOrCreate()

# Extract and Transform
def read_dataframes_users(cfg: Config_env) -> DataFrame:
    booking_query = """
        (   
            SELECT 
                *
            FROM staging_booking
        ) tmp_booking_table
    """
    return spark.read.format('jdbc') \
        .option('url',f"jdbc:postgresql://{cfg.WAREHOUSE_HOST}:5432/{cfg.WAREHOUSE_DB}")\
        .option('dbtable', booking_query)\
        .option('user', cfg.WAREHOUSE_USER)\
        .option('password', cfg.WAREHOUSE_PASSWORD)\
        .option('driver','org.postgresql.Driver').load()

# Load
def write_to_data_warehouse(df: DataFrame, cfg: Config_env) -> None:
    df.write.format('csv').option('header', 'True').option(
        'inferSchema', 'True').save('s3a://capstonedaeairflow/staging_booking.csv', mode='append')
    df.write.format('avro').save(
        's3a://capstonedaeairflow/staging_booking.avro', mode='append')
    df.write.parquet('s3a://capstonedaeairflow/staging_booking.parquet', mode='append')

# General Structure
#%%
def main():
    # Step 1: Prepare environment
    cfg = Config_env()
    prepare_env(cfg)
    print("///////////////////////////////Partyroom STEP1////////////////////////////////////")
    # Step 2: Extract
    df = read_dataframes_users(cfg)
    df.show()
    print("///////////////////////////////Partyroom STEP2////////////////////////////////////")
    # Step 3: Load
    write_to_data_warehouse(df=df, cfg=cfg)
    print("///////////////////////////////Partyroom STEP3////////////////////////////////////")

if __name__ == "__main__":
    main()
    # import schedule,time

    # schedule.every(1).day.do(main)
    # while True:
    #     schedule.run_pending()
    #     time.sleep(1)

 