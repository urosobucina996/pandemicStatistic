from flask import Flask, request
from flask_cors import CORS, cross_origin
from graphene import ObjectType, Schema, Field, List
from modules import scraper
import time
import json
from models.worldwidedata import WorldWideData

app = Flask(__name__)
CORS(app, support_credentials=True)

data = scraper.parseHtml('https://www.worldometers.info/coronavirus/')
jsonData = json.loads(data)

class Query(ObjectType):  

    class Meta:
        description = 'Query to get all data.'
        model = WorldWideData
    
    worldwide = Field(WorldWideData)

    def resolve_worldwide(parent, info):

        return jsonData
        
    

schema = Schema(query=Query)

@app.route('/', methods=['GET'])
@cross_origin(supports_credentials=True)
def start():
    start = time.time()
    try:
        return scraper.parseHtml('https://www.worldometers.info/coronavirus/')

    except Exception as e:
        print(e)

    print(time.time()-start," seconds")

@app.route('/graphql', methods=['POST'])
def graph():
    req_data = json.loads(request.get_data())
    result = schema.execute(req_data['query'])
    return json.dumps(result.data)

if __name__ == '__main__':
   app.run(debug = True)