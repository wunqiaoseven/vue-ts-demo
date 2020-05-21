import axios from 'axios';
import {Message} from 'element-ui';
import store from '../store/index';

const httpConfig = axios.create({
  timeout: 30000,// 请求超时时间
  withCredentials: true,
});

httpConfig.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer ' + store.getters['user/jwt'];
  return config;
}, error => Promise.reject(error));

httpConfig.interceptors.response.use(
  res => {
    if (res.data.code === 4001) {//用户信息失效
      store.dispatch('/user/loginOut')
    } else {
      return res;
    }
  },
  error => {
    if (error.response.status === 401) {
      store.dispatch('/user/loginOut')
    }
    Message({
      message: error.description,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  },
);

export default httpConfig;
