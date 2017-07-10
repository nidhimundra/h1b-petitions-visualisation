import pandas as pd
from math import isnan
from geo_api_helper import *


class Preprocessor():

    def __init__(self, filename, path='../data/', output_path='../processed_data/', extension=".csv"):
        self.path = path
        self.output_path = output_path
        self.filename = filename
        self.extension = extension
        self.dataframe = pd.read_csv(self.path + self.filename + self.extension)

    def fill_missing_values(self):

        cities = []

        for index, row in self.dataframe.iterrows():
            if isnan(row["LON"]) or isnan(row["LAT"]):
                cities.insert(0, codify(row["WORKSITE"]))

        city_coordinates_map = get_lat_lon_bulk(list(set(cities)))

        print city_coordinates_map

        for index, row in self.dataframe.iterrows():
            if isnan(row["LON"]) or isnan(row["LAT"]):
                key = codify(row["WORKSITE"])
                if key in city_coordinates_map:
                    try:
                        self.dataframe.set_value(index, "LON", city_coordinates_map[key]["lon"])
                        self.dataframe.set_value(index, "LAT", city_coordinates_map[key]["lat"])
                    except:
                        print "Some wrong value"


        print "Copying to CSV"
        self.dataframe.to_csv(self.output_path + self.filename + self.extension)
        print "Finished"

        for index, row in self.dataframe.iterrows():
            if isnan(row["LON"]) or isnan(row["LAT"]):
                print "OMG!!"

        return json.loads(self.dataframe.T.to_json()).values()