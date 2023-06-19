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
    booking_sql_query = """
        (
            SELECT                        
                booking_info.booking_date AS date, 
                partyroom_price_list.is_holiday AS is_holiday, 
                booking_info.start_time AS time, 
                concat('application_db_id=', booking_info.booking_users_id) AS booking_users_source,
                partyroom.host_id AS host_users_id,
                concat('application_db_id=', partyroom.id) AS partyroom_source,
                district.name AS partyroom_district,
                partyroom.capacity AS partyroom_capacity,
                concat('application_db_id=', booking_info.id) AS booking_source,
                booking_info.total_hour AS total_hour,
                booking_info.headcount AS headcount, 
                booking_info.total_fee AS booking_fee,         
                booking_info.partyroom_price_list_id AS booking_info_partyroom_price_list_id, 
                users.id AS users_id,
                partyroom_price_list.id AS partyroom_price_list_id,
                partyroom_price_list.partyroom_id AS partyroom_price_list_partyroom_id, 
                partyroom.id AS partyroom_id, 
                partyroom.district_id AS partyroom_district_id,
                district.id AS district_id,
                booking_info.status AS booking_info_status,
                booking_info.is_hidden AS booking_info_is_hidden, 
                booking_info.created_at AS booking_info_created_at
            FROM booking_info
            JOIN users ON users.id = booking_info.booking_users_id 
            JOIN partyroom_price_list ON partyroom_price_list.id = booking_info.partyroom_price_list_id 
            JOIN partyroom ON partyroom.id = partyroom_price_list.partyroom_id 
            JOIN district ON district.id = partyroom.district_id
            WHERE booking_info.is_hidden = false
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


def transform_booking(old_df: DataFrame) -> DataFrame:
    import pyspark.sql.functions as F
    df = old_df
    df = df.withColumn('year', F.year(df['date']))
    df = df.withColumn('month', F.month(df['date']))
    df = df.withColumn('day_of_month', F.dayofmonth(df['date']))
    df = df.withColumn('day_of_year', F.dayofyear(df['date']))
    df = df.withColumn('quarter', F.quarter(df['date']))
    df = df.withColumn('day_of_week', F.dayofweek(df['date']))
    df = df.withColumn('hour', F.hour(df['time']))
    df = df.withColumn('minute', F.minute(df['time']))
    df = df.withColumn('AMPM', F.when(F.hour(df['time']) < 7, "midnight") \
                     .when(F.hour(df['time']) < 13, "morning") \
                     .when(F.hour(df['time']) < 19, "afternoon") \
                     .otherwise("evening"))
    return df

def drop_column_booking(old_df):
    df = old_df
    df = df.drop('booking_info_partyroom_price_list_id')
    df = df.drop('users_id')
    df = df.drop('partyroom_price_list_id')
    df = df.drop('partyroom_price_list_partyroom_id')
    df = df.drop('partyroom_id')
    df = df.drop('partyroom_district_id')
    df = df.drop('district_id')
    df = df.drop('booking_info_status')
    df = df.drop('booking_info_is_hidden')
    df = df.drop('booking_info_created_at')
    df = df.withColumn('booking_users_promotion', lit("Null"))
    df = df.withColumn('booking_review_rating', lit(0))
    return df


# Load into Data warehouse
#%%
def write_to_data_warehouse(df: DataFrame, cfg: Config_env) -> None:
    df.write.format('jdbc')\
        .option('url',f"jdbc:postgresql://{cfg.WAREHOUSE_HOST}:5432/{cfg.WAREHOUSE_DB}")\
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
    df = read_dataframes_booking(cfg)
    df.show()
    print("///////////////////////////////STEP2////////////////////////////////////")
    # Step 3: Transform
    df = transform_booking(df)
    print("///////////////////////////////STEP3 TB////////////////////////////////////")
    df = drop_column_booking(df)
    print("///////////////////////////////STEP3 DC////////////////////////////////////")
    # Step 4: Load
    write_to_data_warehouse(df=df, cfg=cfg)
    print("///////////////////////////////STEP3 TB////////////////////////////////////")

if __name__ == "__main__":
    main()
    
    # import schedule,time

    # schedule.every(1).minutes.do(main)
    # while True:
    #     schedule.run_pending()
    #     time.sleep(1)