import axios from 'axios';
import Util from '../Utilis/utilis';
const { getCookie } = Util;
export const instance = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    Authorization: `Bearer ${getCookie('token')}`
  }
});
