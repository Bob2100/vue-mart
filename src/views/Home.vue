<template>
  <div class="home">
    <cube-slide ref="slide" :data="items" class="mart_slide">
      <cube-slide-item v-for="(item, index) in items" :key="index">
        <router-link :to="`/detail/${item.id}`">
          <img :src="item.img" class="mart_slide-img" />
        </router-link>
      </cube-slide-item>
    </cube-slide>
    <good-list :goods="filterGoods"></good-list>
  </div>
</template>

<script>
// @ is an alias to /src
import GoodList from "@/components/GoodList.vue";
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
      let  ret = [];
      this.selectedKeys.forEach((key) => {
        ret = ret.concat(this.goods[key]);
      });
      return ret;
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
