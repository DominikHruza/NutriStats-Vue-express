import axios from 'axios';

const axiosInstance = axios.create(

);

axiosInstance.interceptors.request.use(function(config) {
  const token = localStorage.getItem('token');
  config.headers.common['x-auth-token'] = token;

  return config;
});
export default axiosInstance;
