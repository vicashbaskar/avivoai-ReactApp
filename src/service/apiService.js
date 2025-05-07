import axios from 'axios';
import apiConfig from '../config/config';

const api = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
