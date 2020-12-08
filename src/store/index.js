import Vue from 'vue';
import Vuex from 'vuex';
import { setCookie, getUserCookie, removeUserCookie } from '@/utils/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed: false, // 导航收放状态，false为展开 true为收起来
    user: getUserCookie(), // 获取cookie存储但user信息
  },
  mutations: {
    ChangeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUserInfo(state, userInfo) { // 设置用户信息
      state.user = userInfo;
    },
    logout(state) { // 退出后清空用户信息
      state.user = {
        username: '',
        appkey: '',
        role: '',
        email: '',
      };
    },
  },
  actions: {
    ChangeCollapsed({ commit }) {
      commit('ChangeCollapsed');
    },
    setUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
      setCookie(userInfo); // cookie存储user信息
    },
    logout({ commit }) {
      commit('logout');
      removeUserCookie(); // 移除cookie
    },
  },
  modules: {
  },
});
