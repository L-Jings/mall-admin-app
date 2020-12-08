import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});

// 创建一个请求拦截
instance.interceptors.request.use((config) => config,
  (error) => Promise.reject(error));

// 创建一个响应拦截
instance.interceptors.response.use((response) => {
  console.log(response);
  if (response.data.status === 'fail') {
    // 如果账号或密码错误
    return Promise.reject(response.data.msg);
  }
  return response.data.data;
}, (error) => Promise.reject(error));

export default instance;
