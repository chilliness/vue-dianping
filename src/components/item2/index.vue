<template>
  <div class="item2-wrap">
    <ul class="list-box">
      <li class="item-box" v-for="(item, index) in list" :key="index" @click="$router.push({name: 'detail', params: {id: item.id}})">
        <div class="img-box">
          <img class="img" :src="item.imgUrl" :alt="item.name">
        </div>
        <div class="intr-box">
          <div class="btn-del" v-if="isShowDel" @click.stop="handleDel(item)">删除</div>
          <h2 class="goods-name">{{item.name}}</h2>
          <div class="other-box">
            <Star :score="item.star"></Star>
            <span class="text">{{'￥' + item.price + '/份'}}</span>
          </div>
          <div class="store-name">{{item.store.name}}</div>
          <ul class="promotion-list">
            <li class="_item-box" v-for="(_item, _index) in item.promotion" :key="_index">
              <i class="iconfont icon-boon" v-if="_item.type === 1"></i>
              <span class="text">{{_item.text}}</span>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Star from '@/components/star';

export default {
  name: 'Item2',
  components: { Star },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    isShowDel: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleDel(goods) {
      this.$confirm({
        msg: '你确定要删除该商品吗？',
        confirm: () => this.$store.commit('$handleCollect', goods)
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.item2-wrap {
  .list-box {
    .item-box {
      display: flex;
      padding: 15px;
      border-bottom: 1px solid $bdeee;
      .img-box {
        width: 116px;
        height: 87px;
        .img {
          width: 100%;
          height: 100%;
        }
      }
      .intr-box {
        position: relative;
        flex: 1;
        padding-left: 15px;
        font-size: 12px;
        overflow: hidden;
        box-sizing: border-box;
        .btn-del {
          position: absolute;
          right: 0;
          top: 0;
          padding: 5px 15px;
          color: $fswhite;
          border-radius: 5px;
          background: $bgf33;
        }
        .goods-name {
          font-size: 14px;
          color: $fs333;
        }
        .other-box {
          @include frow(flex-start);
          margin-top: 5px;
          .text {
            margin-left: 5px;
          }
        }
        .store-name {
          margin-top: 5px;
          color: $fs999;
        }
        .promotion-list {
          margin-top: 5px;
          ._item-box {
            @include frow(flex-start);
            height: 26px;
            color: $fs333;
            border-top: 1px solid $bdeee;
            .iconfont {
              color: $fsf33;
              margin-right: 7px;
            }
          }
        }
      }
    }
  }
}
</style>
