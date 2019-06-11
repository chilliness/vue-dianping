<template>
  <div class="notFound-wrap">
    <Header title="404"></Header>
    <div class="box"></div>
  </div>
</template>

<script>
import Header from '@/components/header';

export default {
  name: 'NotFound',
  components: { Header }
};
</script>

<style lang="scss" scoped>
.notFound-wrap {
  @include fcol(flex-start, stretch);
  height: 100vh;
  .box {
    flex: 1;
    background: url(./img/bg.jpg) no-repeat center;
    background-size: contain;
  }
}
</style>
