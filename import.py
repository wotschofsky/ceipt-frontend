
from pymongo import MongoClient
import csv

mongodb_client = MongoClient('mongodb://localhost:27017')
database = mongodb_client["moinsen"]


with open('items.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        doc = database['items'].insert_one({
            'name': row['description'],
            'isVegan': row['isVegan'] == '1',
            'isVegetarian': row['isVegetarian'] == '1',
            'weightGrams': float(row['Weight per part'].replace('kg', '').replace('l', '').replace(',', '.')) * 1000,
            'co2ProKg': float(row['kgCo2Produced'].replace(',', '.'))
        })
