from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
from bson import json_util
from bson.json_util import dumps

app = Flask(__name__)

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'h1b_db'
COLLECTION_NAME = 'h1b_collection'
FIELDS = {'ID': True, 'CASE_STATUS': True, 'EMPLOYER_NAME': True, 'SOC_NAME': True, 'JOB_TITLE': True,
          'FULL_TIME_POSITION': True, 'PREVAILING_WAGE': True, 'YEAR': True, 'WORKSITE': True, 'LON': True, 'LAT': True,
          'STATE': True, 'STATE_CODE': True, 'CERTIFIED': True, 'WITHDRAWN': True, 'DENIED': True, 'TOTAL': True,
          'POSITION_STATUS': True, 'GROUP': True}


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/h1b_db/h1b_collection")
def test_db_test_collection():
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    projects = collection.find(projection=FIELDS)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    connection.close()
    return json_projects


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000, debug=True)
