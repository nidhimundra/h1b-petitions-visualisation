import json
import pandas as pd
import pymongo

client = pymongo.MongoClient('localhost', 27017)
db = client['h1b_db']
collection_name = 'h1b_collection'
db_cm = db[collection_name]
data = pd.read_csv("../static/final_output1.csv")
datafreefromna = data.dropna()
rows1 = datafreefromna.shape[0]
print rows1
row = data.shape[0]
print row
data_json = json.loads(data.to_json(orient="records"))
db_cm.remove()
db_cm.insert(data_json)
