import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `http://visualsmic.com/`,
  headers: {
    Authorization: 'Bearer {token}',
    "Content-type": "application/json"
  }
})