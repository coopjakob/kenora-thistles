<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
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
body {
  background-color: #f5f5f5;
}
#app {
  font-family: "Akkurat", "Roboto", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
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
