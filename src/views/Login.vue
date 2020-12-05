<template>
  <div>
    <m-header title="Vue Mart"></m-header>
    <cube-form
      :model="model"
      :schema="schema"
      @validate="validateHandler"
      @submit="submitHandler"
    ></cube-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        username: "",
        password: "",
      },
      schema: {
        fields: [
          {
            type: "input",
            modelKey: "username",
            label: "用户名",
            props: {
              placeholder: "请输入用户名",
            },
            rules: {
              required: true,
            },
            trigger: "blur",
            messages: {
              required: "用户名为必填项",
            },
          },
          {
            type: "input",
            modelKey: "password",
            label: "密码",
            props: {
              placeholder: "请输入密码",
              type: "password",
              eye: {
                open: false,
              },
            },
            rules: {
              required: true,
            },
            trigger: "blur",
            messages: {
              required: "密码为必填项",
            },
          },
          {
            type: "submit",
            label: "登录",
          },
        ],
      },
    };
  },
  methods: {
    async submitHandler(e) {
      e.preventDefault();

      const res = await this.$http({
        url: "/api/login",
        method: "post",
        data: this.model,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { code, token, message } = res.data;
      if (code == 0) {
        localStorage.setItem("token", token);
        this.$store.commit("setToken", token);
        this.$router.push(this.$route.query.redirect || "/");
      } else {
        const toast = this.$createToast({
          time: 2000,
          txt: message || "登录失败",
          type: "error",
        });
        toast.show();
      }
    },
    validateHandler(ret) {
      console.log("校验" + JSON.stringify(ret));
    },
  },
};
</script>

<style lang="scss" scoped></style>
