from db import DB
from preprocessor import Preprocessor
from state_code import state_code_map
import os
import json
import csv
import pandas as pd
import pymongo

client = pymongo.MongoClient('localhost', 27017)
db = client['h1b_db']
collection_name = 'h1b_collection'
db_cm = db[collection_name]
data = pd.read_csv("final_output1.csv")
datafreefromna = data.dropna()
rows1 = datafreefromna.shape[0]
print rows1
row = data.shape[0]
print row
data_json = json.loads(data.to_json(orient="records"))
db_cm.remove()
db_cm.insert(data_json)

# if __name__ == "__main__":
#
#     output = {'Others': {}, 'Chief': {}, 'Finance': {}, 'Manager': {}, 'Marketing': {}, 'Sales': {}, 'Technology': {},
#               'Accountancy': {}, 'Logistics': {}, 'Business': {}, 'Analytics': {}}
#
#     case_status_index = {'CERTIFIED': 0, 'CERTIFIED-WITHDRAWN': 1, 'WITHDRAWN': 2, 'DENIED': 3}
#
#     with open('final_output1.csv', 'r') as csvInput:
#         reader = csv.reader(csvInput)
#         for row in reader:
#             if row[0] != 'ID':
#                 if row[3].title() not in output[row[18]].keys():
#                     arr_index = case_status_index[row[1]]
#                     arr = [0, 0, 0, 0]
#                     arr[arr_index] = 1
#                     output[row[18]][row[3].title()] = arr
#                 else:
#                     arr_index = case_status_index[row[1]]
#                     arr = output[row[18]][row[3].title()]
#                     arr[arr_index] += 1
#                     output[row[18]][row[3].title()] = arr
#
#     print output
#
