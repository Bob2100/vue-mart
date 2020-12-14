<template>
  <div class="ball-wrap">
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
    >
      <div class="ball" v-show="ball.show">
        <div class="inner">
          <div class="cubeic-add"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ballAnim",
  props: ["target"],
  data() {
    return {
      ball: {
        show: false,
        target: this.target,
      },
    };
  },
  methods: {
    start() {
      this.ball.show = true;
    },
    beforeEnter(el) {
      const rect = this.ball.target.getBoundingClientRect();
      // 计算起始偏移量
      const x = rect.left - window.innerWidth / 2;
      const y = -(window.innerHeight - rect.top - 30);
      el.style.display = "block";
      el.style.transform = `translate3d(0, ${y}px, 0)`;
      const inner = el.querySelector(".inner");
      inner.style.transform = `translate3d(${x}px, 0, 0)`;
    },
    enter(el, done) {
      // 触发重绘
      document.body.offsetHeight;

      el.style.transform = "translate3d(0, 0, 0)";
      const inner = el.querySelector(".inner");
      inner.style.transform = "translate3d(0, 0, 0)";
      el.addEventListener("transitionend", done);
    },
    afterEnter(el) {
      this.ball.show = false;
      el.style.display = "none";
    },
  },
};
</script>

<style lang="less" scoped>
.ball-wrap {
  .ball {
    position: fixed;
    left: 50%;
    bottom: 10px;
    z-index: 200;
    transition: all 0.5s cubic-bezier(0.49, -0.29, 0.75, 0.41);
    .inner {
      width: 16px;
      height: 16px;
      color: red;
      transition: all 0.5s linear;
      .cubeic-add {
        font-size: 22px;
      }
    }
  }
}
</style>
