<template>
  <div class="product-matrix">
    <div v-if="error">{{ error }}</div>
    <template v-for="product in productList">
      <ProductCard :id="product.code" :key="product.code" />
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ProductCard from "@/components/ProductCard.vue";

import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

export default Vue.extend({
  components: {
    ProductCard
  },
  data() {
    return {
      productList: Array,
      error: ""
    };
  },
  mounted() {
    axios
      .get(
        // "https://www.coop.se/api/hybris/ecommerce/product/recommendations?placements[]=generic_page.generic_recs1"
        // "https://www.coop.se/api/hybris/ecommerce/product/recommendations?placements[]=home_page.horizontal_recs1"
        "https://www.coop.se/ws/v2/coop/users/anonymous/products/recommend-segmented?placements=home_page.horizontal_recs1&fields=DEFAULT&storeId=016001&rrSessionId=&rcs="
      )
      .then(response => {
        this.productList = Vue.prototype.$receivedProducts =
          response.data.placements[0].products;
        return this.productList;
        // Vue.prototype.$receivedProducts = response.data[0].products;
        // return (this.productList = response.data[0].products);
      })
      .catch(error => (this.error = error));
  }
});
</script>

<style lang="scss" scoped>
.product-matrix {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  // align-items: stretch;
}
// .product-matrix::after {
//   content: "";
//   flex: auto;
// }
</style>
