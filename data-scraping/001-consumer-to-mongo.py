from kafka import KafkaConsumer
import json
from datetime import datetime
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()
mongo_uri = os.getenv("MONGO_URI")

client = MongoClient(mongo_uri)
db = client['partyroom_from_reubird']
collection = db['partyroom']

consumer = KafkaConsumer(bootstrap_servers=[os.getenv("KAFKA_URI") or 'localhost:9092'],
                         value_deserializer=lambda m: json.loads(m.decode('utf-8')),
                         auto_offset_reset='earliest', 
                         group_id="partyroom_from_reubird",
                         enable_auto_commit=True,
                         auto_commit_interval_ms=1000)

topics = 'partyroom_from_reubird'
consumer.subscribe(topics=topics)

for message in consumer:
    value = message.value   
    print(value)
    try:
        collection.insert_one(value)
        print("added value")
    except Exception as e:
        print("Error inserting data into MongoDB:", e)
