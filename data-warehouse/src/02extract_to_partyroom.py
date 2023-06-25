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
def read_dataframes_partyroom(cfg: Config_env) -> DataFrame:
    partyroom_sql_query = """
        (   
            SELECT 
                partyroom.host_id AS host_users_id, 
                district.name AS district, 
                partyroom.capacity AS capacity, 
                concat('application_db_id=', partyroom.id) AS partyroom_source,
                partyroom.created_at AS partyroom_start_date,
                category.name AS category_name, 
                partyroom_category.created_at AS category_start_date,
                equipment.name AS equipment_name, 
                partyroom_equipment.created_at AS equipment_start_date,
                partyroom_price_list.headcount_price AS headcount_price,
                partyroom_price_list.is_holiday AS is_holiday,
                partyroom_price_list.start_time AS start_time,
                partyroom_price_list.total_hour AS total_hour,
                partyroom_price_list.base_room_fee AS base_room_fee,
                partyroom_price_list.created_at AS price_list_start_date,
                partyroom.district_id AS partyroom_district_id,
                partyroom_category.id AS partyroom_category_id, 
                partyroom_category.partyroom_id AS partyroom_category_partyroom_id, 
                partyroom_category.category_id AS partyroom_category_category_id,  
                partyroom_equipment.id AS partyroom_equipment_id, 
                partyroom_equipment.partyroom_id AS partyroom_equipment_partyroom_id,  
                partyroom_equipment.equipment_id AS partyroom_equipment_equipment_id,   
                partyroom_price_list.partyroom_id AS partyroom_price_list_partyroom_id,
                category.id AS category_id,
                equipment.id AS equipment_id, 
                district.id AS district_id,
                partyroom.is_hidden AS partyroom_is_hidden
            FROM partyroom 
            JOIN partyroom_category ON partyroom.id = partyroom_category.partyroom_id
            JOIN partyroom_equipment ON partyroom.id = partyroom_equipment.partyroom_id 
            JOIN category ON category.id = partyroom_category.category_id
            JOIN equipment ON equipment.id = partyroom_equipment.equipment_id 
            JOIN district ON district.id = partyroom.district_id
            JOIN partyroom_price_list ON partyroom.id = partyroom_price_list.partyroom_id
            WHERE partyroom.created_at:: DATE = CURRENT_DATE - INTERVAL '1' DAY
        ) tmp_partyroom_table
    """
    return spark.read.format('jdbc') \
        .option('url',f"jdbc:postgresql://{cfg.POSTGRES_HOST}:5432/{cfg.POSTGRES_DB}")\
        .option('dbtable', partyroom_sql_query)\
        .option('user', cfg.POSTGRES_USER)\
        .option('password', cfg.POSTGRES_PASSWORD)\
        .option('driver','org.postgresql.Driver').load()

# Transform
def drop_column_partyroom(old_df):
    import pyspark.sql.functions as F
    df = old_df
    df = df.drop('partyroom_district_id')
    df = df.drop('partyroom_category_id')
    df = df.drop('partyroom_category_partyroom_id')
    df = df.drop('partyroom_category_category_id')
    df = df.drop('partyroom_equipment_id')
    df = df.drop('partyroom_equipment_partyroom_id')
    df = df.drop('partyroom_equipment_equipment_id')
    df = df.drop('category_id')
    df = df.drop('equipment_id')
    df = df.drop('partyroom_price_list_partyroom_id')
    df = df.drop('district_id')
    df = df.drop('partyroom_is_hidden')
    df = df.withColumn('AMPM', F.when(F.hour(df['start_time']) < 7, "midnight") \
                     .when(F.hour(df['start_time']) < 13, "morning") \
                     .when(F.hour(df['start_time']) < 19, "afternoon") \
                     .otherwise("evening"))
    return df

# Load into Data warehouse
#%%
def write_to_data_warehouse(df: DataFrame, cfg: Config_env) -> None:
    df.write.format('jdbc')\
        .option('url',f"jdbc:postgresql://{cfg.WAREHOUSE_HOST}:5432/{cfg.WAREHOUSE_DB}")\
        .option('dbtable','staging_registered_partyroom')\
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
    print("///////////////////////////////Partyroom STEP1////////////////////////////////////")
    # Step 2: Extract
    df = read_dataframes_partyroom(cfg)
    df.show()
    print("///////////////////////////////Partyroom STEP2////////////////////////////////////")
    # Step 3: Transform
    df = drop_column_partyroom(df)
    print("///////////////////////////////Partyroom STEP3////////////////////////////////////")
    # Step 4: Load
    write_to_data_warehouse(df=df, cfg=cfg)
    print("///////////////////////////////Partyroom STEP4////////////////////////////////////")

if __name__ == "__main__":
    import schedule,time

    schedule.every(1).day.do(main)
    while True:
        schedule.run_pending()
        time.sleep(1)

