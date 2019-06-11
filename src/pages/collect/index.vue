<template>
  <div class="collect-wrap">
    <Header title="收藏列表"></Header>
    <Scroll :data="_list" v-if="_list.length">
      <Item2 :list="_list" isShowDel></Item2>
    </Scroll>
    <div class="nothing-box" v-else>快去收藏你喜欢的商品吧</div>
  </div>
</template>

<script>
import Header from '@/components/header';
import Item2 from '@/components/item2';

export default {
  name: 'Collect',
  components: { Header, Item2 },
  computed: {
    _list() {
      return this.$store.state.collectList;
    }
  }
};
</script>

<style lang="scss" scoped>
.collect-wrap {
  height: 100vh;
  font-size: 14px;
  color: $fs333;
  .nothing-box {
    @include frow();
    height: 100px;
  }
}
</style>
