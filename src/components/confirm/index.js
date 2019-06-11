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
          msg: '',
          cancel() {},
          confirm() {}
        },
        ...config
      };
    },
    methods: {
      handleClose(type = 'cancel') {
        this.msg = '';
        // 使用setTimeout为了解决路由拦截bug
        type === 'cancel' ? this.cancel() : setTimeout(this.confirm, 30);
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
