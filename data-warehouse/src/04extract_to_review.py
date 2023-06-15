from pyspark.sql import SparkSession, DataFrame
from dotenv import load_dotenv
import os
load_dotenv()

class Config_env:
    POSTGRES_DB=os.getenv('POSTGRES_DB')
    POSTGRES_USER=os.getenv("POSTGRES_USER")
    POSTGRES_PASSWORD=os.getenv("POSTGRES_PASSWORD")
    POSTGRES_HOST=os.getenv("POSTGRES_HOST")
    SPARK_MASTER=os.getenv('SPARK_MASTER')
    WAREHOUSE_HOST=os.getenv("WAREHOUSE_HOST")
    WAREHOUSE_DB=os.getenv("WAREHOUSE_DB")
    WAREHOUSE_USER=os.getenv("WAREHOUSE_USER")
    WAREHOUSE_PASSWORD=os.getenv("WAREHOUSE_PASSWORD")

# Prepare environment
def prepare_env(cfg: Config_env):
    global spark
    packages = [
        "org.postgresql:postgresql:42.2.18"
    ]

    spark = SparkSession.builder.appName("Transform Recent change stream")\
            .master(f'spark://{cfg.SPARK_MASTER}:7077')\
            .config("spark.jars.packages",",".join(packages))\
            .getOrCreate()

# Read Dataframes
#%%
def extract_review(cfg: Config_env) -> DataFrame:
    review_sql_query = """
        (   
            review.id,
            review.rating,
            AUG(review.rating) as avg_rating,
            review.booking_info_id,
            review.is_hidden,
            review.updated_at,
            review.created_at,
            partyroom.id,
            from partyroom
            JOIN partyroom ON partyroom.id = partyroom_price_list.partyroom_id
            JOIN partyroom_price_list ON partyroom_price_list.id = booking_info.partyroom_price_list_id
            JOIN booking_info ON booking_info.id = review.booking_info_id
            WHERE review.updated_at:: DATE = CURRENT_DATE - INTERVAL '1' DAY;
        ) tmp_review_table
    """
    return spark.read.format('jdbc') \
        .option('url',f"jdbc:postgresql://{cfg.POSTGRES_HOST}:5432/{cfg.POSTGRES_DB}")\
        .option('dbtable', review_sql_query)\
        .option('user', cfg.POSTGRES_USER)\
        .option('password', cfg.POSTGRES_PASSWORD)\
        .option('driver','org.postgresql.Driver').load()

# Transform 
#%%
def rename_review(old_df: DataFrame) -> DataFrame:
    df = old_df
    df = df.withColumnRenamed('booking_review_source','review.id')
    df = df.withColumnRenamed('rating','review.rating')
    return df

def perform_etl_for_review(df: DataFrame) -> DataFrame:
    df = rename_review(df)
    return df

# Load into Data warehouse
#%%
def write_to_data_warehouse(df: DataFrame, cfg: Config_env) -> None:
    import os
    df.write.format('jdbc')\
        .option('url',f"jdbc:postgresql://{cfg.WAREHOUSE_HOST}:5433/{cfg.WAREHOUSE_DB}")\
        .option('dbtable','staging_review')\
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
    df = extract_review(cfg)
    df.show()
    # Step 3: Transform
    df = perform_etl_for_review(df)
    # Step 4: Load
    write_to_data_warehouse(df=df, cfg=cfg)

if __name__ == "__main__":
    import schedule,time

    schedule.every(1).minutes.do(main)
    while True:
        schedule.run_pending()
        time.sleep(1)