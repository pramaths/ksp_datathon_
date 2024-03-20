
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
    # Load the CSV files
    csv_file_path1 = r'Copy of ChargsheetedDetails.csv'
    csv_file_path2 = r'Copy of FIR_Details_Data.csv'
    df1 = pd.read_csv(csv_file_path1)
    df2 = pd.read_csv(csv_file_path2)

    # Process the data for the distributed treemap
    df_filtered = df2[df2['UnitName'] == 'Amengad PS'].copy()
    df_filtered['Arrested Male'] = pd.to_numeric(df_filtered['Arrested Male'], errors='coerce').fillna(0)
    df_filtered['Arrested Female'] = pd.to_numeric(df_filtered['Arrested Female'], errors='coerce').fillna(0)
    df_filtered['Total Arrested'] = df_filtered['Arrested Male'] + df_filtered['Arrested Female']
    treemap_data = df_filtered.groupby('CrimeGroup_Name')['Total Arrested'].sum().reset_index().to_dict('records')

    # Process the data for the bar graphs
    bar_graph_data = df2.groupby(['CrimeGroup_Name', 'CrimeHead_Name'])['Accused Count'].sum().reset_index().to_dict('records')

    # Process the data for the pie chart
    pie_chart_data = df2.groupby('FIR Type')['FIR_ID'].count().reset_index().to_dict('records')

    # Process the data for the bubble chart
    bubble_chart_data = df2.groupby(['Village_Area_Name'])[['FIR_ID', 'Latitude', 'Longitude']].agg({'FIR_ID': 'count', 'Latitude': 'mean', 'Longitude': 'mean'}).reset_index().to_dict('records')

    return {
        'treemap_data': treemap_data,
        'bar_graph_data': bar_graph_data,
        'pie_chart_data': pie_chart_data,
        'bubble_chart_data': bubble_chart_data
    }

@app.route("/")
def index():
    return "Hello from Local!"

@app.route("/data", methods=['GET'])
def get_data():
    processed_data = get_processed_data()
    return jsonify(processed_data)

if __name__ == "__main__":
    app.run(debug=True, port=5000)

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
#     csv_file_path = r'Copy of FIR_Details_Data.csv'
#     df = pd.read_csv(csv_file_path)
#     df_filtered = df[df['UnitName'] == 'Amengad PS'].copy()
#     df_filtered['Arrested Male'] = pd.to_numeric(df_filtered['Arrested Male'], errors='coerce').fillna(0)
#     df_filtered['Arrested Female'] = pd.to_numeric(df_filtered['Arrested Female'], errors='coerce').fillna(0)
#     df_filtered['Total Arrested'] = df_filtered['Arrested Male'] + df_filtered['Arrested Female']
#     aggregated_data = df_filtered.groupby('CrimeGroup_Name')['Total Arrested'].sum().reset_index()
#     return aggregated_data.to_dict('records')

# @app.route("/")
# def index():
#     return "Hello from Local!"


# @app.route("/data", methods=['GET'])
# def get_data():
#     data_for_chart = get_processed_data()
#     return jsonify(data_for_chart)

# if __name__ == "__main__":
#     # Run the Flask app without threading or ngrok setup
#     app.run(debug=True, port=5000)
