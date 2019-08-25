import Vue from 'vue';
import index from './index.vue';

// 此处会返回一个扩展实例的构造函器
let ConfirmConstructor = Vue.extend(index);

function showConfirm({ title = '提示', msg = '', cancelText = '取消', confirmText = '确定', cancel = () => {}, confirm = () => {} }) {
  let oConfirm = new ConfirmConstructor({
    el: document.createElement('div'),
    data() {
      return {
        title,
        msg,
        cancelText,
        confirmText
      };
    },
    methods: {
      handleClose(type) {
        document.body.removeChild(oConfirm.$el);
        type === 'cancel' ? cancel() : confirm();
      }
    }
  });

  document.body.appendChild(oConfirm.$el);
}

export default function $confirm() {
  Vue.prototype.$confirm = showConfirm;
}
