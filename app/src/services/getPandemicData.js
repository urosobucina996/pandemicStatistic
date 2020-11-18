import axios from 'axios';

export default async function getPandemicData(){

    return await axios.get(`http://localhost:5000/`);
        
}