<template>
  <div class="search-wrap">
    <div class="header-bar">
      <span class="btn-back" @click="$router.back()">
        <i class="iconfont icon-left-arrow"></i>
      </span>
      <div class="search-box">
        <i class="iconfont icon-search"></i>
        <input class="search" type="text" v-model.trim="keyword" placeholder="请输入关键字" @keyup.enter="handleSearch" />
      </div>
      <span class="btn-search" @click="handleSearch">搜索</span>
    </div>
    <template v-if="isAjax">
      <div class="hint">正在搜索，请稍候</div>
      <Loading></Loading>
    </template>
    <!-- 主体部分 -->
    <template v-else>
      <Scroll :data="list" :isHasMore="false" pullUpLoad v-if="list.length">
        <Item :list="list"></Item>
      </Scroll>
      <div class="hint" v-else>没有找到匹配的商品</div>
    </template>
  </div>
</template>

<script>
import { Item, Loading } from '@/components';

export default {
  name: 'Search',
  components: { Item, Loading },
  data() {
    return {
      keyword: '',
      list: [],
      isAjax: false
    };
  },
  methods: {
    handleSearch() {
      if (!this.keyword) {
        return this.$toast({ msg: '关键字不能为空' });
      }
      this.$router.replace({
        name: 'search',
        query: { word: this.keyword, time: +new Date() }
      });
    },
    async handleFetchData() {
      if (this.isAjax) {
        return;
      }

      try {
        this.isAjax = true;
        let res = await this.$http.get(this.$api.list);
        this.isAjax = false;
        if (res.code === 200) {
          this.list = res.data.filter(
            item => item.name.indexOf(this.keyword) !== -1
          );
        } else {
          this.$toast({ msg: res.msg });
        }
      } catch (e) {
        this.isAjax = false;
        this.$toast({ msg: this.$api.msg });
      }
    }
  },
  watch: {
    $route: {
      handler(val) {
        // 重置data数据
        Object.assign(this.$data, this.$options.data(), {
          keyword: val.query.word
        });
        this.handleFetchData();
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.search-wrap {
  height: 100vh;
  font-size: 14px;
  color: $fs333;
  .header-bar {
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
  .hint {
    @include frow();
    height: 100px;
  }
}
</style>
