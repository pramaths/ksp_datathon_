# KSP_datathon
## Features
1. dasboard
2. Progress tracker
3. Task assigner
4. Real-time chart rendering using prompts 


This repository contains the code for the KSP Data Dashboard, an interactive web application designed for data visualization and task management. The project is split into several components, each serving a unique purpose within the overall application.

## Components Overview

- `ksp_ui`: The front-end dashboard for visualizing data built with modern web technologies.
- `backend`: A Flask application that serves as an API server.
- `Manpower_backend`: An Express.js backend dedicated to user management and task assignments.
- `LIDA-Demo-Streamlit-App`: A Streamlit app for interactive data demonstrations.

## Getting Started

Follow these instructions to set up each component of the project on your local machine for development and testing.

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js and npm (for `ksp_ui` and `Manpower_backend`)
- Python 3 and pip (for `backend` and `LIDA-Demo-Streamlit-App`)

### Installation

#### Frontend Dashboard (`ksp_ui`)

Navigate to the `ksp_ui` directory, install the dependencies, and start the development server:

```sh
cd ksp_ui
npm install
npm run dev
```

#### Flask API Backend (`backend`)

Set up a Python virtual environment, activate it, install the required Python packages, and start the Flask application:

```sh
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
flask run
```

...

### Running the Applications

#### Streamlit App (`LIDA-Demo-Streamlit-App`)

To run the Streamlit app for interactive data demonstrations:

```sh
pip install streamlit
cd LIDA-Demo-Streamlit-App
streamlit run app.py  # Replace 'app.py' with the actual name of your Streamlit script
```

### Running the Mapwoer Application

#### Backend Server

To run the backend server for the Mapwoer project:

```bash
# Ensure you are in the root directory of your project first
cd Manpower_backend
npm install
npm start

```

