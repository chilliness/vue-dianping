<template>
  <div class="toast-wrap" v-if="isShow">
    <div class="text">{{msg}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast'
};
</script>

<style lang="scss" scoped>
.toast-wrap {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  @include frow();
  .text {
    max-width: 200px;
    line-height: 1.5;
    text-align: center;
    padding: 10px 15px;
    font-size: 14px;
    color: $fswhite;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>
