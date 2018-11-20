<template>
  <div class="search-wrap">
    <div class="header-bar">
      <span class="btn-back" @click="$router.back()">
        <i class="iconfont icon-left-arrow"></i>
      </span>
      <div class="search-box">
        <i class="iconfont icon-search"></i>
        <input class="search" type="text" v-model.trim="keyword" placeholder="请输入关键字" @keyup.enter="handlerSearch">
      </div>
      <span class="btn-search" @click="handlerSearch">搜索</span>
    </div>
    <template v-if="isAjax">
      <div class="tips">正在搜索，请稍候</div>
      <Loading></Loading>
    </template>
    <!-- 主体部分 -->
    <template v-else>
      <Scroll :data="list" :isHasMore="false" pullUpLoad @load="handlerFetchData" v-if="list.length">
        <Item2 :list="list"></Item2>
      </Scroll>
      <div class="tips" v-else>没有找到匹配的商品</div>
    </template>
  </div>
</template>

<script>
import Item2 from '@/components/item2';
import Loading from '@/components/loading';

export default {
  name: 'Search',
  data() {
    return {
      keyword: '',
      list: [],
      isAjax: false
    };
  },
  methods: {
    async handlerFetchData() {
      if (this.isAjax) {
        return;
      }

      try {
        this.isAjax = true;
        let res = await this.$http.get(this.$api.list);
        this.isAjax = false;
        if (res.code === 200) {
          return (this.list = res.data.filter(
            item => item.name.indexOf(this.keyword) !== -1
          ));
        }
        this.$toast({ msg: res.msg });
      } catch (e) {
        this.isAjax = false;
        this.$toast({ msg: '网络开小差，请重试' });
      }
    },
    handlerSearch() {
      if (!this.keyword) {
        return this.$toast({ msg: '关键字不能为空' });
      }
      this.$router.push({ name: 'search', query: { word: this.keyword } });
    }
  },
  watch: {
    $route: {
      handler(val) {
        // 重置data数据
        Object.assign(this.$data, this.$options.data(), {
          keyword: val.query.word
        });
        this.handlerFetchData();
      },
      immediate: true,
      deep: true
    }
  },
  components: { Item2, Loading }
};
</script>

<style lang="scss" scoped>
.search-wrap {
  .header-bar {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    @include frow(space-between);
    height: 50px;
    font-size: 16px;
    color: $fswhite;
    background: $bgf33;
    .btn-back {
      @include frow();
      width: 55px;
      height: 100%;
      .iconfont {
        font-size: 20px;
      }
    }
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
    .btn-search {
      @include frow();
      width: 65px;
      height: 100%;
      &:active {
        opacity: 0.8;
      }
    }
  }
  .tips {
    @include frow();
    height: 100px;
    padding-top: 50px;
    font-size: 14px;
    color: $fs333;
  }
}
</style>
