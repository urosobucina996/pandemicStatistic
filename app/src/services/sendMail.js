import axios from 'axios';

export default async function sendMail(formData){

    return await axios.post(process.env.REACT_APP_FORM_ENDPOINT, formData);
        
}