import Vue from 'vue';
import Vuex from 'vuex';
import session from '@/utils/storage';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nowAddress: session.get('nowAddress', '北京'),
    isLogin: session.get('isLogin', 0),
    userInfo: session.get('userInfo', {}),
    collectList: session.get('collectList', []),
    cartList: session.get('cartList', [])
  },
  mutations: {
    $handlerAddress(state, address) {
      state.nowAddress = session.set('nowAddress', address);
    },
    $handlerLogin(state, obj) {
      state.isLogin = session.set('isLogin', obj.isLogin);
      state.userInfo = session.set('userInfo', obj.userInfo);
    },
    $handlerCollect(state, goods) {
      let list = state.collectList.find(item => item.id === goods.id)
        ? state.collectList.filter(item => item.id !== goods.id)
        : [goods, ...state.collectList];
      state.collectList = session.set('collectList', list);
    },
    $handlerCart(state, { goods, type = 'add' }) {
      let list = state.cartList;
      let obj = list.find(item => item.id === goods.id) || goods;

      // 如果当前数组中没有此项，就直接push;
      if (obj.cartNum === 0) {
        obj.cartNum = 1;
        return (state.cartList = session.set('cartList', [obj, ...list]));
      }

      type === 'add' ? ++obj.cartNum : --obj.cartNum;

      if (obj.cartNum > 0) {
        list = list.map(item => {
          if (item.id === goods.id) {
            return obj;
          }
          return item;
        });
      } else {
        list = list.filter(item => item.id !== goods.id);
      }
      state.cartList = session.set('cartList', list);
    },
    $handlerToggleChecked(state, { goods = 'all', checked }) {
      state.cartList = session.set(
        'cartList',
        state.cartList.map(item => {
          if (goods === 'all') {
            item.checked = checked;
          } else {
            if (item.id === goods.id) {
              item.checked = checked;
            }
          }
          return item;
        })
      );
    },
    $handlerDelCart(state) {
      state.cartList = session.set(
        'cartList',
        state.cartList.filter(item => !item.checked)
      );
    }
  }
});
