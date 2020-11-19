import axios from 'axios';

export default async function getPandemicData(){

    return await axios.get(process.env.REACT_APP_API_ENDPOINT);
        
}