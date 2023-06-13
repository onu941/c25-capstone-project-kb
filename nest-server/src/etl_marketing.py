def main():
# Prepare environment
#%%
    def prepare_env():
        global spark

        from dotenv import load_dotenv
        import os

        load_dotenv()

        AWS_ACCESS_KEY = os.getenv('AWS_ACCESS_KEY')
        AWS_SECRET_KEY = os.getenv('AWS_SECRET_KEY')
        # Initialize Spark
        from pyspark.sql import SparkSession
        # Rest of the initialization code

# Read Dataframes, need to add DB_TABLE
#%%
    def read_dataframes():
        import os
        return spark.read.format('jdbc') \
            .option('url',"jdbc:postgresql://34.87.68.71:5432/"+os.getenv("data_warehouse"))\
            .option('dbtable',"<DB_TABLE>")\
            .option('user',os.getenv('postgres'))\
            .option('password',os.getenv('postgres'))\
            .option('driver','org.postgresql.Driver').load()
