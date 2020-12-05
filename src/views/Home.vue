<template>
  <div class="home">
    <m-header title="Vue Mart"></m-header>
    <cube-slide ref="slide" :data="items" class="mart_slide">
      <cube-slide-item v-for="(item, index) in items" :key="index">
        <router-link :to="`/detail/${item.id}`">
          <img :src="item.img" class="mart_slide-img" />
        </router-link>
      </cube-slide-item>
    </cube-slide>

    <cube-button @click="showDrawer">请选择分类</cube-button>

    <good-list :goods="filterGoods"></good-list>

    <cube-drawer
      ref="drawer"
      title="请选择"
      :data="drawData"
      @select="selectHandler"
    ></cube-drawer>
  </div>
</template>

<script>
// @ is an alias to /src
import GoodList from "@/components/GoodList.vue";
const DRAWER_LABEL = {
  fe: "前端",
  python: "Python",
  java: "Java",
  bigdata: "大数据",
  ai: "人工智能",
};
export default {
  name: "Home",
  components: {
    GoodList,
  },
  data() {
    return {
      items: [],
      goods: {},
      keys: [],
      selectedKeys: [],
    };
  },
  computed: {
    filterGoods() {
      let ret = [];
      this.selectedKeys.forEach((key) => {
        ret = ret.concat(this.goods[key]);
      });
      return ret;
    },
    drawData() {
      const drawerData = [];
      const drawerList = this.keys.map((key) => {
        return {
          text: DRAWER_LABEL[key],
          value: key,
        };
      });
      drawerData.push(drawerList);
      return drawerData;
    },
  },
  async created() {
    const {
      data: { slider, keys, data: goods },
    } = await this.$http.get("/api/goods");
    this.items = slider;
    this.keys = keys;
    this.goods = goods;
    this.selectedKeys = [...keys];
  },
  methods: {
    showDrawer() {
      this.$refs.drawer.show();
    },
    selectHandler(selectedVal) {
      this.selectedKeys = [...selectedVal];
    },
  },
};
</script>
<style lang="less" scoped>
.mart_slide {
  height: auto;
}
.mart_slide-img {
  width: 100%;
  height: 200px;
}
</style>
