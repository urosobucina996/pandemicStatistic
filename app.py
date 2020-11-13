from modules import request
import time
from flask import Flask
app = Flask(__name__)


@app.route('/flask')
def start():
    start = time.time()
    try:
        return request.parseHtml('https://www.worldometers.info/coronavirus/')

    except Exception as e:
        print(e)

    print(time.time()-start," seconds")

if __name__ == '__main__':
   app.run(debug = True)