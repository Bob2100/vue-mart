<template>
  <div>
    <div class="header">
      <h1>{{ title }}</h1>
      <i @click="back" class="cubeic-back"></i>
      <div class="extend">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  position: relative;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background-color: #edf0f4;
  .cubeic-back {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 15px;
    color: #fc915b;
  }
  .extend {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 15px;
    color: #fc915b;
  }
}
</style>
