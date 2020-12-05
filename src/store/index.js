import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    cart: JSON.parse(localStorage.getItem('cart')) || []
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    addCart(state, good) {
      const item = state.cart.find(v => v.id == good.id);
      if (item) {
        item.count++;
      } else {
        state.cart.push({
          ...good,
          count: 1
        });
      }
    },
    countMinus(state, index) {
      const item = state.cart[index];
      if (item.count > 1) {
        item.count--;
      } else {
        state.cart.splice(index, 1);
      }
    },
    countAdd(state, index) {
      state.cart[index].count++;
    }
  },
  getters: {
    isLogin: state => {
      return !!state.token;
    },
    cartTotal: state => {
      let total = 0;
      state.cart.forEach(v => {
        total += v.count;
      });
      return total;
    },
    total: state => state.cart.reduce((num, item) => num + item.count * item.price, 0)
  },
  actions: {
  },
  modules: {
  }
});

store.subscribe((mutation, state) => {
  switch (mutation.type) {
    case "setToken":
      localStorage.setItem('token', state.token);
      break;
    case "addCart":
      localStorage.setItem('cart', JSON.stringify(state.cart));
      break;
  }
});

export default store
