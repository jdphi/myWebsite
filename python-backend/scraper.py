from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)
#Initializes CORS support for your Flask app, allowing requests from any domain.
CORS(app, resources={r"/*": {"origins": "*"}})

#This decorator ensures that CORS headers are added to every response, not just those coming from successful requests.
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route('/scrape', methods=['GET'])
def scrape():
    url = request.args.get('url', 'https://example.com')
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        #soup = soup.prettify()
        page_text = soup.get_text()
        return jsonify({'text': page_text})
    #When an error occurs (like failing to fetch a URL), it returns a JSON response with the error message. This also carries the CORS headers thanks to the after_request function.
    except Exception as e:
        return make_response(jsonify({'error': str(e)}), 500)

if __name__ == '__main__':
    app.run(debug=True, port=5001)