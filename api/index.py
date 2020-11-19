from modules import request
import time
from flask import Flask
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route('/', methods=['GET'])
@cross_origin(supports_credentials=True)
def start():
    start = time.time()
    try:
        return request.parseHtml('https://www.worldometers.info/coronavirus/')

    except Exception as e:
        print(e)

    print(time.time()-start," seconds")

if __name__ == '__main__':
   app.run(debug = True)