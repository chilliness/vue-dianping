<template>
  <div class="confirm-wrap" v-if="msg">
    <div class="box">
      <div class="title">{{title}}</div>
      <div class="text">{{msg}}</div>
      <div class="btn-box">
        <div class="btn-cancel" @click="handleClose('cancel')">{{cancelText}}</div>
        <div class="btn-confirm" @click="handleClose('confirm')">{{confirmText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Confirm'
};
</script>

<style lang="scss" scoped>
.confirm-wrap {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  @include frow();
  .box {
    width: 240px;
    background: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    color: $fswhite;
    border-radius: 5px;
    .title {
      position: relative;
      @include frow();
      height: 40px;
      font-size: 16px;
      &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        border-bottom: 1px solid $bdwhite;
      }
    }
    .text {
      @include frow();
      min-height: 40px;
      line-height: 1.5;
      text-align: center;
      padding: 10px 15px;
    }
    .btn-box {
      position: relative;
      @include frow(flex-start);
      height: 40px;
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        border-top: 1px solid $bdwhite;
      }
      &:after {
        content: '';
        position: absolute;
        left: 50%;
        top: 0;
        bottom: 0;
        border-left: 1px solid $bdwhite;
      }
    }
    .btn-cancel,
    .btn-confirm {
      @include frow();
      flex: 1;
      height: 100%;
    }
  }
}
</style>
