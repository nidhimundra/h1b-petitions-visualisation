=== Data Visualization Project ===
Contributor: Nidhi Mundra
Due Date: 05/11/2017

== Description ==

This code runs Preprocessor on CSVs in csv folder. Dataset of H1B Visa Petitions are present in the folder.
It creates another csv file in processed_data with all missing numbers interpolated from the existing data.

Graphs are generated using dc.js, a library of d3.js.

All Python Files are present in the python folder
Create DB:
    db.py - This file would create a db on the running Mongodb server. Port Numbers need to be adjusted here.
Main File:
	runServer.py - This file contains runs the main server. Port number of Mongodb server needs to be adjusted here.

== How to run ==
	1. cd <Directory Path>
	2. Start Mongodb server: mongod
	2. Create DB: python python/db.py
	3. Run Python server: python runServer.py
	4. http://localhost:<Port Number in runServer.py>

