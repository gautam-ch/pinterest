import axios from 'axios';

const apiCall = axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL
})

export default apiCall;
