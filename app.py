from modules import request


try:
    request.parseHtml('https://www.worldometers.info/coronavirus/')

except Exception as e:
    print(e)