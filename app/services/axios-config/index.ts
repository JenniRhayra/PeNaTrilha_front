// services/axios-config/connection.ts
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { API_URL } from '@/app/settings';
import { useRouter } from 'next/router';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

    // if (!expectedError) {
    //   toast.error('Ocorreu um erro inesperado.');
    // }

    if (error.response && error.response.status === 401) {
      toast.error('Sessão expirada. Faça login novamente.');
      Cookies.remove('refreshToken');
      const router = useRouter();
      router.push('/'); 
    }

    return Promise.reject(error);
  }
);

export { api };
