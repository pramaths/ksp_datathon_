import os
from flask import Flask, jsonify
import pandas as pd
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS"]}})

def add_header(response):
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0'
    return response

app.after_request(add_header)

def get_processed_data():
    # Adjust the file path as per your local setup
    csv_file_path = r'Copy of FIR_Details_Data.csv'
    df = pd.read_csv(csv_file_path)
    df_filtered = df[df['UnitName'] == 'Amengad PS'].copy()
    df_filtered['Arrested Male'] = pd.to_numeric(df_filtered['Arrested Male'], errors='coerce').fillna(0)
    df_filtered['Arrested Female'] = pd.to_numeric(df_filtered['Arrested Female'], errors='coerce').fillna(0)
    df_filtered['Total Arrested'] = df_filtered['Arrested Male'] + df_filtered['Arrested Female']
    aggregated_data = df_filtered.groupby('CrimeGroup_Name')['Total Arrested'].sum().reset_index()
    return aggregated_data.to_dict('records')

def get_crime_locations(unit_name='Amengad PS'):
    csv_file_path = r'Copy of FIR_Details_Data.csv'
    df = pd.read_csv(csv_file_path)
    df = df[df['UnitName'] == unit_name]

    def aggregate_locations(group):
        return [(row['Latitude'], row['Longitude']) for index, row in group.iterrows()]

    crime_by_unit = df.groupby(['CrimeGroup_Name']).apply(aggregate_locations).reset_index(name='Locations')

    crime_dict = {row['CrimeGroup_Name']: row['Locations'] for index, row in crime_by_unit.iterrows()}
    return crime_dict



@app.route("/")
def index():
    return "Hello from Local!"

@app.route("/health", methods=['GET'])
def health_check():
    return jsonify({"status": "UP"}), 200

@app.route("/data", methods=['GET'])
def get_data():
    data_for_chart = get_processed_data()
    return jsonify(data_for_chart)


@app.route("/crime_locations", methods=['GET'])
def crime_locations():
    data = get_crime_locations()
    return jsonify(data)

if __name__ == "__main__":
    # Run the Flask app without threading or ngrok setup
    app.run(debug=True, port=5000)