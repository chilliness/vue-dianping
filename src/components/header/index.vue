<template>
  <div class="header-wrap">
    <span class="btn btn-back" @click="$router.back()">
      <i class="iconfont icon-left-arrow"></i>
    </span>
    <span class="text">{{title}}</span>
    <span class="btn btn-handle" v-if="btn" @click="handleClick">{{btn}}</span>
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
    handleClick() {
      this.$emit('emitClick');
    }
  }
};
</script>

<style lang="scss" scoped>
.header-wrap {
  position: relative;
  @include frow();
  height: 50px;
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
  .btn-handle {
    right: 0;
    padding: 0 15px;
  }
  .text {
    font-weight: bold;
  }
}
</style>
