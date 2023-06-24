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

cfg = Config_env()

# Prepare environment
def prepare_env():
    global spark
    packages = [
        "org.postgresql:postgresql:42.2.18"
    ]

    spark = SparkSession.builder.appName("Transform Recent change stream")\
            .master('spark://spark:7077')\
            .config("spark.jars.packages",",".join(packages))\
            .config("spark.hadoop.fs.s3a.impl","org.apache.hadoop.fs.s3a.S3AFileSystem")\
            .config("spark.hadoop.fs.s3a.multipart.size",104857600)\
            .getOrCreate()

# Read Dataframes
#%%
def read_dataframes_booking(cfg: Config_env) -> DataFrame:
    etl_booking_sql_query = """
        (
            select
              fact_booking.source AS booking_source
            , fact_booking.start_date_id AS fact_booking_start_date_id 
            , fact_booking.start_time_id AS fact_booking_start_time_id
            , fact_booking.booking_fee AS booking_fee
            , fact_booking.rating AS booking_review_rating
            , fact_booking.partyroom_id AS fact_booking_partyroom_id
            , dim_partyroom.id AS dim_partyroom_id 
            , dim_partyroom.source AS partyroom_source 
            , dim_date.year AS year
            , dim_date.month AS month
            , dim_date.date AS date
            , dim_date.quarter AS quarter
            , dim_time.ampm AS ampm
            , dim_date.id AS dim_date_id
            , dim_time.id AS dim_time_id
            , fact_booking.created_at AS fact_booking_created_at 
            from fact_booking
            inner join dim_partyroom on dim_partyroom.id = fact_booking.partyroom_id
            inner join dim_date on dim_date.id = fact_booking.start_date_id
            inner join dim_time on dim_time.id = fact_booking.start_time_id
            AND fact_booking.created_at:: DATE = CURRENT_DATE - INTERVAL '1' DAY
        ) tmp_etl_booking_table
    """
    return spark.read.format('jdbc') \
        .option('url',f"jdbc:postgresql://{cfg.WAREHOUSE_HOST}:5432/{cfg.WAREHOUSE_DB}")\
        .option('dbtable', etl_booking_sql_query)\
        .option('user', cfg.WAREHOUSE_USER)\
        .option('password', cfg.WAREHOUSE_PASSWORD)\
        .option('driver','org.postgresql.Driver').load()

# Transform 
#%%
def drop_column_booking(old_df):
    df = old_df
    df = df.drop('fact_booking_start_date_id')
    df = df.drop('fact_booking_start_time_id')
    df = df.drop('fact_booking_partyroom_id')
    df = df.drop('dim_partyroom_id')
    df = df.drop('dim_date_id')
    df = df.drop('dim_time_id')
    return df


# Load into Data warehouse
#%%
def write_to_data_warehouse(df: DataFrame, cfg: Config_env) -> None:
    df.write.format('jdbc')\
        .option('url',f"jdbc:postgresql://{cfg.POSTGRES_HOST}:5432/{cfg.POSTGRES_DB}")\
        .option('dbtable','staging_booking')\
        .option('user',cfg.POSTGRES_USER)\
        .option('password',cfg.POSTGRES_PASSWORD)\
        .option('driver','org.postgresql.Driver')\
        .mode('append').save()

# General Structure
#%%
def main():
    # Step 1: Prepare environment
    cfg = Config_env()
    prepare_env()
    print("///////////////////////////////Booking STEP1////////////////////////////////////")
    # Step 2: Extract
    df = read_dataframes_booking(cfg)
    df.show()
    print("///////////////////////////////Booking STEP2////////////////////////////////////")
    # Step 3: Transform
    df = drop_column_booking(df)
    print("///////////////////////////////Booking STEP3////////////////////////////////////")
    # Step 4: Load
    write_to_data_warehouse(df=df, cfg=cfg)
    print("///////////////////////////////Booking STEP4////////////////////////////////////")

if __name__ == "__main__":
    import schedule,time

    schedule.every(1).day.do(main)
    while True:
        schedule.run_pending()
        time.sleep(1)