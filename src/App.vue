<template>
  <div id="app">
    <keep-alive :include="['Home']">
      <router-view></router-view>
    </keep-alive>
    <Nav v-if="_isShow"></Nav>
  </div>
</template>

<script>
import { Nav } from '@/components';

export default {
  name: 'App',
  components: { Nav },
  computed: {
    _isShow() {
      let arr = ['home', 'mine'];
      !this.$store.state.cartList.length && arr.push('cart');
      return arr.includes(this.$route.name);
    }
  },
  watch: {
    $route: {
      handler() {
        document
          .querySelectorAll('.confirm-wrap')
          .forEach(item => document.body.removeChild(item));
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style lang="scss"></style>
