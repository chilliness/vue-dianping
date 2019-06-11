<template>
  <div class="item3-wrap">
    <ul class="list-box">
      <li class="item-box" v-for="(item, index) in list" :key="index" @click="$router.push({name: 'detail', params: {id: item.id}})">
        <div class="check-box" @click.stop>
          <div class="btn-check" :class="{on: item.checked}" @click="handleToggleChecked(item)"></div>
        </div>
        <div class="img-box">
          <img class="img" :src="item.imgUrl" :alt="item.name">
        </div>
        <div class="intr-box">
          <h2 class="goods-name">{{item.name}}</h2>
          <div class="star-box">
            <Star :score="item.star"></Star>
          </div>
          <div class="price">{{'￥' + item.price + '/份'}}</div>
          <div class="btn-box">
            <span class="btn btn-sub" @click.stop="handleToggleNum({goods: item, type: 'sub'})">
              <i class="iconfont icon-sub"></i>
            </span>
            <span class="num">{{item.cartNum}}</span>
            <span class="btn btn-add" @click.stop="handleToggleNum({goods: item, type: 'add'})">
              <i class="iconfont icon-add"></i>
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Star from '@/components/star';

export default {
  name: 'Item3',
  components: { Star },
  props: {
    list: {
      type: Array,
      dafault() {
        return [];
      }
    }
  },
  methods: {
    handleToggleNum(obj) {
      if (obj.type === 'sub' && obj.goods.cartNum < 2) {
        return this.$confirm({
          msg: '你确定要删除该商品吗？',
          confirm: () => this.$store.commit('$handleCart', obj)
        });
      }
      this.$store.commit('$handleCart', obj);
    },
    handleToggleChecked(goods) {
      this.$store.commit('$handleToggleChecked', {
        goods,
        // +的作用是隐式类型转换
        checked: +!goods.checked
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.item3-wrap {
  .list-box {
    .item-box {
      display: flex;
      padding: 15px 15px 15px 0;
      border-bottom: 1px solid $bdeee;
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
      .img-box {
        width: 116px;
        height: 87px;
        .img {
          width: 100%;
          height: 100%;
        }
      }
      .intr-box {
        flex: 1;
        padding-left: 15px;
        font-size: 14px;
        overflow: hidden;
        box-sizing: border-box;
        .goods-name {
          font-size: 14px;
          color: $fs333;
        }
        .star-box {
          margin-top: 8px;
        }
        .price {
          margin-top: 8px;
          color: $fs999;
        }
        .btn-box {
          @include frow(flex-end);
          .btn {
            @include frow();
            width: 25px;
            height: 25px;
            .iconfont {
              color: $fs999;
              font-size: 24px;
            }
          }
        }
        .num {
          @include frow(center, stretch);
          width: 40px;
        }
      }
    }
  }
}
</style>
