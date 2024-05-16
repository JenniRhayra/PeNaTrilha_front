
import { API_URL } from '@/app/settings'
import axios from 'axios'


const api = axios.create({
    baseURL: API_URL,
    // headers: {
    //     Authorization: `Bearer ${token}`
    // }
})


api.interceptors.response.use(   (response) => {
    return response;
  }, )

export { api }