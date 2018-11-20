import Vue from 'vue';
import Router from 'vue-router';
import session from '@/utils/storage';
import Home from '@/pages/home';
import Address from '@/pages/address';
import Search from '@/pages/search';
import Login from '@/pages/login';
import Detail from '@/pages/detail';
import Cart from '@/pages/cart';
import Collect from '@/pages/collect';
import Payment from '@/pages/payment';
import Mine from '@/pages/mine';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/address',
      name: 'address',
      component: Address
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/collect',
      name: 'collect',
      component: Collect
    },
    {
      path: '/payment',
      name: 'payment',
      component: Payment
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
});

router.beforeEach((to, from, next) => {
  // 解决路由切换confirm组件仍然显示bug
  if (to.path !== from.path && document.querySelector('.confirm-wrap')) {
    return next(false);
  }
  // 此处做权限拦截
  if (['payment', 'collect', 'mine'].includes(to.name) && !session.get('isLogin', 0)) {
    return next({ name: 'login', query: { redirect: from.path } });
  }
  next();
});

export default router;
