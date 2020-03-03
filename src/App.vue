<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Vue from "vue";
import router from "./router";

Vue.prototype.$receivedProducts = [];

export default {
  mounted: function() {
    this.$router.push("/");
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

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
