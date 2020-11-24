from flask import Flask, request
from flask_cors import CORS, cross_origin
from graphene import ObjectType, String, Schema
from modules import scraper
import time
import json


app = Flask(__name__)
CORS(app, support_credentials=True)

class Query(ObjectType):
    # this defines a Field `hello` in our Schema with a single Argument `name`
    hello = String(name=String(default_value="stranger"))
    goodbye = String()

    # our Resolver method takes the GraphQL context (root, info) as well as
    # Argument (name) for the Field and returns data for the query Response
    def resolve_hello(root, info, name):
        return f'Hello {name}!'

    def resolve_goodbye(root, info):
        return 'See ya!'

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

#@app.route('/graphql', methods=['POST'])
#def graph():
    #req_data = json.loads(request.get_data())
    #print(type(request.get_data()))
    #print(req_data['query'])
    #result = schema.execute(req_data['query'])
    #print(result.data)
    #print(dir(result))
    #return json.dumps(result.data)
    #result = schema.execute(req_data['query'])
    #print(result.data['hello'])
    #return req_data

if __name__ == '__main__':
   app.run(debug = True)