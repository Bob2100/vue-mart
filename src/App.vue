<template>
  <div id="app">
    <transition name="mart_move">
      <router-view class="mart_view" />
    </transition>
    <cube-tab-bar
      show-slider
      inline
      class="mart_tab-bar"
      v-model="selectLabel"
      @change="changeHandler"
    >
      <cube-tab
        v-for="(item, index) in tabs"
        :icon="item.icon"
        :label="item.label"
        :value="item.value"
        :key="index"
      >
        <span class="mart_cart-badge" v-if="isShowTotal(item)">{{
          cartTotal
        }}</span>
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      selectLabel: "/",
      tabs: [
        { label: "Home", value: "/", icon: "cubeic-home" },
        { label: "Cart", value: "/cart", icon: "cubeic-mall" },
        { label: "Me", value: "/login", icon: "cubeic-person" },
      ],
    };
  },
  watch: {
    $route(route) {
      this.selectLabel = route.path;
    },
  },
  created() {
    this.selectLabel = this.$route.path;
  },
  computed: {
    ...mapGetters(["isLogin", "cartTotal"]),
  },
  methods: {
    async logout() {
      this.$http.get("/api/logout");
    },
    changeHandler(value) {
      this.$router.push(value);
    },
    isShowTotal(tab) {
      return tab.label == "Cart" && this.cartTotal > 0;
    },
  },
};
</script>
<style lang="less">
.mart_cart-badge {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background: rgba(235, 121, 93, 0.959);
  color: white;
  border-radius: 50%;
}
.mart_view {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  padding-bottom: 36px;
  width: 100%;
}
.mart_move-enter {
  transform: translate3d(-100%, 0, 0);
}
.mart_move-leave-to {
  transform: translate3d(100%, 0, 0);
}
.mart_move-enter-active,
.mart_move-leave-active {
  transition: transform 0.3s;
}
.mart_tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #edf0f4;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
