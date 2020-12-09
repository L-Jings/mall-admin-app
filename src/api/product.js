import axios from '@/axios';

// 获取产品信息，用来渲染table
export default {
  list(params) {
    return axios.get('/products/all', { params });
  },
  remove(params) {
    return axios.delete(`/products/${params.id}`);
  },
};
