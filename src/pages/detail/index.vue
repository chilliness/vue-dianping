<template>
  <div class="detail-wrap">
    <Header title="商品详情"></Header>
    <template v-if="isAjax">
      <div class="tips">加载中...</div>
      <Loading></Loading>
    </template>
    <!-- 主体内容 -->
    <template v-else>
      <Scroll class="scroll" :data="[goods]">
        <div class="goods-box">
          <div class="img-box">
            <img class="img" :src="goods.imgUrl" :alt="goods.name">
          </div>
          <div class="intr-box">
            <h2 class="name">{{goods.name}}</h2>
            <div class="other-box">
              <Star :score="goods.star"></Star>
              <span class="text">{{goods.comments.length + '条'}}</span>
              <span class="text">{{'￥'+ goods.price + '/份'}}</span>
            </div>
            <div class="store-name">{{goods.store.name}}</div>
            <div class="score-box">
              <span class="text">{{'口味:' + goods.store.taste}}</span>
              <span class="text">{{'环境:' + goods.store.environment}}</span>
              <span class="text">{{'服务:' + goods.store.service}}</span>
            </div>
          </div>
        </div>
        <!-- 店铺信息 -->
        <ul class="store-box">
          <li class="item-box">
            <i class="iconfont icon-gps"></i>
            <span class="text">{{goods.store.address}}</span>
          </li>
          <li class="item-box">
            <i class="iconfont icon-time" />
            <span class="text">{{'营业时间' + goods.store.businessHours}}</span>
          </li>
          <li class="item-box">
            <i class="iconfont icon-tel" />
            <span class="text">{{goods.store.tel}}</span>
          </li>
        </ul>
        <!-- 商品评论 -->
        <ul class="comments-list">
          <li class="title-box" v-if="goods.comments.length">
            <span class="title">{{'网友点评'+ goods.comments.length +'条'}}</span>
            <span class="btn-view">
              <span>查看全部</span>
              <i class="iconfont icon-right-arrow"></i>
            </span>
          </li>
          <li class="no-comments" v-else>此商品暂无评论</li>
          <li class="item-box" v-for="(item, index) in goods.comments.slice(0, 3)" :key="index">
            <div class="avatar-box">
              <img class="avatar" :src="item.avatar" :alt="item.name">
            </div>
            <div class="content-box">
              <div class="username">{{item.name}}</div>
              <div class="star-box">
                <Star :score="item.star"></Star>
              </div>
              <p class="text">{{item.text}}</p>
              <div class="pic-bar" v-if="item.pics.length" ref="xScroll">
                <ul class="pic-list">
                  <li class="pic-box" v-for="(_item, _index) in item.pics" :key="_index">
                    <img class="pic" :src="_item" alt="">
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </Scroll>
      <!-- 底部操作 -->
      <div class="handler-bar">
        <div class="btn btn-star" :class="{active: _isCollect}" @click="handlerToggleCollect">{{_isCollect ? '取消收藏' : '加入收藏'}}</div>
        <div class="btn btn-cart" @click="handlerCart(false)">加入购物车</div>
        <div class="btn btn-buy" @click="handlerCart(true)">立即购买</div>
      </div>
    </template>
  </div>
</template>

<script>
import Header from '@/components/header';
import Star from '@/components/star';
import Loading from '@/components/loading';

export default {
  name: 'Detail',
  data() {
    return {
      id: 0,
      goods: {
        store: {},
        comments: []
      },
      isAjax: false
    };
  },
  computed: {
    _isCollect() {
      if (this.$store.state.isLogin === 0) {
        return false;
      }
      return !!this.$store.state.collectList.find(item => item.id === this.id);
    }
  },
  methods: {
    async handlerFetchData() {
      if (this.isAjax) {
        return;
      }

      try {
        this.isAjax = true;
        let res = await this.$http.get(`${this.$api.list}?id=${this.id}`);
        this.isAjax = false;
        if (res.code === 200) {
          this.goods = res.data.find(item => item.id === this.id);
          // 延迟以确保dom渲染完毕
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            clearTimeout(this.timer);
            for (let i = 0; i < this.$refs.xScroll.length; i++) {
              // eslint-disable-next-line
              new this.$BScroll(this.$refs.xScroll[i], {
                scrollX: true,
                scrollY: false
              });
            }
          }, 3e2);
        } else {
          this.$toast({ msg: res.msg });
        }
      } catch (e) {
        this.isAjax = false;
        this.$toast({ msg: '网络开小差，请重试' });
      }
    },
    handlerCart(isNowBuy) {
      if (isNowBuy) {
        this.$router.push({ name: 'payment' });
      } else {
        this.$store.commit('$handlerCart', { goods: this.goods });
        this.$store.commit('$handlerToggleChecked', { checked: 1 });
        this.$toast({ msg: '加入购物车成功', duration: 5e2 });
      }
    },
    handlerToggleCollect() {
      if (this.$store.state.isLogin === 0) {
        return this.$router.replace({
          name: 'login',
          query: { redirect: this.$route.path }
        });
      }
      this.$store.commit('$handlerCollect', this.goods);
    }
  },
  watch: {
    $route: {
      handler(val) {
        Object.assign(this.$data, this.$options.data());
        // +的作用是隐式类型转换
        this.id = +val.params.id;
        if (this.id > 5 || this.id < 1) {
          return this.$router.replace({ name: 'home' });
        }
        this.handlerFetchData();
      },
      immediate: true,
      deep: true
    }
  },
  components: { Header, Star, Loading }
};
</script>

<style lang="scss" scoped>
.detail-wrap {
  .tips {
    @include frow();
    height: 100px;
    padding-top: 50px;
    font-size: 14px;
    color: $fs333;
  }
  .scroll {
    bottom: 50px;
    .goods-box {
      display: flex;
      padding: 15px;
      box-sizing: border-box;
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
        font-size: 12px;
        color: $fs999;
        .name {
          font-size: 14px;
          color: $fs333;
        }
        .other-box,
        .store-name,
        .score-box {
          @include frow(flex-start);
          margin-top: 10px;
          .text {
            margin-left: 15px;
          }
        }
        .score-box {
          .text {
            margin: 0 5px 0 0;
          }
        }
      }
    }
    .store-box {
      .item-box {
        @include frow(flex-start);
        height: 35px;
        margin: 0 15px;
        color: $fs333;
        border-top: 1px solid $bdeee;
        .iconfont {
          color: $fs666;
        }
        .text {
          font-size: 12px;
          margin-left: 10px;
        }
      }
    }
    .comments-list {
      font-size: 12px;
      .title-box,
      .no-comments {
        @include frow(space-between);
        height: 40px;
        padding: 0 15px;
        font-size: 14px;
        color: $fs333;
        background: $bgeee;
      }
      .no-comments {
        justify-content: center;
      }
      .item-box {
        display: flex;
        margin: 0 15px;
        padding: 15px 0;
        &:nth-of-type(n + 3) {
          border-top: 1px solid $bdeee;
        }
        .avatar-box {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          .avatar {
            width: 100%;
            height: 100%;
          }
        }
        .content-box {
          flex: 1;
          padding-left: 15px;
          overflow: hidden;
          .username {
            font-size: 14px;
          }
          .star-box,
          .text,
          .pic-bar {
            margin-top: 10px;
          }
          .text {
            line-height: 1.5;
          }
          .pic-bar {
            overflow: hidden;
            .pic-list {
              display: inline-table;
              white-space: nowrap;
              .pic-box {
                display: inline-table;
                width: 80px;
                height: 80px;
                &:nth-of-type(n + 2) {
                  margin-left: 15px;
                }
                .pic {
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
  .handler-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    height: 50px;
    font-size: 14px;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      border-top: 1px solid $bdeee;
    }
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      height: 100%;
      &.active {
        color: $fswhite;
        background: $bgf33;
      }
      &:nth-of-type(n + 2) {
        border-left: 1px solid $bdeee;
      }
    }
    .btn-cart {
      color: $bgwhite;
      background: $bgff3;
    }
    .btn-buy {
      color: $bgwhite;
      background: $bgf33;
    }
  }
}
</style>
