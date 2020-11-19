<template>
  <div id="app">
    <router-view />
    <cube-tab-bar
      class="mart_tab-bar"
      v-model="selectLabel"
      :data="tabs"
      @change="changeHandler"
    ></cube-tab-bar>
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
    ...mapGetters(["isLogin"]),
  },
  methods: {
    async logout() {
      this.$http.get("/api/logout");
    },
    changeHandler(value) {
      this.$router.push(value);
    },
  },
};
</script>
<style lang="less">
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
