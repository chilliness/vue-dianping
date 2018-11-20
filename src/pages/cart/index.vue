<template>
  <div class="cart-wrap">
    <Header title="购物车" :btn="_btn" @handlerClick="isEdit = !isEdit"></Header>
    <!-- 主体内容 -->
    <template v-if="_list.length">
      <Scroll class="scroll" :data="_list">
        <Item3 :list="_list"></Item3>
      </Scroll>
      <div class="balance-box" v-if="_list.length">
        <div class="left" @click="$store.commit('$handlerToggleChecked', {checked: +!_allChecked})">
          <div class="check-box">
            <div class="btn-check" :class="{on: _allChecked}"></div>
          </div>
          <div class="text">全选</div>
        </div>
        <div class="total" v-if="!isEdit">{{'合计: ￥' + _totalMoney}}</div>
        <div class="btn-handler" :class="{enable: _totalMoney > 0}" @click="handlerClick">{{isEdit ? '删除' : '去结算'}}</div>
      </div>
    </template>
    <div class="tips" v-else>快去选购你喜欢的商品吧</div>
  </div>
</template>

<script>
import Header from '@/components/header';
import Item3 from '@/components/item3';

export default {
  name: 'Cart',
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
    handlerClick() {
      if (this._totalMoney > 0) {
        if (this.isEdit) {
          return this.$confirm({
            msg: '你确定要删除选中项？',
            confirm: () => this.$store.commit('$handlerDelCart')
          });
        }
        this.$store.commit('$handlerDelCart');
        this.$router.push({ name: 'payment' });
      }
    }
  },
  components: { Header, Item3 }
};
</script>

<style lang="scss" scoped>
.cart-wrap {
  .scroll {
    bottom: 50px;
  }
  .tips {
    @include frow();
    height: 100px;
    margin-top: 50px;
    font-size: 14px;
    color: $fs333;
  }
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
    .btn-handler {
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
}
</style>
