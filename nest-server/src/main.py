#%%
from pyspark.sql import SparkSession
packages = [
    "com.amazonaws:aws-java-sdk-s3:1.12.95",
    "org.apache.hadoop:hadoop-aws:3.2.2",
    "org.apache.spark:spark-avro_2.12:2.4.4",
    "org.postgresql:postgresql:42.2.18"
]
import os
AWS_ACCESS_KEY = os.getenv('AWS_ACCESS_KEY')
AWS_SECRET_KEY = os.getenv('AWS_SECRET_KEY')

import pandas as pd

#%%
spark = SparkSession.builder.appName("Transform Recent change stream")\
        .master('spark://spark:7077')\
        .config("spark.jars.packages",",".join(packages))\
        .config("spark.hadoop.fs.s3a.access.key",AWS_ACCESS_KEY)\
        .config("spark.hadoop.fs.s3a.secret.key",AWS_SECRET_KEY)\
        .config("spark.hadoop.fs.s3a.impl","org.apache.hadoop.fs.s3a.S3AFileSystem")\
        .config("spark.hadoop.fs.s3a.multipart.size",104857600)\
        .getOrCreate()

# %%
df = spark.createDataFrame([1, 2, 3], ["idx"])
df.show()
