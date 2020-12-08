import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';
import getMenuRoute from '../utils/permission';

Vue.use(VueRouter);
const ayncRouterMap = [{
  path: '/product',
  name: 'Product',
  meta: {
    title: '商品',
  },
  component: Home,
  children: [{
    path: 'list',
    name: 'ProductList',
    meta: {
      title: '商品列表',
    },
    component: () => import('../views/pages/ProductList.vue'),
  }, {
    path: 'add',
    name: 'ProductAdd',
    meta: {
      title: '添加商品',
    },
    component: () => import('../views/pages/ProductAdd.vue'),
  }, {
    path: 'category',
    name: 'Category',
    meta: {
      title: '类目管理',
    },
    component: () => import('../views/pages/category.vue'),
  }],
}];
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
    },
    children: [{
      path: 'index',
      name: 'Index',
      meta: {
        title: '统计',
      },
      component: () => import('../views/pages/index.vue'),
    }],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登陆',
    },
    component: Login,
  },
];

const router = new VueRouter({
  routes,
});
let isAddRoutes = false;// 不让死循环的条件
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') { // 去其他页面到话，需要判断是否登陆成功
    if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
      // 满足条件到话
      if (!isAddRoutes) {
        const menuRoutes = getMenuRoute(store.state.user.role, ayncRouterMap);
        // 添加路由
        router.addRoutes(menuRoutes);
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes));
        isAddRoutes = true;
      }
      return next();
    }
    return next('/login'); // 不满足到话回到登陆页
  }
  return next();
});
export default router;
