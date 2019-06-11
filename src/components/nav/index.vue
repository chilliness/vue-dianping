<template>
  <div class="nav-wrap">
    <div class="nav-box" :class="{active: item.name === $route.name}" v-for="(item, index) in nav" :key="index" @click="handleLink(item.name)">
      <div class="item-box">
        <i class="num" v-if="item.name === 'cart' && _num > 0">{{_num}}</i>
        <i :class="['iconfont', item.icon]"></i>
        <span class="text">{{item.text}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {
      nav: [
        { name: 'home', icon: 'icon-home', text: '首页' },
        { name: 'cart', icon: 'icon-cart', text: '购物车' },
        { name: 'mine', icon: 'icon-mine', text: '我的' }
      ]
    };
  },
  computed: {
    _num() {
      return this.$store.state.cartList.reduce(
        (sum, current) => sum + current.cartNum,
        0
      );
    }
  },
  methods: {
    handleLink(name) {
      if (name === 'cart') {
        this.$store.commit('$handleToggleChecked', { checked: 1 });
      }
      this.$router.push({ name });
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
