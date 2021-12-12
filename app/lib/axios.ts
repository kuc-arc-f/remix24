import Axios from 'axios'
import Config from '../../config';

//console.log(Config.API_URL);
const axios = Axios.create({
    baseURL: Config.API_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
})
 
export default axios
