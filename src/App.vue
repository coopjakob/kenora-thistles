<template>
  <div id="app">
    <ProductMatrix />
  </div>
</template>

<script>
import Vue from "vue";
import ProductMatrix from "@/components/ProductMatrix.vue";

Vue.prototype.$receivedProducts = [];

export default {
  components: {
    ProductMatrix
  }
};
</script>

<style lang="less">
*,
div {
  //like on coop.se
  box-sizing: border-box;
}
body {
  background-color: #f5f5f5;
}
#app {
  font-family: "Akkurat", "Roboto", Helvetica, Arial, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1320px;
}
</style>
