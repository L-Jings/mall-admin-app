import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') { // 去其他页面到话，需要判断是否登陆成功
    if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
      // 满足条件到话
      return next();
    }
    return next('/login'); // 不满足到话回到登陆页
  }
  return next();
});
export default router;
