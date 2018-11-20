import Vue from 'vue';
import index from './index.vue';

// 此处会返回一个扩展实例的构造函器
const ToastConstructor = Vue.extend(index);

function showToast(config = {}) {
  const ToastDom = new ToastConstructor({
    el: document.createElement('div'),
    data() {
      return { ...{ msg: '提示', isShow: true, callback() {} }, ...config };
    }
  });

  // 防止页面出现重复添加
  if (document.querySelector('.toast-wrap')) {
    return;
  }

  document.body.appendChild(ToastDom.$el);

  ToastDom.timer = setTimeout(() => {
    clearTimeout(ToastDom.timer);
    ToastDom.isShow = false;
    ToastDom.callback();
  }, config.duration || 1.5e3);
}

export default function GlobalToast() {
  Vue.prototype.$toast = showToast;
}
