import requests as req
from bs4 import BeautifulSoup as soup

import sys 

HEADERS = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36'}

def parseHtml(url):


    # open connection and grab pages content
    #uClient = uReq.Request(url,HEADERS)
    #url = ''
    # regex for url in test progress ^(https|http):\/\/((www)\.([a-z]+)|([a-z]+))\.([a-z]*)(\/[a-z-?=]*)*$

    #if re.findall("^(http(s)?):\/\/(www\.)?((?!www)[a-z]{3,}\.[a-z]{2,})(\/[a-z-?=]*)*$",url) == []:
    #    print('You must enter valid url')
    #    loggingScrape.logging.error('Regex for url address failed.')
    #    exit(0)
    
    uClient = req.get(url,HEADERS)
    pageHtml = uClient.content

    # 301 is redirection, may couse trouble
    if uClient.status_code != 200:
        print(f"Web site in not responding, server error {uClient.status_code}.")
        exit(0) 

#html parsing
# Connect to the URL
    parsedPage = soup(pageHtml,"html.parser")
    tag     = parsedPage.body
    numbers = tag.findAll('div',{'class':'maincounter-number'})
    #print(numbers)
    cases   = tag.findAll('div',{'class':'number-table-main'})

    tempCasesData = []

    for single in cases:
        tempCasesData.append(int(single.text.replace(',','')))

   
    tempData = []

    for single in numbers:
        
        tempData.append(int(single.find('span').text.replace(',','')))

    data = {
        "numberOfCases"     : tempData[0],
        "numberOfDeaths"    : tempData[1],
        "numberOfRecovered" : tempData[2],
        "activeCases"       : tempCasesData[0],
        "closedCases"       : tempCasesData[1]
    }


    print(data)
    exit(0)
    return tag.findAll('div',{'class':'maincounter-number'})