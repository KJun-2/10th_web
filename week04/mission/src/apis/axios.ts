import axios from 'axios';
import { LOCAL_STORAGE_KEY } from '../constants/key';

const axiosIntance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)}`,
  },
});
export default axiosIntance;
