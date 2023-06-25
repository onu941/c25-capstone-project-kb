from google.cloud import bigquery
from kafka import KafkaConsumer
from datetime import datetime
import json
import os
from dotenv import load_dotenv

load_dotenv()

consumer = KafkaConsumer(bootstrap_servers=[os.getenv("KAFKA_URI") or 'localhost:9092'],
                         value_deserializer=lambda m: json.loads(m.decode('utf-8')),
                         auto_offset_reset='earliest', 
                         group_id="partyroom_mongodb",
                         enable_auto_commit=True,
                         auto_commit_interval_ms=1000)


topics = ['partyroom_mongodb']
consumer.subscribe(topics=topics)

client = bigquery.Client()
partyroom = client.get_table(os.getenv("BIG_QUERY_TB_ID") or 'nth-anchor-387202.partyroom_from_reubird.partyroom')

for message in consumer:
    value = message.value
    print(value)
    try:
        result = client.insert_rows_json(partyroom, [value])
    except Exception as e:
        print("Error inserting data into MongoDB:", e)
