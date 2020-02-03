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

//dev
let COOP: any;
COOP = [];
COOP.config = [];

export default Vue.extend({
  components: {
    ProductCard
  },
  data() {
    return {
      productList: Array,
      error: "",
      placement: "home_page.horizontal_recs1"
    };
  },
  computed: {
    rcs(): any {
      sessionStorage.setItem(
        "rcs",
        "eF5j4cotK8lMETA0N7bUNdQ1ZClN9jAxNDFLS05O1k0xMzTRNTFNSdFNTTFMBXJNk5Is0xKNEg0tAZ_oDyg"
      ); // local env
      return sessionStorage.getItem("rcs"); //this.getCookieValue("rr_rcs");
    },
    rrSessionId(): String {
      COOP.config.rrSessionId = "s109421930639200";
      return COOP.config.rrSessionId;
    },
    user(): String {
      COOP.config.user = "a148649e-235a-4157-8df8-5b2aa424ea7d";
      return COOP.config.user;
    },
    storeId(): String {
      COOP.config.coopStore = "016001";
      return COOP.config.coopStore;
    },
    cartguid(): String {
      COOP.config.cartguid = "8050f27b-ce0b-49f8-b535-daa7f6faca1d";
      return COOP.config.cartguid;
    }
  },
  mounted() {
    axios
      .get(
        // "https://www.coop.se/api/hybris/ecommerce/product/recommendations?placements[]=generic_page.generic_recs1"
        // "https://www.coop.se/api/hybris/ecommerce/product/recommendations?placements[]=home_page.horizontal_recs1"
        // https://www.coop.se/ws/v2/coop/users/anonymous/products/recommend-segmented?placements=home_page.horizontal_recs1%257Chome_page.horizontal_recs2%257Chome_page.horizontal_recs1%257Chome_page.horizontal_recs1&fields=DEFAULT
        // &currentPage=0&pageSize=6&storeId=016001&rrSessionId=s91829745064064&rcs=eF5jYSlN9kg2SU6xtLBM0k00SzPRNTFOTdM1Sks21zUyME1KMzdNNDAzTOXKLSvJTBEwNDe21DXUNQQArgQO0g
        `https://www.coop.se/ws/v2/coop/users/anonymous/products/recommend-segmented?placements=${this.placement}&fields=DEFAULT&storeId=${this.storeId}&rrSessionId=${this.rrSessionId}&rcs=${this.rcs}`
      )
      .then(response => {
        this.productList = Vue.prototype.$receivedProducts =
          response.data.placements[0].products;
        return this.productList;
        // Vue.prototype.$receivedProducts = response.data[0].products;
        // return (this.productList = response.data[0].products);
      })
      .catch(error => (this.error = error));
  },
  methods: {
    getCookieValue(name: string) {
      let value: any;
      if (document.cookie) {
        value = document.cookie.match(
          "(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)"
        );
      }
      return value ? value.pop() : "";
    }
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
