import axios from 'axios';
import store from './store';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});

// 创建一个请求拦截
instance.interceptors.request.use((config) => {
  if (config.url.includes('/passport')) {
    // 如果url包含这个字段，说明请求是不需要appkey
    return config;
  } // 如果需要aapkey，重新配置config
  return {
    ...config,
    params: {
      ...config.params,
      appkey: store.state.user.appkey,
    },
  };
},
(error) => Promise.reject(error));

// 创建一个响应拦截
instance.interceptors.response.use((response) => {
  if (response.data.status === 'fail') {
    // 如果账号或密码错误
    return Promise.reject(response.data.msg);
  }
  return response.data.data;
}, (error) => Promise.reject(error));

export default instance;
