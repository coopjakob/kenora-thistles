<template>
  <div class="hello">
    <button class="mdc-button">
      <div class="mdc-button__ripple"></div>
      <span class="mdc-button__label">Button</span>
    </button>

    <div v-for="product in products" :key="product.code">
      <pre>{{ product.name }} <template v-if="product.fromSweden">🇸🇪</template><strong>{{ product.price.formattedValue }}</strong></pre>
    </div>
    --
    <pre>{{ products }}</pre>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

import { Component, Prop, Vue } from "vue-property-decorator";

export default {
  props: ["msg"],
  data() {
    return {
      products: null
    };
  },
  mounted() {
    axios
      .get(
        "https://www.coop.se/ws/v2/coop/users/anonymous/products/recommend-segmented?placements=home_page.horizontal_recs1&fields=DEFAULT&currentPage=0&pageSize=4&storeId=016001&rrSessionId=&rcs="
      )
      .then(response => (this.products = response.data.placements[0].products));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
