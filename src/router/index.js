import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import store from '@/store';
import Cart from '@/views/Cart.vue';
import History from '@/utils/history.js';

Vue.use(VueRouter)
Vue.use(History);

VueRouter.prototype.goBack = function () {
  this.isBack = true;
  this.back();
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/about',
    name: 'About',
    meta: { auth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (store.state.token) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.path
        }
      });
    }
  } else {
    next();
  }
});

router.afterEach((to) => {
  if (router.isBack) {
    History.pop();
    router.isBack = false;
    router.transitionName = 'mart_back';
  } else {
    History.push(to.path);
    router.transitionName = 'mart_forward';
  }
  router.isBack = false;
});

export default router
