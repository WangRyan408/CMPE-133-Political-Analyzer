# CMPE 133 Political Analyzer

## Introduction
This is our Group Project for CMPE 133. It's a full stack React.js app rolled using Next.js. Our backend is running on python using FastAPI.

Our project is intended to help people more easily understand the angle of their news content. Using machine learning techniques, our web app will return the political leaning of an article ranging from left (1) to right (0)

## Quickstart 

### Requirements to run
Make sure to have python v12+ and Node.js v14+ installed and linked through environmental variables

### Fastapi-SQLite
While in the Fastapi-SQLite directory in a terminal window, create a binaries folder and store the mlp_model.joblib file (which can be found [here](https://drive.google.com/drive/folders/1X3ZzlYjBjqDRfIfiwIEuNOo-chdCSpYI?usp=sharing)) in it. The directory for this file should be project_folder/Fastapi-SQLite/binaries. Then, while still in the Fastapi-SQLite directory, run "pip install -r requirements.txt" to install the python libraries. Then, run "uvicorn main:app --reload" to run the backend.

### political-analyzer
Make sure to have Node.js and npm installed. While in the political-analyzer directory in a terminal window, run "npm install --force" and then run "npm run dev" to run the frontend.

### Note: Both the frontend and backend needs to run simultaneously

### While running
When running the project for the first time, you will most likely have to download the large language model required for word embedding. This will take a minute to download and can be only be invoked when running the article analysis. 

## Contributions
Ryan: Worked on the frontend and connecting the frontend to the backend using endpoints
<br>
Josh: Worked on the neural network model and scraper for parsing articles
<br>
Marcus: Worked on establishing the database and endpoints
<br>
Ngoc: Worked on frontend design
