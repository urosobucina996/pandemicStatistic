from graphene import ObjectType, String, Int, Float, List, Field
 
class CountryData(ObjectType):
    ''' All data of certian country '''
    country = String(description="Name of country for statistic")
    totalCases = String()
    newCases = String(required=False, default_value=None)
    totalDeaths = String()
    newDeaths = String()
    totalRecove = String(required=False, default_value=None)
    activeCases = String()
    seriousCritic = String()


class WorldWideData(ObjectType):
    ''' Get globaly and country group data '''
    numberOfCases = Int()
    numberOfDeaths = Int()
    numberOfRecovered = Int()
    activeCases = Int()
    closedCases = Int()
    groupByCountry = List(CountryData)
