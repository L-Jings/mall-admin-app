<template>
  <div class="home">
    <left-menu :key="key"></left-menu>
    <div :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed }">
      <slide-nav></slide-nav>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftMenu from './components/menu.vue';
import SlideNav from './components/sliderNav.vue';

export default {
  components: {
    LeftMenu,
    SlideNav,
  },
  data() {
    return {
      key: new Date().getTime(), // 重新渲染页面
    };
  },
  watch: {
    $route() {
      this.key = new Date().getTime(); // 路由改变，改变key值，重新渲染页面
    },
  },
  methods: {

  },
};
</script>
<style lang="less">
@import url("~@/assets/css/home.less");
</style>
