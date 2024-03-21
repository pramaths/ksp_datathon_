import pandas as pd
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

csv_file_path = r'Narayanapura_PS_Unit.csv'  # Update to your CSV file path

def process_data(unit_name):
    df = pd.read_csv(csv_file_path)

    # Standardize string fields and handle missing/incorrect numeric values
    df['UnitName'] = df['UnitName'].str.strip().str.upper()
    df['IOName'] = df['IOName'].str.strip().str.upper()
    df['Latitude'] = pd.to_numeric(df['Latitude'], errors='coerce')
    df['Longitude'] = pd.to_numeric(df['Longitude'], errors='coerce')

    # Filter based on UnitName provided in the request (case-insensitive)
    df_filtered = df[df['UnitName'].str.upper() == unit_name.upper()]

    # Exclude entries with invalid latitude and longitude
    df_filtereds = df_filtered[(df_filtered['Latitude'] != 0) & (df_filtered['Longitude'] != 0)]

    # Handle missing values for 'Arrested Male' and 'Arrested Female'
    df_filtered['Arrested Male'] = pd.to_numeric(df_filtered['Arrested Male'], errors='coerce').fillna(0)
    df_filtered['Arrested Female'] = pd.to_numeric(df_filtered['Arrested Female'], errors='coerce').fillna(0)
    df_filtered['Total Arrested'] = df_filtered['Arrested Male'] + df_filtered['Arrested Female']

    tippanna_exists = df_filtered['IOName'].str.contains('TIPPANNA   (PSI)', case=False, na=False).any()
    print(f"TIPPANNA exists in processed data: {tippanna_exists}")

    # Data processing for various charts
    tree_data = df_filtered.groupby('CrimeGroup_Name')['Total Arrested'].sum().reset_index()
    bar_chart_data = df_filtered['Year'].value_counts().sort_index().reset_index(name='FIR_Count')
    bar_chart_data.columns = ['Year', 'FIR_Count']
    io_case_count = df_filtered.groupby('IOName').size().reset_index(name='Cases')
    pie_chart_data = df_filtered['Complaint_Mode'].value_counts().reset_index(name='Count')
    pie_chart_data.columns = ['Complaint_Mode', 'Count']
    map_locations = df_filtereds.groupby(['CrimeGroup_Name'])[['Latitude', 'Longitude']].apply(lambda x: x.to_dict('records')).reset_index(name='Locations')

    return {
        'tree_data': tree_data.to_dict('records'),
        'bar_chart_data': bar_chart_data.to_dict('records'),
        'bubble_chart_data': io_case_count.to_dict('records'),
        'pie_chart_data': pie_chart_data.to_dict('records'),
        'map_locations': map_locations.to_dict('records')
    }


@app.route("/data/<unit_name>")
def get_station_data(unit_name):
    data = process_data(unit_name)
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
