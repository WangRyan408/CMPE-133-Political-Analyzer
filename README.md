# CMPE 133 Political Analyzer

## Introduction
This is our Group Project for CMPE 133. It's a full stack React.js app rolled using Next.js. Our backend is running on python using FastAPI.

Our project is intended to help people more easily understand the angle of their news content. Using machine learning techniques, our web app will return the political leaning of an article ranging from left (1) to right (0)

## Quickstart 
### Fastapi-SQLite
While in the Fastapi-SQLite directory in a terminal window, create a binaries folder and store the mlp_model.joblib file in it. Then, run "pip install -r requirements.txt" to install the python libraries. Then, run "uvicorn main:app --reload" to run the backend.

### political-analyzer
Make sure to have Node.js and npm installed. While in the political-analyzer in a terminal window, run "npm install --force" and then run "npm run dev" to run the frontend.

### Both the frontend and backend needs to run simultaneously

## Contributions
Ryan: Worked on the frontend and connecting the frontend to the backend using endpoints
<br>
Josh: Worked on the neural network model and scraper for parsing articles
<br>
Marcus: Worked on establishing the database and endpoints
<br>
Ngoc: Worked on frontend design
