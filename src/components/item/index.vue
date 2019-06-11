<template>
  <div class="item-wrap">
    <h2 class="title">{{title}}</h2>
    <ul class="list-box">
      <li class="item-box" v-for="(item, index) in list" :key="index" @click="$router.push({name: 'detail', params: {id: item.id}})">
        <div class="img-box">
          <img class="img" :src="item.imgUrl" :alt="item.name">
        </div>
        <div class="intr-box">
          <div class="top-box">
            <h3 class="name">{{item.name}}</h3>
            <div class="distance">{{item.distance}}</div>
          </div>
          <div class="desc">{{item.desc}}</div>
          <div class="bottom-box">
            <div class="price-box">
              <span class="price">{{'￥' + item.price}}</span>
              <span class="old-price" v-if="item.oldPrice">{{'￥' + item.oldPrice}}</span>
            </div>
            <div class="sales">{{'已售' + item.sales}}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    title: {
      type: String,
      default: '猜你喜欢'
    },
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.item-wrap {
  .title {
    @include frow();
    height: 40px;
    font-size: 14px;
    background: $bgeee;
  }
  .list-box {
    padding: 0 15px;
    .item-box {
      @include frow(flex-start);
      padding: 15px 0;
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
        @include fcol(space-between, stretch);
        flex: 1;
        height: 87px;
        padding: 5px 0 5px 15px;
        font-size: 12px;
        overflow: hidden;
        box-sizing: border-box;
        .top-box {
          @include frow(space-between, baseline);
          .name {
            font-size: 14px;
            color: $fs333;
          }
          .distance {
            color: $fs999;
          }
        }
        .desc {
          height: 30px;
          line-height: 1.2;
          text-align: justify;
          color: $fs999;
          overflow: hidden;
        }
        .bottom-box {
          @include frow(space-between, baseline);
          .price-box {
            @include frow(flex-start, baseline);
            .price {
              font-size: 14px;
              font-weight: bold;
              color: $fsf33;
            }
            .old-price {
              margin-left: 8px;
              text-decoration: line-through;
              color: $fs999;
            }
          }
          .sales {
            color: $fs999;
          }
        }
      }
    }
  }
}
</style>
