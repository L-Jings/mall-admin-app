<template>
  <div class="home">
    <left-menu />
    <div :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed }">
      <slide-nav />
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

    };
  },
  methods: {

  },
};
</script>
<style lang="less">
@import url("~@/assets/css/home.less");
</style>
