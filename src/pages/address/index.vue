<template>
  <div class="address-wrap">
    <Header title="选择城市"></Header>
    <Scroll :data="address">
      <div class="now-address">{{_nowAddress}}</div>
      <div class="hot-address">
        <h2 class="title">热门城市</h2>
        <ul class="list-box">
          <li class="item-box" v-for="(item, index) in address" :key="index">
            <span class="text" :class="{active: _nowAddress === item}" @click="$store.commit('$handleAddress', item)">{{item}}</span>
          </li>
        </ul>
      </div>
    </Scroll>
  </div>
</template>

<script>
export default {
  name: 'Address',
  data() {
    return {
      address: ['北京', '上海', '广州', '深圳', '武汉', '西安']
    };
  },
  computed: {
    _nowAddress() {
      return this.$store.state.nowAddress;
    }
  }
};
</script>

<style lang="scss" scoped>
.address-wrap {
  height: 100vh;
  color: $fs333;
  font-size: 14px;
  .now-address {
    @include frow();
    height: 100px;
    font-size: 30px;
  }
  .hot-address {
    padding: 15px 30px;
    border-top: 1px solid $bdeee;
    .title {
      font-size: 14px;
      font-weight: bold;
    }
    .list-box {
      @include frow(space-between, stretch);
      flex-wrap: wrap;
      margin: 0 -10px;
      .item-box {
        width: 33.3%;
        margin-top: 15px;
        padding: 0 10px;
        box-sizing: border-box;
        .text {
          @include frow();
          height: 35px;
          border: 1px solid $bdeee;
          &.active {
            background: $bgeee;
          }
        }
      }
    }
  }
}
</style>
