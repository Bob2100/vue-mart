<template>
  <div class="home">
    <cube-slide ref="slide" :data="items" class="mart_slide">
      <cube-slide-item v-for="(item, index) in items" :key="index">
        <router-link :to="`/detail/${item.id}`">
          <img :src="item.img" class="mart_slide-img" />
        </router-link>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  data() {
    return {
      items: [],
    };
  },
  async created() {
    const {
      data: { slider },
    } = await this.$http.get("/api/goods");
    this.items = slider;
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
