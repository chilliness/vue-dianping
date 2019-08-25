<template>
  <div class="nav-wrap">
    <router-link class="nav-box" activeClass="active" :to="item.url" @click.native="handleLink(item)" v-for="(item, index) in nav" :key="index">
      <div class="item-box">
        <i class="num" v-if="item.url === '/cart' && _num > 0">{{_num}}</i>
        <i :class="['iconfont', item.icon]"></i>
        <span class="text">{{item.text}}</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {
      nav: [
        { url: '/home', text: '首页', icon: 'icon-home' },
        { url: '/cart', text: '购物车', icon: 'icon-cart' },
        { url: '/mine', text: '我的', icon: 'icon-mine' }
      ]
    };
  },
  computed: {
    _num() {
      return this.$store.state.cartList.reduce(
        (sum, item) => sum + item.cartNum,
        0
      );
    }
  },
  methods: {
    handleLink({ url }) {
      if (url === '/cart') {
        this.$store.commit('$handleToggleChecked', { checked: 1 });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  @include frow(space-between);
  height: 50px;
  font-size: 12px;
  color: $fs333;
  background: $bgwhite;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    border-top: 1px solid $bdeee;
  }
  .nav-box {
    @include frow();
    flex: 1;
    height: 100%;
    &.active {
      color: $fsf33;
    }
    .item-box {
      position: relative;
      @include fcol();
      width: 50px;
      height: 100%;
      .num {
        position: absolute;
        top: 5px;
        right: 8px;
        padding: 2px 5px;
        font-size: 12px;
        color: $fswhite;
        border-radius: 50%;
        transform: scale(0.8);
        transform-origin: right center;
        background: $bgf33;
      }
      .iconfont {
        $size: 24px;
        width: $size;
        height: $size;
        font-size: $size;
      }
      .text {
        margin-top: 5px;
      }
    }
  }
}
</style>
