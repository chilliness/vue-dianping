<template>
  <div class="scroll-wrap" :class="{bottom: isBottom}" ref="scrollWrapRef">
    <div>
      <slot></slot>
      <div class="loading-bar" v-if="pullUpLoad">
        <Loading class="loading-box" :isHasClass="false" v-if="isHasMore"></Loading>
        <div class="loading-text" v-else>
          <i class="line"></i>
          <span class="text">我是有底线的</span>
          <i class="line"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/loading';

export default {
  name: 'Scroll',
  components: { Loading },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    click: {
      type: Boolean,
      default: true
    },
    probeType: {
      type: Number,
      default: 3
    },
    observeDom: {
      type: Boolean,
      default: false
    },
    pullDownRefresh: {
      type: [Boolean, Object],
      default: false
    },
    pullUpLoad: {
      type: [Boolean, Object],
      default: false
    },
    delay: {
      type: Number,
      default: 20
    },
    isHasMore: {
      type: Boolean,
      default: true
    },
    isBottom: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.handleInitScroll();
  },
  methods: {
    handleInitScroll() {
      if (!this.scroll) {
        this.scroll = new this.$BScroll(this.$refs.scrollWrapRef, {
          click: this.click,
          probeType: this.probeType,
          observeDom: this.observeDom,
          pullDownRefresh: this.pullDownRefresh,
          pullUpLoad: this.pullUpLoad
        });

        this.scroll.on('scroll', pos => this.$emit('emitScroll', pos));

        if (this.pullDownRefresh) {
          this.scroll.on('pullingDown', () => this.$emit('emitRefresh'));
        }

        if (this.pullUpLoad) {
          this.scroll.on('pullingUp', () => this.$emit('emitLoad'));
        }
      } else {
        this.scroll.refresh();
      }
    },
    handleScrollTo() {
      if (this.scroll) {
        this.scroll.scrollTo(0, 0, 100);
      }
    },
    handleFinshPullUp() {
      if (this.scroll) {
        this.scroll.finishPullUp();
      }
    },
    handleRefresh() {
      this.handleFinshPullUp();
      if (this.scroll) {
        this.scroll.refresh();
      }
    }
  },
  watch: {
    data(val, oldVal) {
      clearTimeout(this.timerRefresh);
      this.timerRefresh = setTimeout(() => {
        clearTimeout(this.timerRefresh);
        this.handleRefresh();
      }, this.delay);
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll-wrap {
  position: absolute;
  left: 0;
  top: 50px;
  right: 0;
  bottom: 0;
  overflow: hidden;
  &.bottom {
    bottom: 50px;
  }
  .loading-bar {
    height: 50px;
    font-size: 14px;
    .loading-box,
    .loading-text {
      @include frow();
      height: 100%;
      .line {
        width: 20%;
        border-top: 1px solid $bdeee;
        margin: 0 20px;
      }
    }
  }
}
</style>
