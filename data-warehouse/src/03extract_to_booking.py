from pyspark.sql import SparkSession, DataFrame
from dotenv import load_dotenv
import os
load_dotenv()

class Config_env:
    POSTGRES_DB=os.getenv('POSTGRES_DB')
    POSTGRES_USER=os.getenv("POSTGRES_USER")
    POSTGRES_PASSWORD=os.getenv("POSTGRES_PASSWORD")
    POSTGRES_HOST=os.getenv("POSTGRES_HOST")
    WAREHOUSE_HOST=os.getenv("WAREHOUSE_HOST")
    WAREHOUSE_DB=os.getenv("WAREHOUSE_DB")
    WAREHOUSE_USER=os.getenv("WAREHOUSE_USER")
    WAREHOUSE_PASSWORD=os.getenv("WAREHOUSE_PASSWORD")

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
def extract_booking(cfg: Config_env) -> DataFrame:
    booking_sql_query = """
        (
            SELECT                        
                booking_info.booking_date, 
                partyroom_price_list.is_holiday, 
                booking_info.start_time, 
                booking_info.total_hour,
                booking_info.headcount, 
                booking_info.total_fee,
                partyroom.host_id,
                district.name,
                partyroom.capacity,
                booking_info.id, 
                booking_info.partyroom_price_list_id, 
                partyroom_price_list.id
                partyroom_price_list.partyroom_id, 
                partyroom.id as partyroom_id, 
                partyroom.district_id,
                district.id,
                booking_info.status,
                booking_info.is_hidden, 
                booking_info.created_at
            FROM booking_info
            JOIN partyroom_price_list ON partyroom_price_list.id = booking_info.partyroom_price_list_id 
            JOIN partyroom ON partyroom.id = partyroom_price_list.partyroom_id 
            JOIN district ON district.id = partyroom.district_id
            WHERE booking_info.is_hidden = f 
            AND booking_info.created_at:: DATE = CURRENT_DATE -  INTERVAL '1' DAY;
        ) tmp_booking_table
    """
    return spark.read.format('jdbc') \
        .option('url',f"jdbc:postgresql://{cfg.POSTGRES_HOST}:5432/{cfg.POSTGRES_DB}")\
        .option('dbtable', booking_sql_query)\
        .option('user', cfg.POSTGRES_USER)\
        .option('password', cfg.POSTGRES_PASSWORD)\
        .option('driver','org.postgresql.Driver').load()

# Transform 
#%%
def rename_booking(old_df: DataFrame) -> DataFrame:
    df = old_df
    df = df.withColumnRenamed('date','booking_info.booking_date')
    df = df.withColumnRenamed('is_holiday','partyroom_price_list.is_holiday')
    df = df.withColumnRenamed('time','booking_info.start_time')
    df = df.withColumnRenamed('total_hour','booking_info.total_hour')
    df = df.withColumnRenamed('headcount','booking_info.headcount')
    df = df.withColumnRenamed('booking_fee','booking_info.total_fee')
    df = df.withColumnRenamed('host_users_id','partyroom.host_id')
    df = df.withColumnRenamed('partyroom_district','district.name')
    df = df.withColumnRenamed('partyroom_capacity','partyroom.capacity')
    return df

def transform_booking(old_df: DataFrame) -> DataFrame:
    import pyspark.sql.functions as F
    df = old_df
    df = df.withColumn('year', F.year(df['booking_info.booking_date']))
    df = df.withColumn('month', F.month(df['booking_info.booking_date']))
    df = df.withColumn('day_of_month', F.dayofmonth(df['booking_info.booking_date']))
    df = df.withColumn('day_of_year', F.dayofyear(df['booking_info.booking_date']))
    df = df.withColumn('quarter', F.quarter(df['booking_info.booking_date']))
    df = df.withColumn('day_of_week', F.dayofweek(df['booking_info.booking_date']))
    df = df.withColumn('hour', F.hour(df['booking_info.start_time']))
    df = df.withColumn('minute', F.minute(df['booking_info.start_time']))
    if F.hour(df['booking_info.start_time']) < 7:
        AMPM = "midnight"
    elif F.hour(df['booking_info.start_time']) < 13:
        AMPM = "morning"
    elif F.hour(df['booking_info.start_time']) < 19:
        AMPM = "afternoon"
    else:
        AMPM = "evening"
    df = df.withColumn('AMPM', AMPM)
    return df

def perform_etl_for_booking(df: DataFrame) -> DataFrame:
    df = rename_booking(df)
    df = transform_booking(df)
    return df

# Load into Data warehouse
#%%
def write_to_data_warehouse(df: DataFrame, cfg: Config_env) -> None:
    import os
    df.write.format('jdbc')\
        .option('url',f"jdbc:postgresql://{cfg.WAREHOUSE_HOST}:5433/{cfg.WAREHOUSE_DB}")\
        .option('dbtable','staging_booking')\
        .option('user',cfg.WAREHOUSE_USER)\
        .option('password',cfg.WAREHOUSE_PASSWORD)\
        .option('driver','org.postgresql.Driver')\
        .mode('append').save()

# General Structure
#%%
def main():
    # Step 1: Prepare environment
    cfg = Config_env()
    prepare_env()
    # Step 2: Extract
    df = extract_booking(cfg)
    df.show()
    # Step 3: Transform
    df = perform_etl_for_booking(df)
    # Step 4: Load
    write_to_data_warehouse(df=df, cfg=cfg)

if __name__ == "__main__":
    import schedule,time

    schedule.every(1).minutes.do(main)
    while True:
        schedule.run_pending()
        time.sleep(1)