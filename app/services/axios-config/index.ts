
import { API_URL } from '@/app/settings'
import axios from 'axios'
import { toast } from 'react-toastify';


// const token = localStorage.getItem('@PeNaTrilha:token'); //Descomentar quando finalizar o Auth

const api = axios.create({
    baseURL: API_URL,
    // headers: {
    //     Authorization: `Bearer ${token}`
    // }
})


api.interceptors.response.use(   (response) => {
    return response;
  }, error => {
    const expectedError = 
    error.response &&
    error.response >= 400 &&
    error.response < 500;

    // if(!expectedError){
    //     toast.error("Algo deu errado na requisição", {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "dark",
    //         })
    // }

    return Promise.reject(error)
})

export { api }