<template>
  <div class="scroll-wrap" ref="scroll">
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
    bufferTime: {
      type: Number,
      default: 20
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
    isHasMore: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    this.handlerInitScroll();
  },
  methods: {
    handlerInitScroll() {
      if (!this.scroll) {
        this.scroll = new this.$BScroll(this.$refs.scroll, {
          click: this.click,
          probeType: this.probeType,
          observeDom: this.observeDom,
          pullDownRefresh: this.pullDownRefresh,
          pullUpLoad: this.pullUpLoad
        });

        this.scroll.on('scroll', pos => this.$emit('scroll', pos));

        this.pullDownRefresh &&
          this.scroll.on('pullingDown', () => this.$emit('refresh'));

        this.pullUpLoad &&
          this.scroll.on('pullingUp', () => this.$emit('load'));
      } else {
        this.scroll.refresh();
      }
    }
  },
  watch: {
    data: {
      handler() {
        this.timer = setTimeout(() => {
          this.pullUpLoad && this.scroll.finishPullUp();
          this.pullDownRefresh && this.scroll.finishPullDown();
          this.scroll.refresh();
          clearTimeout(this.timer);
        }, this.bufferTime);
      },
      immediate: true,
      deep: true
    }
  },
  components: { Loading }
};
</script>

<style lang="scss" scoped>
.scroll-wrap {
  position: fixed;
  left: 0;
  top: 50px;
  right: 0;
  bottom: 0;
  overflow: hidden;
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
