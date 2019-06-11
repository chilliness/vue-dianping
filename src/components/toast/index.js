import Vue from 'vue';
import index from './index.vue';

// 此处会返回一个扩展实例的构造函器
const ToastConstructor = Vue.extend(index);

function showToast(config = {}) {
  const ToastDom = new ToastConstructor({
    el: document.createElement('div'),
    data() {
      return { ...{ msg: '', callback() {} }, ...config };
    }
  });

  // 防止页面出现重复添加
  if (document.querySelector('.toast-wrap')) {
    return;
  }

  document.body.appendChild(ToastDom.$el);

  ToastDom.timer = setTimeout(() => {
    clearTimeout(ToastDom.timer);
    ToastDom.msg = '';
    ToastDom.callback();
  }, config.duration || 1500);
}

export default function GlobalToast() {
  Vue.prototype.$toast = showToast;
}
