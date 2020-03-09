<template>
  <div id="app" class="o-start-module">
    <div class="header-module">
      <h2 class="a-heading-1">Populära varor</h2>
      <a class="a-link" href="/handla/aktuella-erbjudanden"
        >Visa alla erbjudanden</a
      >
    </div>
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
a {
  cursor: pointer;
}
a {
  color: #337ab7;
  text-decoration: none;
}
.a-link {
  color: #00aa46;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
#app {
  font-family: "Akkurat", "Roboto", Helvetica, Arial, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1320px;
}
.o-start-module .header-module {
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
}
.o-start-module .header-module .a-heading-1 {
  font-family: Akkurat, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 1.6rem;
  margin-top: -2px;
  margin-bottom: 24px;
}
.o-start-module .header-module .a-link {
  position: absolute;
  right: 0;
  z-index: 1;
  margin-top: -4px;
  font-size: 1.4rem;
}
</style>
