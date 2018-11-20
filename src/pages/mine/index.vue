<template>
  <div class="mine-wrap">
    <Header title="个人中心"></Header>
    <scroll class="bottom" :data="['vue']">
      <div class="user-box">
        <div class="avatar-box">
          <img class="avatar" :src="_user.avatar" alt="头像">
        </div>
        <div class="name">{{_user.name}}</div>
        <div class="btn-logout" @click="handlerLogout">退出</div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Header from '@/components/header';

export default {
  name: 'Mine',
  computed: {
    _user() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    handlerLogout() {
      this.$confirm({
        msg: '你确定要退出登录吗？',
        confirm: () => {
          // 为了避免因为路由守卫执行导致路由不跳转，加延迟以解决此bug
          this.$nextTick(() => {
            this.$store.commit('$handlerLogin', { isLogin: 0, userInfo: {} });
            this.$router.push({ name: 'home' });
          });
        }
      });
    }
  },
  components: { Header }
};
</script>

<style lang="scss" scoped>
.mine-wrap {
  .bottom {
    bottom: 50px;
  }
  .user-box {
    @include fcol(flex-start);
    padding: 30px 0 20px;
    font-size: 14px;
    color: $fs999;
    .avatar-box {
      width: 60px;
      height: 60px;
      padding: 5px;
      border: 1px solid $bdeee;
      border-radius: 50%;
      .avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .name {
      @include frow(center, stretch);
      width: 100%;
      margin-top: 10px;
      color: $fs333;
    }
    .btn-logout {
      @include frow();
      width: 120px;
      height: 42px;
      margin-top: 20px;
      color: $fswhite;
      border-radius: 50px;
      background: $bgf33;
    }
  }
}
</style>
