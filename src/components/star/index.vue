<template>
  <div class="star-wrap">
    <i class="iconfont icon-star" :class="{active: item <= score}" v-for="item in 5" :key="item"></i>
  </div>
</template>

<script>
export default {
  name: 'Star',
  props: {
    score: Number,
    default: 0
  }
};
</script>

<style lang="scss" scoped>
.star-wrap {
  @include frow(flex-start);
  .icon-star {
    font-size: 18px;
    color: $fs999;
    &.active {
      color: $fsf33;
    }
  }
}
</style>
