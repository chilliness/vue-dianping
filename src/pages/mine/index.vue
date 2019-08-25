<template>
  <div class="mine-wrap">
    <Header title="个人中心"></Header>
    <scroll isBottom :data="[_user]">
      <div class="user-box">
        <div class="avatar-box">
          <img class="avatar" :src="_user.avatar" alt="头像" />
        </div>
        <div class="name">{{_user.name}}</div>
        <div class="btn-logout" @click="handleLogout">退出</div>
      </div>
    </scroll>
  </div>
</template>

<script>
export default {
  name: 'Mine',
  computed: {
    _user() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    handleLogout() {
      this.$confirm({
        msg: '你确定要退出登录吗？',
        confirm: () => {
          this.$store.commit('$handleLogin', { isLogin: 0, userInfo: {} });
          this.$router.push({ name: 'home' });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.mine-wrap {
  height: 100vh;
  font-size: 14px;
  color: $fs333;
  .user-box {
    @include fcol(flex-start);
    padding: 30px 0 20px;
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
      @include frow();
      margin-top: 10px;
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
