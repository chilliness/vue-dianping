<template>
  <div class="home-wrap">
    <div class="header-bar">
      <span class="text-box" @click="$router.push({name: 'address'})">
        <span>{{nowAddress}}</span>
        <i class="iconfont icon-down-arrow"></i>
      </span>
      <div class="search-box">
        <i class="iconfont icon-search"></i>
        <input class="search" type="text" v-model="form.keyword" placeholder="请输入关键字" @keyup="handleSearch($event)" />
      </div>
      <span class="btn-search" @click="$router.push({name: isLogin ? 'collect' : 'login'})">
        <i :class="['iconfont', isLogin ? 'icon-star' : 'icon-login']"></i>
      </span>
    </div>
    <Scroll isBottom pullUpLoad :data="form.list" :isHasMore="form.page <= form.pageTotal" @emitLoad="handleFetchData" ref="scrollRef">
      <!-- 轮播图 -->
      <Slider>
        <div class="slider-box" v-for="(item, index) in nav.menus" :key="index">
          <div class="item-list">
            <div class="item-box" v-for="(_item, _index) in item" :key="_index">
              <div class="img-box">
                <img class="img" :src="_item.imgUrl" :alt="_item.text" />
              </div>
              <div class="text">{{_item.text}}</div>
            </div>
          </div>
        </div>
      </Slider>
      <!-- 超值特惠 -->
      <div class="boon-box">
        <h2 class="title">超值特惠</h2>
        <div class="list-box">
          <div class="item-box" v-for="(item, index) in nav.boons" :key="index">
            <div class="caption" :style="item.color">{{item.title}}</div>
            <div class="sub-caption">{{item.subTitle}}</div>
            <div class="img-box">
              <img class="img" :src="item.imgUrl" :alt="item.title" />
            </div>
          </div>
        </div>
      </div>
      <!-- 热门商品 -->
      <div class="hot-box">
        <h2 class="title">热门商品</h2>
        <Item :list="form.list" isHome></Item>
      </div>
    </Scroll>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Slider, Item } from '@/components';

export default {
  name: 'Home',
  components: { Slider, Item },
  data() {
    return {
      nav: {
        menus: [
          [
            {
              imgUrl: require('./img/icon01.png'),
              text: '美食'
            },
            {
              imgUrl: require('./img/icon01.png'),
              text: '电影'
            },
            {
              imgUrl: require('./img/icon03.png'),
              text: '酒店'
            },
            {
              imgUrl: require('./img/icon04.png'),
              text: '休闲娱乐'
            },
            {
              imgUrl: require('./img/icon05.png'),
              text: '外卖'
            },
            {
              imgUrl: require('./img/icon06.png'),
              text: '火锅'
            },
            {
              imgUrl: require('./img/icon07.png'),
              text: '丽人'
            },
            {
              imgUrl: require('./img/icon08.png'),
              text: '度假出行'
            },
            {
              imgUrl: require('./img/icon09.png'),
              text: '足疗按摩'
            },
            {
              imgUrl: require('./img/icon10.png'),
              text: '周边游'
            }
          ],
          [
            {
              imgUrl: require('./img/icon11.png'),
              text: '景点'
            },
            {
              imgUrl: require('./img/icon12.png'),
              text: 'KTV'
            },
            {
              imgUrl: require('./img/icon13.png'),
              text: '购物'
            },
            {
              imgUrl: require('./img/icon14.png'),
              text: '生活服务'
            },
            {
              imgUrl: require('./img/icon15.png'),
              text: '运动健身'
            },
            {
              imgUrl: require('./img/icon16.png'),
              text: '美发'
            },
            {
              imgUrl: require('./img/icon17.png'),
              text: '亲子'
            },
            {
              imgUrl: require('./img/icon18.png'),
              text: '小吃快餐'
            },
            {
              imgUrl: require('./img/icon19.png'),
              text: '自助餐'
            },
            {
              imgUrl: require('./img/icon20.png'),
              text: '酒吧'
            }
          ],
          [
            {
              imgUrl: require('./img/icon21.png'),
              text: '日本菜'
            },
            {
              imgUrl: require('./img/icon22.png'),
              text: 'SPA'
            },
            {
              imgUrl: require('./img/icon23.png'),
              text: '结婚'
            },
            {
              imgUrl: require('./img/icon24.png'),
              text: '学习培训'
            },
            {
              imgUrl: require('./img/icon25.png'),
              text: '西餐'
            },
            {
              imgUrl: require('./img/icon26.png'),
              text: '火车机票'
            },
            {
              imgUrl: require('./img/icon27.png'),
              text: '烧烤'
            },
            {
              imgUrl: require('./img/icon28.png'),
              text: '家装'
            },
            {
              imgUrl: require('./img/icon29.png'),
              text: '宠物'
            },
            {
              imgUrl: require('./img/icon30.png'),
              text: '周边游'
            }
          ]
        ],
        boons: [
          {
            title: '暑假5折',
            subTitle: '芒果冰激凌',
            color: { color: '#c6e34b' },
            imgUrl: require('./img/boon/img01.jpg')
          },
          {
            title: '特价出国',
            subTitle: '1元游全国',
            color: { color: '#42d6fe' },
            imgUrl: require('./img/boon/img02.jpg')
          },
          {
            title: '亮亮车',
            subTitle: '洗车9.9元',
            color: { color: '#fc0' },
            imgUrl: require('./img/boon/img06.jpg')
          },
          {
            title: '学钢琴',
            subTitle: '免费学习',
            color: { color: '#8c6266' },
            imgUrl: require('./img/boon/img03.jpg')
          },
          {
            title: '电影',
            subTitle: '天天看大片',
            color: { color: '#fe5e60' },
            imgUrl: require('./img/boon/img04.jpg')
          },
          {
            title: '旅游热卖',
            subTitle: '迪士尼周边',
            color: { color: '#217ecb' },
            imgUrl: require('./img/boon/img05.jpg')
          }
        ]
      },
      form: {
        keyword: '',
        list: [],
        page: 1,
        pageTotal: 1
      },
      isAjax: false,
      isFirst: true
    };
  },
  computed: mapState(['nowAddress', 'isLogin']),
  activated() {
    if (this.isFirst) {
      this.isFirst = false;
      this.handleFetchData();
    }
    // 解决搜索回来页面不能滚动bug
    if (this.$refs.scrollRef) {
      this.$refs.scrollRef.handleRefresh();
    }
  },
  methods: {
    async handleFetchData() {
      if (this.isAjax || this.form.page > this.form.pageTotal) {
        return;
      }

      try {
        this.isAjax = true;
        let res = await this.$http({
          url: `${this.$api.list}?page=${this.form.page}`
        });
        this.isAjax = false;

        if (res.code === 200) {
          this.form.list = [...this.form.list, ...res.data];
          this.form.page++;
          this.form.pageTotal = 5;
        } else {
          this.$toast({ msg: res.msg });
        }
      } catch (e) {
        this.isAjax = false;
        this.$toast({ msg: this.$api.msg });
      }
    },
    handleSearch(e) {
      if (e.keyCode !== 13) {
        return;
      }

      let word = this.form.keyword.trim();

      if (!word) {
        return this.$toast({ msg: '关键字不能为空' });
      }
      this.$router.push({
        name: 'search',
        query: { word, time: +new Date() }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.home-wrap {
  height: 100vh;
  .header-bar {
    @include frow(space-between);
    height: 50px;
    font-size: 16px;
    color: $fswhite;
    background: $bgf33;
    .search-box {
      @include frow(flex-start);
      flex: 1;
      height: 30px;
      padding: 0 10px 0 5px;
      border-radius: 50px;
      background: $bgwhite;
      .icon-search {
        font-size: 18px;
        color: $fs999;
      }
      .search {
        display: flex;
        flex: 1;
        padding-left: 5px;
        background: none;
        &::-webkit-input-placeholder {
          color: $fs999;
        }
      }
    }
    .text-box,
    .btn-search {
      @include frow();
      width: 86px;
      height: 100%;
      &:active {
        opacity: 0.8;
      }
    }
    .text-box {
      .iconfont {
        margin-left: 8px;
        font-size: 18px;
      }
    }
    .btn-search {
      width: 53px;
      .iconfont {
        font-size: 26px;
      }
    }
  }
  .slider-box {
    padding: 25px 15px;
    font-size: 12px;
    .item-list {
      display: flex;
      flex-wrap: wrap;
      .item-box {
        @include fcol();
        width: 20%;
        padding-bottom: 13px;
        .img-box {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: $bgeee;
          .img {
            width: 100%;
            height: 100%;
          }
        }
        .text {
          padding-top: 6px;
        }
      }
    }
  }
  .boon-box {
    .title {
      @include frow();
      height: 40px;
      font-size: 14px;
      color: $fs333;
      background: $bgeee;
    }
    .list-box {
      display: flex;
      flex-wrap: wrap;
      padding: 0 15px;
      border-top: 1px solid $bdeee;
      box-sizing: border-box;
      .item-box {
        @include fcol();
        width: 33.3%;
        height: 130px;
        box-sizing: border-box;
        border-right: 1px solid $bdeee;
        &:nth-of-type(n + 4) {
          border-top: 1px solid $bdeee;
        }
        &:nth-of-type(3n) {
          border-right: 0 none;
        }
        .caption {
          font-size: 14px;
          font-weight: bold;
        }
        .sub-caption {
          font-size: 12px;
          margin-top: 6px;
        }
        .img-box {
          width: 96px;
          height: 67px;
          margin-top: 8px;
          .img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .hot-box {
    .title {
      @include frow();
      height: 40px;
      font-size: 14px;
      color: $fs333;
      background: $bgeee;
    }
  }
}
</style>
