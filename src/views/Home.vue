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

    <good-list :goods="filterGoods" @addCart="onAddCart"></good-list>

    <cube-drawer
      ref="drawer"
      title="请选择"
      :data="drawData"
      @select="selectHandler"
    ></cube-drawer>
    <div class="ball-wrap">
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
      >
        <div class="ball" v-show="ball.show"></div>
      </transition>
    </div>
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
      ball: {
        show: false,
        target: null,
      },
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
      const notice = this.$createNotice();
      notice.add({ content: "hello", duration: 2 });
    },
    selectHandler(selectedVal) {
      this.selectedKeys = [...selectedVal];
    },
    beforeEnter(el) {
      const rect = this.ball.target.getBoundingClientRect();
      // 计算起始偏移量
      const x = rect.left - window.innerWidth / 2;
      const y = -(window.innerHeight - rect.top - 30);
      el.style.display = "";
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    },
    enter(el, done) {
      // 触发重绘
      document.body.offsetHeight;

      el.style.transform = "translate3d(0, 0, 0)";
      el.addEventListener("transitionend", done);
    },
    afterEnter(el) {
      this.ball.show = false;
      el.style.display = "none";
    },
    onAddCart(target) {
      this.ball.target = target;
      this.ball.show = true;
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
.ball-wrap {
  .ball {
    position: fixed;
    left: 50%;
    bottom: 10px;
    z-index: 200;
    background-color: red;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    transition: all 0.5s cubic-bezier(0.49, -0.29, 0.75, 0.41);
  }
}
</style>
