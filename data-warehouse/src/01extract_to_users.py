from pyspark.sql import SparkSession, DataFrame
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
def extract_users(cfg: Config_env) -> DataFrame:
    users_sql_query = """
        (   
            SELECT 
                users.id AS booking_user_source,
                users.created_at
            FROM users 
            WHERE users.created_at:: DATE = CURRENT_DATE - INTERVAL '1' DAY;
        ) tmp_users_table
    """
    return spark.read.format('jdbc') \
        .option('url',f"jdbc:postgresql://{cfg.POSTGRES_HOST}:5432/{cfg.POSTGRES_DB}")\
        .option('dbtable', users_sql_query)\
        .option('user', cfg.POSTGRES_USER)\
        .option('password', cfg.POSTGRES_PASSWORD)\
        .option('driver','org.postgresql.Driver').load()

# Transform 
#%%
def rename_users(old_df: DataFrame) -> DataFrame:
    df = old_df
    df = df.withColumnRenamed('booking_user_source','users.id')
    return df

def perform_etl_for_users(df: DataFrame) -> DataFrame:
    df = rename_users(df)

# Load into Data warehouse
#%%
def write_to_data_warehouse(df: DataFrame, cfg: Config_env) -> None:
    df.write.format('jdbc')\
        .option('url',f"jdbc:postgresql://{cfg.WAREHOUSE_HOST}:5433/{cfg.WAREHOUSE_DB}")\
        .option('dbtable','staging_users_register')\
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
    print("///////////////////////////step 1 complete//////////////////////////////")
    # Step 2: Extract
    df = extract_users(cfg)
    df.show()
    print("///////////////////////////step 2 complete//////////////////////////////")
    # Step 3: Transform
    df = perform_etl_for_users(df)
    print("///////////////////////////step 3 complete//////////////////////////////")
    # Step 4: Load
    write_to_data_warehouse(df=df, cfg=cfg)
    print("///////////////////////////step 4 complete//////////////////////////////")

if __name__ == "__main__":
    import schedule,time

    schedule.every(1).minutes.do(main)
    while True:
        schedule.run_pending()
        time.sleep(1)