import axios from 'axios';

export default async function getPandemicData(){

    //"http://127.0.0.1:5000/graphql"
    return await axios.post(process.env.REACT_APP_API_ENDPOINT,
    {
        query:`
            {
                worldwide{
                    numberOfCases
                    numberOfDeaths
                    numberOfRecovered
                    activeCases
                    closedCases
                    groupByCountry{
                        country
                        totalCases
                        newCases
                        totalDeaths
                        newDeaths
                        totalRecove
                        activeCases
                        seriousCritic
                    }
                }
            }`
    });
}