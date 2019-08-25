<template>
  <div class="collect-wrap">
    <Header title="收藏列表"></Header>
    <Scroll :data="_list" v-if="_list.length">
      <Item :list="_list" isShowDel></Item>
    </Scroll>
    <div class="nothing-box" v-else>快去收藏你喜欢的商品吧</div>
  </div>
</template>

<script>
import { Item } from '@/components';

export default {
  name: 'Collect',
  components: { Item },
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
