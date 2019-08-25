<template>
  <div class="cart-wrap">
    <Header title="购物车" :btn="_btn" @handleClick="isEdit = !isEdit"></Header>
    <!-- 主体内容 -->
    <template v-if="_list.length">
      <Scroll isBottom :data="_list">
        <Item :list="_list" isCart></Item>
      </Scroll>
      <div class="balance-box" v-if="_list.length">
        <div class="left" @click="$store.commit('$handleToggleChecked', {checked: +!_allChecked})">
          <div class="check-box">
            <div class="btn-check" :class="{on: _allChecked}"></div>
          </div>
          <div class="text">全选</div>
        </div>
        <div class="total" v-if="!isEdit">{{'合计: ￥' + _totalMoney}}</div>
        <div class="btn-handle" :class="{enable: _totalMoney > 0}" @click="handleClick">{{isEdit ? '删除' : '去结算'}}</div>
      </div>
    </template>
    <div class="nothing-box" v-else>快去选购你喜欢的商品吧</div>
  </div>
</template>

<script>
import { Item } from '@/components';

export default {
  name: 'Cart',
  components: { Item },
  data() {
    return { isEdit: false };
  },
  computed: {
    _btn() {
      if (!this.$store.state.cartList.length) {
        return '';
      }
      return this.isEdit ? '完成' : '编辑';
    },
    _list() {
      return this.$store.state.cartList;
    },
    _allChecked() {
      return !this.$store.state.cartList.find(item => !item.checked);
    },
    _totalMoney() {
      let total = 0;
      this.$store.state.cartList.map(item => {
        if (item.checked) {
          total += item.cartNum * item.price;
        }
      });
      return total.toFixed(2);
    }
  },
  methods: {
    handleClick() {
      if (this._totalMoney > 0) {
        if (this.isEdit) {
          return this.$confirm({
            msg: '你确定要删除选中项？',
            confirm: () => this.$store.commit('$handleDelCart')
          });
        }
        this.$router.push({ name: 'payment', params: { from: 'cart' } });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.cart-wrap {
  height: 100vh;
  font-size: 14px;
  color: $fs333;
  .balance-box {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50px;
    @include frow(space-between);
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      border-top: 1px solid $bdeee;
    }
    .left {
      @include frow(flex-start);
      height: 100%;
      .check-box {
        @include frow();
        width: 50px;
        .btn-check {
          position: relative;
          width: 25px;
          height: 25px;
          border: 1px solid $bdeee;
          border-radius: 50%;
          &:after {
            content: '';
            position: absolute;
            left: 3px;
            top: 3px;
            right: 3px;
            bottom: 3px;
            border-radius: 50%;
            transform: scale(0);
            transition: 0.3s;
            background: $bgf33;
          }
          &.on:after {
            transform: scale(1);
          }
        }
      }
    }
    .btn-handle {
      @include frow();
      width: 100px;
      height: 100%;
      color: $fswhite;
      background: $bgeee;
      &.enable {
        background: $bgf33;
      }
    }
  }
  .nothing-box {
    @include frow();
    height: 100px;
  }
}
</style>
