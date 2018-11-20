<template>
  <div class="login-wrap">
    <Header title="登录"></Header>
    <Scroll :data="['vue']" v-if="!isAjax">
      <div class="form-box" :class="{shake: isError}">
        <div class="avatar-box">
          <img class="avatar" :src="user.avatar" alt="头像">
        </div>
        <div class="name">{{user.name}}</div>
        <div class="input-box">
          <i class="iconfont icon-username"></i>
          <input class="input" type="text" v-model.trim="form.username" placeholder="请输入用户名">
        </div>
        <div class="input-box">
          <i class="iconfont icon-password"></i>
          <input class="input" type="password" v-model.trim="form.password" placeholder="请输入密码">
        </div>
        <div class="btn-login" @click="handlerLogin">登录</div>
      </div>
    </Scroll>
    <template v-else>
      <div class="tips">正在生成虚拟登录信息，请稍候</div>
      <Loading></Loading>
    </template>
  </div>
</template>

<script>
import Header from '@/components/header';
import Loading from '@/components/loading';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      user: {
        avatar:
          'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
        name: '游客'
      },
      isAjax: false,
      isError: false
    };
  },
  mounted() {
    this.handlerFetchData();
  },
  methods: {
    async handlerFetchData() {
      try {
        if (this.isAjax) {
          return;
        }

        this.isAjax = true;
        let res = await this.$http.get(this.$api.user);
        this.isAjax = false;
        if (res.name) {
          this.user = { avatar: res.photo, name: res.name };
          this.form = { username: res.surname, password: res.password };
        } else {
          this.$toast({ msg: '程序员罢工，信息生成失败' });
        }
      } catch (e) {
        this.isAjax = false;
        this.$toast({ msg: '网络开小差，请重试' });
      }
    },
    handlerLogin() {
      if (!this.form.username || !this.form.password) {
        this.isError = true;
        return this.$toast({
          msg: '用户名或密码不能为空',
          callback: () => (this.isError = false)
        });
      }
      this.$store.commit('$handlerLogin', { isLogin: 1, userInfo: this.user });
      this.$router.replace({ path: this.$route.query.redirect || '/' });
    }
  },
  components: { Header, Loading }
};
</script>

<style lang="scss" scoped>
.login-wrap {
  .form-box {
    @include fcol(flex-start);
    padding: 30px 0 20px;
    font-size: 14px;
    color: $fs999;
    &.shake {
      animation: ani-shake 0.5s;
    }
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
    .input-box {
      @include frow(flex-start);
      width: 220px;
      height: 40px;
      margin-top: 20px;
      border: 1px solid $bdeee;
      border-radius: 50px;
      overflow: hidden;
      .iconfont {
        margin-left: 10px;
        font-size: 18px;
        color: $fs999;
      }
      .input {
        @include frow(flex-start);
        flex: 1;
        height: 100%;
        padding: 0 10px;
        overflow: hidden;
      }
    }
    .btn-login {
      @include frow();
      width: 220px;
      height: 42px;
      margin-top: 20px;
      color: $fswhite;
      border-radius: 50px;
      background: $bgf33;
    }
  }
  .tips {
    @include fcol(flex-start);
    padding: 80px 0 20px;
    font-size: 14px;
    color: $fs333;
  }
}
@keyframes ani-shake {
  0%,
  40%,
  80% {
    transform: translate3d(-10px, 0, 0);
  }
  20%,
  60%,
  100% {
    transform: translate3d(10px, 0, 0);
  }
}
</style>
