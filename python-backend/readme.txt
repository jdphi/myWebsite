use this command to start up the server
gunicorn -w 4 -b 127.0.0.1:5001 scraper:app