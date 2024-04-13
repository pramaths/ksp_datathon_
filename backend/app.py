import pandas as pd
from flask import Flask, jsonify, send_file
from flask_cors import CORS
from datetime import datetime
app = Flask(__name__)
CORS(app)

csv_file_path = r'Narayanapura_PS_Unit.csv'  # Update to your CSV file path
csv_file_path1 = r'merged_dataset.csv'  # Update to your CSV file path
df = pd.read_csv(csv_file_path1)
def calculate_io_details(unit_name):
    df = pd.read_csv(csv_file_path1)
    
    # Filter by unit_name
    df = df[df['UnitName'].str.strip().str.upper() == unit_name.upper()]

    # Convert date strings to datetime objects for calculation
    df['Offence_From_Date'] = pd.to_datetime(df['Offence_From_Date'], errors='coerce')
    df['Final_Report_Date'] = pd.to_datetime(df['Final_Report_Date'], errors='coerce')

    # Calculate the duration for each case, handling NaNs
    df['Case_Duration'] = (df['Final_Report_Date'] - df['Offence_From_Date']).dt.days.fillna(0)

    # Generating a crime identifier and aggregating crime details
    df['Crime_ID'] = df['CrimeGroup_Name'] + '_' + df['CrimeHead_Name']
    crime_details = df.groupby(['IOName', 'Crime_ID', 'CrimeGroup_Name', 'CrimeHead_Name']).agg({
        'Arrested Count No.': 'sum',
        'Conviction Count': 'sum',
        'Case_Duration': 'mean'
    }).reset_index()

    crime_details['Crime_Info'] = crime_details.apply(lambda x: {
        'CrimeGroup': x['CrimeGroup_Name'], 
        'CrimeHead': x['CrimeHead_Name'], 
        'Duration': round(x['Case_Duration'], 2),  # Ensure NaNs are handled
        'Arrested_Count': int(x['Arrested Count No.']),  # Convert to int, handling NaNs
        'Conviction_Count': int(x['Conviction Count'])  # Convert to int, handling NaNs
    }, axis=1)

    # Now, aggregate by IOName for overall statistics
    io_aggregation = crime_details.groupby('IOName').agg({
        'Crime_Info': list,
        'Case_Duration': 'mean',
        'Arrested Count No.': 'sum',
        'Conviction Count': 'sum'
    }).reset_index()

    io_aggregation.rename(columns={
        'Case_Duration': 'Average_Duration',
        'Arrested Count No.': 'Total_Arrested_Count',
        'Conviction Count': 'Total_Conviction_Count'
    }, inplace=True)

    io_aggregation['Average_Duration'] = io_aggregation['Average_Duration'].fillna(0).round(2)

    # Converting to the desired output format
    final_data = io_aggregation.to_dict('records')
    for record in final_data:
        record.update({
            'Case_Count': len(record['Crime_Info']),
            'Total_Arrested_Count': int(record.pop('Total_Arrested_Count')),
            'Total_Conviction_Count': int(record.pop('Total_Conviction_Count'))
        })

    return final_data



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

def calculate_metrics_for_officer(df, officer_name):
    officer_data = df[df['IOName'] == officer_name]
    fir_count = len(officer_data)
    charged_count = officer_data['Accused_ChargeSheeted Count'].sum()
    conviction_count = officer_data['Conviction Count'].sum()

    return fir_count, charged_count, conviction_count
@app.route("/data/<unit_name>")
def get_station_data(unit_name):
    data = process_data(unit_name)
    return jsonify(data)

@app.route("/io_details/<unit_name>")
def get_io_details(unit_name):
    data = calculate_io_details(unit_name)
    return jsonify(data)


# def calculate_io_performance(csv_file_path):
#     df = pd.read_csv(csv_file_path)
    
#     # Calculate FIR count by IO
#     fir_count_by_io = df.groupby('IOName').size().reset_index(name='FIR_Count')
    
#     # Calculate convictions by IO
#     convictions_by_io = df.groupby('IOName')['Conviction Count'].sum().reset_index()
#     performance_data = pd.merge(fir_count_by_io, convictions_by_io, on='IOName')
    
#     # Total FIRs and Convictions for rate calculations
#     total_firs = performance_data['FIR_Count'].sum()
#     total_convictions = performance_data['Conviction Count'].sum()
    
#     # Adding total counts for pie chart visualization
#     performance_data['Total_FIRs'] = total_firs
#     performance_data['Total_Convictions'] = total_convictions
    
#     # Convert to dictionary for JSON response
#     performance_dict = performance_data.to_dict('records')
#     return performance_dict


# @app.route('/io_performance')
# def io_performance():
#     csv_file_path = r'merged_dataset.csv'  # Update this path
#     data = calculate_io_performance(csv_file_path)
#     return jsonify(data)

@app.route('/filter_csv/<unitname>')
def filter_csv(unitname):
    # Load the large dataset
    csv_file_path = r'Copy of FIR_Details_Data.csv'  # Update this to your actual CSV file path
    df = pd.read_csv(csv_file_path)

    # Filter the DataFrame based on 'UnitName'
    filtered_df = df[df['UnitName'].str.upper() == unitname.upper()]

    # Save the filtered DataFrame to a new CSV file
    filtered_csv_path = f'/tmp/filtered_{unitname}.csv'  # Using /tmp for temporary storage
    filtered_df.to_csv(filtered_csv_path, index=False)

    # Send the filtered CSV file to the client
    return send_file(filtered_csv_path, as_attachment=True)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
