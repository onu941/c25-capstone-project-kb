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
                partyroom.district_id AS partyroom_district_id,
                partyroom_category.id AS partyroom_category_id, 
                partyroom_category.partyroom_id AS partyroom_category_partyroom_id, 
                partyroom_category.category_id AS partyroom_category_category_id,  
                partyroom_equipment.id AS partyroom_equipment_id, 
                partyroom_equipment.partyroom_id AS partyroom_equipment_partyroom_id,  
                partyroom_equipment.equipment_id AS partyroom_equipment_equipment_id,   
                category.id AS category_id,
                equipment.id AS equipment_id, 
                district.id AS district_id,
                partyroom.is_hidden AS partyroom_is_hidden
            FROM partyroom 
            JOIN partyroom_category on partyroom.id = partyroom_category.partyroom_id
            JOIN partyroom_equipment ON partyroom.id = partyroom_equipment.partyroom_id 
            JOIN category ON category.id = partyroom_category.category_id
            JOIN equipment ON equipment.id = partyroom_equipment.equipment_id 
            JOIN district ON district.id = partyroom.district_id
            JOIN partyroom_price_list ON partyroom.id = partyroom_price_list.partyroom_id
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
    df = df.drop('district_id')
    df = df.drop('partyroom_is_hidden')
    df = df.withColumn('avg_rating', lit(0))
    df = df.withColumn('partyroom_end_date', lit("TBC"))
    df = df.withColumn('category_end_date', lit("TBC"))
    df = df.withColumn('equipment_end_date', lit("TBC"))
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
    print("//////////////////////////////////////step1 done")
    # Step 2: Extract
    df = read_dataframes_partyroom(cfg)
    df.show()
    print("//////////////////////////////////////step2 done")
    # Step 3: Transform
    df = drop_column_partyroom(df)
    print("//////////////////////////////////////step3 done")
    # Step 4: Load
    write_to_data_warehouse(df=df, cfg=cfg)
    print("//////////////////////////////////////step4 done")

if __name__ == "__main__":
    main()

    # import schedule,time

    # schedule.every(1).minutes.do(main)
    # while True:
    #     schedule.run_pending()
    #     time.sleep(1)

