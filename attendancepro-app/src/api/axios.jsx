import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:1111/api',
});

export default api;