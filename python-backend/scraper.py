from flask import Flask, jsonify, request
from flask_cors import CORS
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/scrape', methods=['GET'])
def scrape():
    url = request.args.get('url', 'https://example.com')
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    page_text = soup.get_text()
    return jsonify({'text': page_text})

if __name__ == '__main__':
    app.run(debug=True)
