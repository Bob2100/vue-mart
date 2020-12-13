<template>
  <div class="alert">
    <div class="alert-container" v-for="item in alerts" :key="item.id">
      <div class="alert-content">{{ item.content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "notice",
  data() {
    return {
      alerts: [],
    };
  },
  created() {
    this.id = 0;
  },
  methods: {
    add(options) {
      let id = `id_${this.id++}`;
      const _alert = { ...options, id };
      this.alerts.push(_alert);

      // 自动关闭
      const duration = options.duration || 1;
      setTimeout(() => {
        this.del(id);
      }, duration * 1000);
    },
    del(id) {
      for (let i = 0; i < this.alerts.length; i++) {
        if (this.alerts[i].id == id) {
          this.alerts.splice(i, 1);
          break;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.alert {
  position: fixed;
  width: 100%;
  top: 30px;
  left: 0;
  text-align: center;
  .alert-content {
    display: inline-block;
    padding: 8px;
    background: #fff;
    margin-bottom: 10px;
  }
}
</style>
