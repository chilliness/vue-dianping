<template>
  <div class="payment-wrap">
    <Header title="支付页面"></Header>
    <scroll :class="{bottom: isShow}" :date="['vue']" @click.native="isShow = !isShow">
      <div class="password-box">
        <div class="list-box">
          <div class="item-box" v-for="(item, index) in password" :key="index">●</div>
        </div>
        <div class="tips">{{'默认支付密码为' + text}}</div>
      </div>
    </scroll>
    <div class="keyboard-box" v-if="isShow" @click.stop>
      <div class="item-box" :class="{disabled: item === ''}" v-for="(item, index) in _keyboard" :key="index" @click="handlerInput(item)">{{item}}</div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header';

export default {
  name: 'Payment',
  data() {
    return {
      password: [],
      text: '8888',
      isShow: true,
      isSort: true
    };
  },
  computed: {
    _keyboard() {
      if (this.isSort) {
        let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].sort(
          () => Math.random() - 0.5
        );
        let arr2 = ['', arr.pop(), '删除'];
        return arr.concat(arr2);
      }
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '删除'];
    }
  },
  methods: {
    handlerInput(item) {
      if (!['', '删除'].includes(item) && this.password.length < 4) {
        return this.password.push(item);
      }
      if (item === '删除') {
        this.password.pop();
      }
    }
  },
  watch: {
    password: {
      handler(val) {
        if (val.length === 4) {
          if (val.join('') === this.text) {
            this.isShow = false;
            this.$toast({
              msg: '密码正确，正在为你生成订单',
              callback: () => this.$router.push({ name: 'home' })
            });
          } else {
            this.$toast({ msg: '密码错误' });
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  components: { Header }
};
</script>

<style lang="scss" scoped>
.payment-wrap {
  font-size: 14px;
  color: $fs333;
  .bottom {
    bottom: 184px;
  }
  .password-box {
    padding-top: 100px;
    .list-box {
      position: relative;
      @include frow(flex-start);
      width: 160px;
      height: 40px;
      margin: 0 auto;
      font-size: 20px;
      border: 1px solid $bdeee;
      &:before {
        content: '';
        position: absolute;
        left: 39px;
        top: 0;
        bottom: 0;
        width: 40px;
        border-left: 1px solid $bdeee;
        border-right: 1px solid $bdeee;
      }
      &:after {
        content: '';
        position: absolute;
        right: 39px;
        top: 0;
        bottom: 0;
        width: 40px;
        border-right: 1px solid $bdeee;
      }
      .item-box {
        @include frow();
        width: 40px;
        height: 100%;
      }
    }
    .tips {
      text-align: center;
      padding: 15px;
    }
  }
  .keyboard-box {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-wrap: wrap;
    background: $bgwhite;
    &:before {
      content: '安全键盘';
      @include frow();
      width: 100%;
      height: 24px;
      border-top: 1px solid $bdeee;
      box-sizing: border-box;
    }
    .item-box {
      @include frow();
      width: 33.3%;
      height: 40px;
      border-top: 1px solid $bdeee;
      border-right: 1px solid $bdeee;
      box-sizing: border-box;
      &:nth-of-type(3n) {
        border-right: 0 none;
      }
      &:active,
      &.disabled {
        background: $bdeee;
      }
    }
  }
}
</style>
