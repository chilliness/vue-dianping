module.exports = {
  // 禁止build时生成map
  productionSourceMap: false,
  css: {
    loaderOptions: {
      // 构建sass全局变量
      sass: {
        data: `@import "@/common/scss/mixin.scss";`
      }
    }
  }
};
