# Backend Instructions

## Quickstart
1. Install Dependencies.
```
pip install -r requirements.txt
```
2. Create a venv (if not present) and activate it (instructions for unix operating systems)
```
python -m venv venv 

source venv/bin/activate
```

3. Use the provided makefile to spin up the dev server
```
make dev
```
4. Test endpoints with cURL/Tool of your choosing(e.g. Postman/Insomnia) OR just integrate to frontend.

<br>

Port number is 8000, so the full baseURL will be `http://localhost:8000