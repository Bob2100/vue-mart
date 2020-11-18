<template>
  <div class="home">
    Home
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  async created() {
    const ret = await this.$http.get("/api/goods");
    console.log(ret);
  },
};
</script>
