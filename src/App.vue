<template>
  <div id="app">
    <keep-alive :include="['Home']">
      <router-view />
    </keep-alive>
    <Nav v-if="_isShow"></Nav>
  </div>
</template>

<script>
import Nav from '@/components/nav';

export default {
  name: 'App',
  computed: {
    _isShow() {
      let arr = ['home', 'mine'];
      !this.$store.state.cartList.length && arr.push('cart');
      return arr.includes(this.$route.name);
    }
  },
  components: { Nav }
};
</script>

<style></style>
