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
    etl_partyroom_sql_query = """
        (
            select
              fact_registered_partyroom.source AS partyroom_source
            , fact_registered_partyroom.avg_rating AS avg_rating
            , fact_registered_partyroom.created_at AS fact_registered_partyroom_created_at
            , dim_partyroom.source as dim_partyroom_source
            from fact_registered_partyroom
            inner join dim_partyroom on dim_partyroom.source = fact_registered_partyroom.source
            AND fact_registered_partyroom.created_at:: DATE = CURRENT_DATE - INTERVAL '1' DAY
        ) tmp_etl_partyroom_table
    """
    return spark.read.format('jdbc') \
        .option('url',f"jdbc:postgresql://{cfg.WAREHOUSE_HOST}:5432/{cfg.WAREHOUSE_DB}")\
        .option('dbtable', etl_partyroom_sql_query)\
        .option('user', cfg.WAREHOUSE_USER)\
        .option('password', cfg.WAREHOUSE_PASSWORD)\
        .option('driver','org.postgresql.Driver').load()

# Transform 
#%%
def drop_column_booking(old_df):
    df = old_df
    df = df.drop('fact_registered_partyroom_created_at')
    df = df.drop('dim_partyroom_source')
    return df


# Load into Data warehouse
#%%
def write_to_data_warehouse(df: DataFrame, cfg: Config_env) -> None:
    df.write.format('jdbc')\
        .option('url',f"jdbc:postgresql://{cfg.POSTGRES_HOST}:5432/{cfg.POSTGRES_DB}")\
        .option('dbtable','etl_partyroom')\
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
    main()
    # import schedule,time

    # schedule.every(1).minutes.do(main)
    # while True:
    #     schedule.run_pending()
    #     time.sleep(1)