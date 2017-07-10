import requests
import json
import time

publicurl = ''

def get_lat_lon(data):
    try:
        data = data[u'results'][0][u'geometry'][u'location']
        print data[u'lat'], data[u'lng']
        return {'lat': data[u'lat'], 'lon': data[u'lng']}
    except IndexError:
        print "Over Query Limit"
        return {'lat': 'NA', 'lon': 'NA'}

def get_lat_lon_bulk(city_names):
    output = {}
    print "Total: ", len(city_names)
    count = 1
    for city in city_names:
        print count
        count += 1
        time.sleep(1)
        output[city] = fetch_geo_spatial_info(city=city)
    return output


def fetch_geo_spatial_info(city):
    url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + codify(city)
    publicurl = url
    time.sleep(1)
    response = requests.get(url)
    if response.ok:
        data = json.loads(response.content)
        return get_lat_lon(data)
    return {'lat': 'NA', 'lon': 'NA'}

def codify(element):
    return ''.join(element.split(",")[0].split())