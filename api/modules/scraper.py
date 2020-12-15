import requests as req
from bs4 import BeautifulSoup as soup

import sys 
import json

HEADERS = {'User-Agent': '''Mozilla/5.0 (Macintosh;
                            Intel Mac OS X 10_9_3) 
                            AppleWebKit/537.36 (KHTML, like Gecko) 
                            Chrome/35.0.1916.47 Safari/537.36'''}

def parsehtml(url):
    
    u_client = req.get(url,HEADERS)
    page_html = u_client.content

    # 301 is redirection, may couse trouble
    if u_client.status_code != 200:
        print(f"Web site in not responding, server error {u_client.status_code}.")
        exit(0) 

    # Connect to the URL
    parsed_page = soup(page_html,"html.parser")
    tag     = parsed_page.body
    
    #Global numbers
    numbers = tag.findAll('div',{'class':'maincounter-number'})
    
    #Active and closed cases
    cases   = tag.findAll('div',{'class':'number-table-main'})

    

    countries = []

    for state in ["Serbia","Bosnia and Herzegovina","Bulgaria","Montenegro","Croatia"]:
        
        table   = tag.select("#main_table_countries_today tr:has(> td:contains(\""+state+"\"))")
        country_data = table[0].find_all('td')

        countries.append({ 
            "country" : state,
            "totalCases" : country_data[2].text,
            "newCases" : country_data[3].text,
            "totalDeaths" : country_data[4].text,
            "newDeaths" : country_data[5].text,
            "totalRecove" : country_data[6].text,
            "activeCases" : country_data[8].text,
            "seriousCritic" : country_data[9].text
        })


    temp_cases_data = [int(single.text.replace(',','')) for single in cases]

    temp_data = [int(single.find('span').text.replace(',','')) for single in numbers]

    data = {
        "numberOfCases" : temp_data[0],
        "numberOfDeaths" : temp_data[1],
        "numberOfRecovered" : temp_data[2],
        "activeCases" : temp_cases_data[0],
        "closedCases" : temp_cases_data[1],
        "groupByCountry" : countries
    }

    return json.dumps(data)