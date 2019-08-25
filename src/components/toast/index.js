import Vue from 'vue';
import index from './index.vue';

// 此处会返回一个扩展实例的构造函器
let ToastConstructor = Vue.extend(index);

function showToast({ msg = '', callback = () => {}, duration = 1500 }) {
  let oToast = new ToastConstructor({
    el: document.createElement('div'),
    data() {
      return { msg };
    }
  });

  document.body.appendChild(oToast.$el);

  setTimeout(() => {
    document.body.removeChild(oToast.$el);
    callback();
  }, duration);
}

export default function $toast() {
  Vue.prototype.$toast = showToast;
}
