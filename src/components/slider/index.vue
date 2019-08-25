<template>
  <div class="slider-wrap">
    <div class="slider-outer" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd" @transitionend="handleTransitionEnd" ref="slider">
      <slot>
        <div class="_item" v-for="(item, index) in [1, 2, 3]" :key="index">
          <div style="width: 100vw; height: 100%;">{{item}}</div>
        </div>
      </slot>
    </div>
    <div class="dot-box">
      <i class="item" :class="{active: item === nowIndex}" v-for="(item, index) in list" :key="index"></i>
    </div>
  </div>
</template>

<script>
let [which, oSlider, length, width] = [1, null, null, null];

export default {
  name: 'Slider',
  props: {
    interval: {
      type: Number,
      default: 5000
    },
    autoplay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      list: [],
      nowIndex: 1,
      isCanTouch: true,
      startX: 0,
      diffX: 0
    };
  },
  mounted() {
    this.handleInit();
  },
  activated() {
    // 解决在keep-alive导致的bug
    this.handlePlay();
  },
  deactivated() {
    clearInterval(this.timerPlay);
  },
  beforeDestory() {
    clearInterval(this.timerPlay);
  },
  methods: {
    handleInit() {
      oSlider = this.$refs.slider;
      length = oSlider.children.length;
      width = oSlider.parentNode.clientWidth;

      if (length < 2) {
        return;
      }

      this.list = [...''.padStart(length)].map((v, i) => i + 1);

      oSlider.insertBefore(
        oSlider.children[length - 1].cloneNode(true),
        oSlider.children[0]
      );
      oSlider.appendChild(oSlider.children[1].cloneNode(true));
      oSlider.style.cssText = 'transform: translate3d(-100vw, 0, 0)';
      length = oSlider.children.length;

      this.handlePlay();
    },
    handlePlay() {
      if (this.autoplay && length > 1) {
        clearInterval(this.timerPlay);
        this.timerPlay = setInterval(() => {
          which = Math.min(length - 1, ++which);
          oSlider.style.cssText = `transform: translate3d(${which *
            -100}vw, 0, 0); transition: transform 0.2s;`;
        }, this.interval);
      }
    },
    handleTouchStart(e) {
      if (!this.isCanTouch || length < 2) {
        return;
      }
      clearInterval(this.timerPlay);
      this.startX = e.changedTouches[0].clientX;
      which = parseInt(
        Math.abs(oSlider.getBoundingClientRect().left) /
          oSlider.parentNode.clientWidth,
        10
      );
    },
    handleTouchMove(e) {
      if (!this.isCanTouch || length < 2) {
        return;
      }
      this.diffX = e.changedTouches[0].clientX - this.startX;
      oSlider.style.cssText = `transform: translate3d(${which * -width +
        this.diffX}px, 0, 0)`;
    },
    handleTouchEnd(e) {
      if (length < 2) {
        return;
      }
      this.handlePlay();
      this.diffX = e.changedTouches[0].clientX - this.startX;
      if (Math.abs(this.diffX) && this.isCanTouch) {
        if (Math.abs(this.diffX) > width / 5) {
          which =
            this.diffX > 0
              ? Math.max(0, --which)
              : Math.min(length - 1, ++which);
        }
        this.isCanTouch = false;
        oSlider.style.cssText = `transform: translate3d(${which *
          -100}vw, 0, 0); transition: transform 0.2s;`;
      }
    },
    handleTransitionEnd() {
      if ([0, length - 1].includes(which)) {
        which = !which ? length - 2 : 1;
        oSlider.style.cssText = `transform: translate3d(${which *
          -100}vw, 0, 0)`;
      }
      this.isCanTouch = true;
      this.nowIndex = which;
    }
  }
};
</script>

<style lang="scss" scoped>
.slider-wrap {
  position: relative;
  overflow: hidden;
  .slider-outer {
    display: inline-table;
    white-space: nowrap;
    $size: 60px;
    & > * {
      display: inline-table;
      width: 100vw;
      min-height: $size;
      box-sizing: border-box;
    }
    ._item {
      text-align: center;
      line-height: $size;
    }
  }
  .dot-box {
    position: absolute;
    left: 50%;
    bottom: 10px;
    display: flex;
    transform: translateX(-50%);
    .item {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: $bgeee;
      &.active {
        background: $bgf33;
      }
      &:nth-of-type(n + 2) {
        margin-left: 10px;
      }
    }
  }
}
</style>
