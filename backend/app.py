
# import os
# from flask import Flask, jsonify
# import pandas as pd
# from flask_cors import CORS, cross_origin

# app = Flask(__name__)
# CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS"]}})

# def add_header(response):
#     response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0'
#     return response

# app.after_request(add_header)

# def get_processed_data():
#     # Load the CSV files
#     csv_file_path1 = r'Copy of ChargsheetedDetails.csv'
#     csv_file_path2 = r'Copy of FIR_Details_Data.csv'
#     df1 = pd.read_csv(csv_file_path1)
#     df2 = pd.read_csv(csv_file_path2)

#     # Process the data for the distributed treemap
#     df_filtered = df2[df2['UnitName'] == 'Bhagamandala PS'].copy()
#     df_filtered['Arrested Male'] = pd.to_numeric(df_filtered['Arrested Male'], errors='coerce').fillna(0)
#     df_filtered['Arrested Female'] = pd.to_numeric(df_filtered['Arrested Female'], errors='coerce').fillna(0)
#     df_filtered['Total Arrested'] = df_filtered['Arrested Male'] + df_filtered['Arrested Female']
#     treemap_data = df_filtered.groupby('CrimeGroup_Name')['Total Arrested'].sum().reset_index().to_dict('records')

#     # Process the data for the bar graphs
#     bar_graph_data = df2.groupby(['CrimeGroup_Name', 'CrimeHead_Name'])['Accused Count'].sum().reset_index().to_dict('records')

#     # Process the data for the pie chart
#     pie_chart_data = df2.groupby('FIR Type')['FIR_ID'].count().reset_index().to_dict('records')

#     # Process the data for the bubble chart
#     bubble_chart_data = df2.groupby(['Village_Area_Name'])[['FIR_ID', 'Latitude', 'Longitude']].agg({'FIR_ID': 'count', 'Latitude': 'mean', 'Longitude': 'mean'}).reset_index().to_dict('records')

#     return {
#         'treemap_data': treemap_data,
#         'bar_graph_data': bar_graph_data,
#         'pie_chart_data': pie_chart_data,
#         'bubble_chart_data': bubble_chart_data
#     }

# def get_crime_locations(unit_name='Amengad PS'):
#     csv_file_path = r'Copy of FIR_Details_Data.csv'
#     df = pd.read_csv(csv_file_path)
#     df = df[df['UnitName'] == unit_name]

#     def aggregate_locations(group):
#         return [(row['Latitude'], row['Longitude']) for index, row in group.iterrows()]

#     crime_by_unit = df.groupby(['CrimeGroup_Name']).apply(aggregate_locations).reset_index(name='Locations')

#     crime_dict = {row['CrimeGroup_Name']: row['Locations'] for index, row in crime_by_unit.iterrows()}
#     return crime_dict



# @app.route("/")
# def index():
#     return "Hello from Local!"

# @app.route("/data", methods=['GET'])
# def get_data():
#     processed_data = get_processed_data()
#     return jsonify(processed_data)


# @app.route("/crime_locations", methods=['GET'])
# def crime_locations():
#     data = get_crime_locations()
#     return jsonify(data)

# if __name__ == "__main__":
#     app.run(debug=True, port=5000)


# import os
# from flask import Flask, jsonify
# import pandas as pd
# from flask_cors import CORS, cross_origin

# app = Flask(__name__)
# CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS"]}})

# def add_header(response):
#     response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0'
#     return response

# app.after_request(add_header)

# def get_processed_data():
#     # Adjust the file path as per your local setup
#     csv_file_path = r'Narayanapura_PS_Unit.csv'
#     df = pd.read_csv(csv_file_path)
#     df_filtered = df[df['UnitName'] == 'Narayanapura PS'].copy()
#     df_filtered['Arrested Male'] = pd.to_numeric(df_filtered['Arrested Male'], errors='coerce').fillna(0)
#     df_filtered['Arrested Female'] = pd.to_numeric(df_filtered['Arrested Female'], errors='coerce').fillna(0)
#     df_filtered['Total Arrested'] = df_filtered['Arrested Male'] + df_filtered['Arrested Female']
#     aggregated_data = df_filtered.groupby('CrimeGroup_Name')['Total Arrested'].sum().reset_index()
#     return aggregated_data.to_dict('records')

# def get_crime_locations(unit_name='Amengad PS'):
#     csv_file_path = r'Narayanapura_PS_Unit.csv'
#     df = pd.read_csv(csv_file_path)
#     df = df[df['UnitName'] == unit_name]

#     def aggregate_locations(group):
#         return [(row['Latitude'], row['Longitude']) for index, row in group.iterrows()]

#     crime_by_unit = df.groupby(['CrimeGroup_Name']).apply(aggregate_locations).reset_index(name='Locations')

#     crime_dict = {row['CrimeGroup_Name']: row['Locations'] for index, row in crime_by_unit.iterrows()}
#     return crime_dict



# @app.route("/")
# def index():
#     return "Hello from Local!"

# @app.route("/health", methods=['GET'])
# def health_check():
#     return jsonify({"status": "UP"}), 200

# @app.route("/data", methods=['GET'])
# def get_data():
#     data_for_chart = get_processed_data()
#     return jsonify(data_for_chart)


# @app.route("/crime_locations", methods=['GET'])
# def crime_locations():
#     data = get_crime_locations()
#     return jsonify(data)

# if __name__ == "__main__":
#     # Run the Flask app without threading or ngrok setup
#     app.run(debug=True, port=5000)

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
