import requests as req
from bs4 import BeautifulSoup as soup

import sys 
import json

HEADERS = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36'}

def parseHtml(url):
    
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
    
    #Global numbers
    numbers = tag.findAll('div',{'class':'maincounter-number'})
    
    #Active and closed cases
    cases   = tag.findAll('div',{'class':'number-table-main'})

    

    countries = []

    for state in ["Serbia","Bosnia and Herzegovina","Bulgaria","Montenegro","Croatia"]:
        
        table   = tag.select("#main_table_countries_today tr:has(> td:contains(\""+state+"\"))")
        countryData = table[0].find_all('td')

        countries.append({ 
            "country" : state,
            "totalCases" : countryData[2].text,
            "newCases" : countryData[3].text,
            "totalDeaths" : countryData[4].text,
            "newDeaths" : countryData[5].text,
            "totalRecove" : countryData[6].text,
            "activeCases" : countryData[8].text,
            "seriousCritic" : countryData[9].text
        })

    #Get data about Serbia
    #soup.select('#main_table_countries_today tr:has(> td:contains("Serbia"))')

    tempCasesData = []

    for single in cases:
        tempCasesData.append(int(single.text.replace(',','')))

   
    tempData = []

    for single in numbers:
        
        tempData.append(int(single.find('span').text.replace(',','')))

    data = {
        "numberOfCases" : tempData[0],
        "numberOfDeaths" : tempData[1],
        "numberOfRecovered" : tempData[2],
        "activeCases" : tempCasesData[0],
        "closedCases" : tempCasesData[1],
        "groupByCountry" : countries
    }

    return json.dumps(data)
    
    #return tag.findAll('div',{'class':'maincounter-number'})