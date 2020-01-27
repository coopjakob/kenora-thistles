<template>
  <div class="hello">
    <button class="mdc-button">
      <div class="mdc-button__ripple"></div>
      <span class="mdc-button__label">Button: {{ msg }}</span>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    msg: String
  }
})
export default class HelloWorld extends Vue {}
</script>

<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
pre {
  text-align: left;
}
</style>
