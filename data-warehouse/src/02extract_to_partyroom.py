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
def extract_partyroom(cfg: Config_env) -> DataFrame:
    partyroom_sql_query = """
        (   
            SELECT 
                partyroom.host_id, 
                district.name, 
                partyroom.capacity, 
                partyroom.id,
                partyroom.create_at,
                category.name, 
                category.created_at,
                equipment.name, 
                equipment.created_at,
                partyroom.district_id,
                partyroom_category.id, 
                partyroom_category.partyroom_id, 
                partyroom_category.category_id,  
                partyroom_equipment.id, 
                partyroom_equipment.partyroom_id, 
                partyroom_equipment.equipment_id,  
                category.id
                equipment.id, 
                district.id,
                partyroom.is_hidden, 
                partyroom.created_at
            FROM partyroom 
            JOIN partyroom_category on partyroom.id = partyroom_category.partyroom_id
            JOIN partyroom_equipment ON partyroom.id = partyroom_equipment.partyroom_id 
            JOIN category ON category.id = partyroom_category.category_id
            JOIN equipment ON equipment.id = partyroom_equipment.equipment_id 
            JOIN district ON district.id = partyroom.district_id
            JOIN partyroom_price_list 
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
#%%
def rename_partyroom(old_df: DataFrame) -> DataFrame:
    df = old_df
    df = df.withColumnRenamed('host_user_id','partyroom.host_id')
    df = df.withColumnRenamed('district','district.name')
    df = df.withColumnRenamed('capacity','partyroom.capacity')
    df = df.withColumnRenamed('partyroom_source','partyroom.id')
    df = df.withColumnRenamed('category_name','category.name')
    df = df.withColumnRenamed('equipment_name','equipment.name')
    return df

def transform_partyroom(old_df: DataFrame) -> DataFrame:
    import pyspark.sql.functions as F
    df = old_df
    df = df.withColumn('partyroom_start_date', F.year(df['partyroom.create_at']))
    df = df.withColumn('category_start_date', F.year(df['category.created_at']))
    df = df.withColumn('equipment_start_date', F.month(df['equipment.created_at']))
    return df
    
def perform_etl_for_partyroom(df: DataFrame) -> DataFrame:
    df = rename_partyroom(df)
    df = transform_partyroom(df)
    return df

# Load into Data warehouse
#%%
def write_to_data_warehouse(df: DataFrame, cfg: Config_env) -> None:
    import os
    df.write.format('jdbc')\
        .option('url',f"jdbc:postgresql://{cfg.WAREHOUSE_HOST}:5433/{cfg.WAREHOUSE_DB}")\
        .option('dbtable','staging_partyroom_register')\
        .option('user',cfg.WAREHOUSE_USER)\
        .option('password',cfg.WAREHOUSE_PASSWORD)\
        .option('driver','org.postgresql.Driver')\
        .mode('append').save()

# General Structure
#%%
def main():
    # Step 1: Prepare environment
    cfg = Config_env()
    prepare_env(cfg)
    # Step 2: Extract
    df = extract_partyroom(cfg)
    df.show()
    # Step 3: Transform
    df = perform_etl_for_partyroom(df)
    # Step 4: Load
    write_to_data_warehouse(df=df, cfg=cfg)

if __name__ == "__main__":
    import schedule,time

    schedule.every(1).minutes.do(main)
    while True:
        schedule.run_pending()
        time.sleep(1)