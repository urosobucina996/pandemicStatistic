from modules import request
import time


start = time.time()
try:
    request.parseHtml('https://www.worldometers.info/coronavirus/')

except Exception as e:
    print(e)

print(time.time()-start," seconds")