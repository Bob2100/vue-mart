<template>
  <div>
    <div class="item" v-for="good in goods" :key="good.id">
      <router-link :to="`/detail/${good.id}`">
        <div class="left">
          <img
            :src="good.img"
            alt
            @click.stop.prevent="showImagePreview(good.img)"
          />
        </div>
        <div class="right">
          <div class="title">{{ good.title }}</div>
          <div class="info">
            <i
              class="cubeic-add"
              @click.stop.prevent="addCart($event, good)"
            ></i>
            <span>{{ good.count }}人购买</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["goods"],
  methods: {
    showImagePreview(img) {
      this.$createImagePreview({
        imgs: [img],
      }).show();
    },
    addCart(e, good) {
      this.$store.commit("addCart", good);
      this.$emit("addCart", e.target);
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  padding: 10px;
  overflow: hidden;
  .left {
    width: 100px;
    float: left;
    img {
      width: 100%;
      height: 60px;
    }
  }
  .right {
    margin-left: 120px;
    text-align: left;
    .title {
      line-height: 30px;
    }
    .cubeic-add {
      font-size: 22px;
    }
  }
}
</style>
