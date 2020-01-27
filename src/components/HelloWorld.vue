<template>
  <div class="hello">
    <button class="mdc-button">
      <div class="mdc-button__ripple"></div>
      <span class="mdc-button__label">Button: {{ msg }}</span>
    </button>

    <p>{{ error }}</p>

    <div v-for="product in products" :key="product.code">
      <pre>{{ product.name }} <template v-if="product.fromSweden">🇸🇪</template><strong>{{ product.price.formattedValue }} kr</strong></pre>
    </div>
    --
    <pre>{{ productList }}</pre>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    msg: String
  }
})
export default class HelloWorld extends Vue {
  productList = null;
  error = null;

  mounted() {
    axios
      .get(
        "https://www.coop.se/ws/v2/coop/users/anonymous/products/recommend-segmented?placements=home_page.horizontal_recs1&fields=DEFAULT&storeId=016001&rrSessionId=&rcs="
      )
      .then(
        response => (this.productList = response.data.placements[0].products)
      )
      .catch(error => (this.error = error));
  }
}
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
