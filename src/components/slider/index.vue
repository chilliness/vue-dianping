<template>
  <div class="slider-wrap">
    <div class="slider-outer" @touchstart="handleTouchstart" @touchmove.stop="handleTouchmove" @touchend="handleTouchend" @transitionend="handleTransitionend" ref="slider">
      <slot>
        <div class="_item" v-for="(item, index) in num" :key="index">
          <div style="width: 100vw; height: 100%;">{{item}}</div>
        </div>
      </slot>
    </div>
    <div class="dot-box" v-if="num > 1">
      <i class="item" :class="{active: item === curIndex}" v-for="(item, index) in num" :key="index"></i>
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
      num: 3,
      curIndex: 1,
      isCanTouch: true,
      startX: 0,
      diffX: 0
    };
  },
  activated() {
    // 解决在keep-alive因定时间导致无法保存位置bug
    this.handlePlay();
  },
  mounted() {
    this.handleInit();
  },
  deactivated() {
    clearInterval(this.timer);
  },
  methods: {
    handleInit() {
      oSlider = this.$refs.slider;
      length = oSlider.children.length;
      width = oSlider.parentNode.clientWidth;

      if (length < 2) {
        return;
      }

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
      if (this.autoplay) {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          which = Math.min(length - 1, ++which);
          oSlider.style.cssText = `transform: translate3d(${which *
            -100}vw, 0, 0); transition: transform 0.2s;`;
        }, this.interval);
      }
    },
    handleTouchstart(e) {
      if (!this.isCanTouch || length < 2) {
        return;
      }
      clearInterval(this.timer);
      this.startX = e.changedTouches[0].clientX;
      which = parseInt(
        Math.abs(oSlider.getBoundingClientRect().left) /
          oSlider.parentNode.clientWidth,
        10
      );
    },
    handleTouchmove(e) {
      if (!this.isCanTouch || length < 2) {
        return;
      }
      e.stopPropagation();
      this.diffX = e.changedTouches[0].clientX - this.startX;
      oSlider.style.cssText = `transform: translate3d(${which * -width +
        this.diffX}px, 0, 0)`;
    },
    handleTouchend(e) {
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
    handleTransitionend() {
      if ([0, length - 1].includes(which)) {
        which = !which ? length - 2 : 1;
        oSlider.style.cssText = `transform: translate3d(${which *
          -100}vw, 0, 0)`;
      }
      this.isCanTouch = true;
      this.curIndex = which;
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
