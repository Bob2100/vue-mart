// 拦截所有http请求，预先在请求头放入token
import axios from 'axios';
import store from '@/store';
import router from './router';

axios.interceptors.request.use(config => {
  if (store.state.token) {
    config.headers.token = store.state.token;
  }
});
axios.interceptors.response.use(
  response => {
    if (response.status == 200) {
      const data = response.data;
      if (data.code == -1) {
        clearHandler();
      }
    }
  },
  err => {
    if (err.response.status == 401) {
      clearHandler();
    }
  }
);

function clearHandler() {
  store.commit('setToken', '');
  localStorage.removeItem('token');

  router.push({
    path: '/login',
    query: {
      redirect: router.currentRoute.path
    }
  });
}