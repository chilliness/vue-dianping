<template>
  <div class="loading-wrap" :class="{default: isHasClass}">
    <i class="item"></i>
    <i class="item"></i>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    isHasClass: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped>
.loading-wrap {
  &.default {
    @include frow();
    height: 50px;
  }
  .item {
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: $bgf33;
    &:first-child {
      animation: anim-first 1.2s linear infinite;
    }
    &:last-child {
      animation: anim-last 1.2s linear infinite;
    }
  }
}
@keyframes anim-first {
  0%,
  100% {
    transform: translate3d(-100%, 0, 0);
  }
  50% {
    transform: translate3d(100%, 0, 0);
  }
}
@keyframes anim-last {
  0%,
  100% {
    transform: translate3d(100%, 0, 0);
  }
  50% {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>
