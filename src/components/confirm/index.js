import Vue from 'vue';
import index from './index.vue';

// 此处会返回一个扩展实例的构造函器
const ConfirmConstructor = Vue.extend(index);

function showConfirm(config = {}) {
  const ConfirmDom = new ConfirmConstructor({
    el: document.createElement('div'),
    data() {
      return {
        ...{
          title: '提示',
          cancelText: '取消',
          confirmText: '确定',
          msg: '提示内容',
          isShow: true,
          cancel() {},
          confirm() {}
        },
        ...config
      };
    },
    methods: {
      handlerClose(type = 'cancel') {
        this.isShow = false;
        type === 'cancel' ? this.cancel() : this.confirm();
      }
    }
  });

  // 防止页面出现重复添加
  if (document.querySelector('.confirm-wrap')) {
    return;
  }

  document.body.appendChild(ConfirmDom.$el);
}

export default function GlobalConfirm() {
  Vue.prototype.$confirm = showConfirm;
}
