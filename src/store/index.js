import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed: false,
  },
  mutations: {
    ChangeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
  },
  actions: {
    ChangeCollapsed({ commit }) {
      commit('ChangeCollapsed');
    },
  },
  modules: {
  },
});
