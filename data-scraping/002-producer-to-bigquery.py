import json
from pymongo import MongoClient
from bson import json_util
from kafka import KafkaProducer
import os 
from dotenv import load_dotenv

load_dotenv()
mongo_uri = os.getenv("MONGO_URI")

client = MongoClient(mongo_uri)
db = client['partyroom_from_reubird']
collection = db['partyroom']

producer = KafkaProducer(bootstrap_servers=[os.getenv("KAFKA_URI") or'localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8'))
                
datas = collection.find({},{'_id': False})

for data in datas:
    producer.send(topic='partyroom_mongodb', value=data)
    print(data)