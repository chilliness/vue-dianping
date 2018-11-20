<template>
  <div class="header-wrap">
    <span class="btn btn-back" @click="$router.back()">
      <i class="iconfont icon-left-arrow" />
    </span>
    <span class="text">{{title}}</span>
    <span class="btn btn-handler" v-if="btn" @click="handlerClick">{{btn}}</span>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      default: ''
    },
    btn: {
      type: String,
      default: ''
    }
  },
  methods: {
    handlerClick() {
      this.$emit('handlerClick');
    }
  }
};
</script>

<style lang="scss" scoped>
.header-wrap {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  height: 50px;
  @include frow();
  font-size: 16px;
  color: $fswhite;
  background: $bgf33;
  .btn {
    position: absolute;
    top: 0;
    bottom: 0;
    @include frow();
  }
  .btn-back {
    left: 0;
    width: 55px;
    .iconfont {
      font-size: 20px;
    }
  }
  .btn-handler {
    right: 0;
    padding: 0 15px;
  }
  .text {
    font-weight: bold;
  }
}
</style>
