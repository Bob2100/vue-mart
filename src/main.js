import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import httpInterceptor from '@/http-interceptor';// eslint-disable-line no-unused-vars
import MHeader from '@/components/Header.vue';
// 全局组件
Vue.component('m-header', MHeader);

Vue.config.productionTip = false
Vue.prototype.$http = axios;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
