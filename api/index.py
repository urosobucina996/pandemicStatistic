from flask import Flask, request
from flask_cors import CORS, cross_origin
from graphene import ObjectType, Schema, Field
import json
from modules import scraper
from models.worldwidedata import WorldWideData

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, support_credentials=True)

class Query(ObjectType):  

    class Meta:
        description = 'Query to get all data.'
        model = WorldWideData
    
    worldwide = Field(WorldWideData)

    def resolve_worldwide(parent, info):

        data = scraper.parsehtml('https://www.worldometers.info/coronavirus/')
        jsonData = json.loads(data)
        return jsonData
        
    

schema = Schema(query=Query)

@app.route('/graphql', methods=['POST'])
@cross_origin(support_credentials=True)
def graph():
    req_data = json.loads(request.get_data())
    result = schema.execute(req_data['query'])
    return json.dumps(result.data)

if __name__ == '__main__':
   app.run(debug = True)