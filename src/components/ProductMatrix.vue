<template>
  <div class="product-matrix">
    <div class="header-module">
      <h2 class="a-heading-1">Rekommendationer</h2>
    </div>
    <div v-if="error">{{ error }}</div>
    <ProductCard
      v-for="product in productList"
      :id="product.code"
      :key="product.code"
    />
    <div v-for="n in fillersNeeded" :key="n" class="fill-last-row"></div>
    <div class="nav-bar">
      <button
        v-if="productList.length > 0 && productList.length <= 6"
        class="button"
        @click="addMore"
      >
        Visa mer
      </button>
    </div>
  </div>
</template>

<script lang="ts">
var uniqBy = require("lodash.uniqby");

import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import ProductCard from "@/components/ProductCard.vue";

import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

//dev
// let COOP: any;
// COOP = [];
declare global {
  interface Window {
    ACC: {
      config: any;
    };
  }
}

// let COOP = this.$store.state;

export default Vue.extend({
  components: {
    ProductCard
  },
  data() {
    // COOP = this.$store.state;
    return {
      productList: [] as any[],
      error: "",
      placement: "", // "home_page.mobile_horizontal_recs1",
      // test: window.ACC.config
      columns: 2,
      rows: 2,
      width: 0
    };
  },
  computed: {
    leftToShow(): number {
      return this.productList.length - this.columns * this.rows;
    },
    limitList(): Array<any> {
      let slice = Math.min(this.columns * this.rows, this.productList.length); //??
      window.console.debug("slice:", slice);
      return Object.entries(this.productList)
        .slice(0, slice)
        .map(entry => entry[1]);
    },
    fillersNeeded(): Number {
      let itemsOnLastRow = this.productList.length % this.columns;

      if (itemsOnLastRow == 0) {
        return 0;
      } else {
        return this.columns - itemsOnLastRow;
      }
    },
    rcs(): any {
      // dev
      sessionStorage.setItem(
        "rcs",
        "eF5j4cotK8lMETA0N7bUNdQ1ZClN9jAxNDFLS05O1k0xMzTRNTFNSdFNTTFMBXJNk5Is0xKNEg0tAZ_oDyg"
      );
      return sessionStorage.getItem("rcs"); //this.getCookieValue("rr_rcs");
    },
    rrSessionId(): String {
      // window.ACC.config.rrSessionId = "s109421930639200";
      return window.ACC.config.rrSessionId;
    },
    user(): String {
      // window.ACC.config.user = "a148649e-235a-4157-8df8-5b2aa424ea7d";
      window.console.debug("window.ACC.config.user", window.ACC.config.user);
      if (window.ACC.config.user) {
        return window.ACC.config.user;
      } else {
        return "a148649e-235a-4157-8df8-5b2aa424ea7d";
      }
    },
    storeId(): String {
      // window.ACC.config.coopStore = "016001";
      return window.ACC.config.coopStore;
    },
    cartguid(): String {
      // window.ACC.config.cartguid = "8050f27b-ce0b-49f8-b535-daa7f6faca1d";
      return window.ACC.config.cartguid;
    }
  },
  mounted() {
    this.getWidth();
    // window.addEventListener("resize", this.getWidth);

    window.console.debug(this.columns + "x" + this.rows);

    const config = {
      headers: { Authorization: `Bearer ${window.ACC.config.authToken}` }
    };

    axios
      .get(
        // "https://www.coop.se/api/hybris/ecommerce/product/recommendations?placements[]=generic_page.generic_recs1"
        // "https://www.coop.se/api/hybris/ecommerce/product/recommendations?placements[]=home_page.horizontal_recs1"
        // https://www.coop.se/ws/v2/coop/users/anonymous/products/recommend-segmented?placements=home_page.horizontal_recs1%257Chome_page.horizontal_recs2%257Chome_page.horizontal_recs1%257Chome_page.horizontal_recs1&fields=DEFAULT
        // &currentPage=0&pageSize=6&storeId=016001&rrSessionId=s91829745064064&rcs=eF5jYSlN9kg2SU6xtLBM0k00SzPRNTFOTdM1Sks21zUyME1KMzdNNDAzTOXKLSvJTBEwNDe21DXUNQQArgQO0g
        // `https://www.coop.se/ws/v2/coop/users/anonymous/products/recommend-segmented?placements=home_page.horizontal_recs1&fields=DEFAULT&storeId=016001&rrSessionId=s109421930639200&rcs=`
        `https://www.coop.se/ws/v2/coop/users/${this.user}/products/recommend-segmented?placements=home_page.2020_start_few&fields=DEFAULT&storeId=${this.storeId}&rrSessionId=${this.rrSessionId}&rcs=${this.rcs}`,
        config
      )
      .then(response => {
        // this.productList = Vue.prototype.$receivedProducts =
        //   response.data.placements[0].products;
        // return this.productList;
        // Vue.prototype.$receivedProducts = response.data[0].products;
        // return (this.productList = response.data[0].products);
        let productsInResponse = response.data.placements[0].products;
        // this.productList.concat(productsInResponse);
        this.productList = [...productsInResponse, ...this.productList]; // sometimes the second request is received first, so lets add it to the beginning
        this.productList = uniqBy(this.productList, "code");
        // this.productList = this.productList.push(...productsInResponse);
        Vue.prototype.$receivedProducts = this.productList;
        return this.productList;
      })
      .catch(error => (this.error = error));
  },
  methods: {
    addMore() {
      window.console.debug("addMore()");

      const config = {
        headers: { Authorization: `Bearer ${window.ACC.config.authToken}` }
      };

      axios
        .get(
          // "https://www.coop.se/api/hybris/ecommerce/product/recommendations?placements[]=generic_page.generic_recs1"
          // "https://www.coop.se/api/hybris/ecommerce/product/recommendations?placements[]=home_page.horizontal_recs1"
          // https://www.coop.se/ws/v2/coop/users/anonymous/products/recommend-segmented?placements=home_page.horizontal_recs1%257Chome_page.horizontal_recs2%257Chome_page.horizontal_recs1%257Chome_page.horizontal_recs1&fields=DEFAULT
          // &currentPage=0&pageSize=6&storeId=016001&rrSessionId=s91829745064064&rcs=eF5jYSlN9kg2SU6xtLBM0k00SzPRNTFOTdM1Sks21zUyME1KMzdNNDAzTOXKLSvJTBEwNDe21DXUNQQArgQO0g
          // https://recs.richrelevance.com/rrserver/api/rrPlatform/recsForPlacements?apiKey=c5aa3f92242c950c&apiClientKey=182bc783b3c1fff9&returnMinimalRecItemData=true&rcs=eF5jYSlN9jBIMzI3M0lL000yTUvVNTG0SNY1TDUxBRKmyUCcmmZpmsiVW1aSmSJgaG5sqWuoawgApuYO1A&sessionId=daj0jpfe1p3xu3c&placements=home_page.2020_start_few&rid=016001
          `https://www.coop.se/ws/v2/coop/users/${this.user}/products/recommend-segmented?placements=home_page.2020_start_full&fields=DEFAULT&storeId=${this.storeId}&rrSessionId=${this.rrSessionId}&rcs=${this.rcs}`,
          config
        )
        .then(response => {
          let productsInResponse = response.data.placements[0].products;
          // this.productList.concat(productsInResponse);
          this.productList = [...this.productList, ...productsInResponse];
          this.productList = uniqBy(this.productList, "code");
          // this.productList = this.productList.push(...productsInResponse);
          Vue.prototype.$receivedProducts = this.productList;
          return this.productList;
        })
        .catch(error => (this.error = error));
    },
    getWidth() {
      this.width = this.$parent.$el.clientWidth;
      window.console.debug("width:", this.width);

      if (this.width > 3 * 152) {
        this.columns = 3;
        this.rows = 2;
      }

      if (this.width >= 4 * 152) {
        this.columns = 4;
        this.rows = 2;
        // this.placement = "home_page.2020_start_full"; //"home_page.horizontal_recs1"'
        this.addMore();
      }

      if (this.width > 5 * 152) {
        this.columns = 5;
        this.rows = 2;
      }

      if (this.width > 6 * 152) {
        this.columns = 6;
        this.rows = 2;
      }

      if (this.width > 7 * 152) {
        this.columns = 7;
        this.rows = 2;
      }

      if (this.width > 8 * 152) {
        this.columns = 8;
        this.rows = 2;
      }
    },
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

.header-module {
  width: 100%;
  margin: 35px 0 24px 0;
}

.nav-bar {
  width: 100%;
  text-align: center;
}

.button {
  width: 190px;
  margin: 10px auto;
  padding: 10px;
  border-radius: 999px;
  color: white;
  cursor: pointer;
  height: 40px;
  border-radius: 20px;
  background-color: #00aa46;
  font-size: 16px;
  border: 0;
}

.fill-last-row {
  box-sizing: border-box;
  min-width: 150px;
  max-width: 230px;
  flex-basis: 150px;
  flex-grow: 1;
  margin: 1px;
  padding: 0 15px;
}

// .product-matrix::after {
//   content: "";
//   flex: auto;
// }

// .card {
//   order: 1;
// }
// .card:nth-child(n + 5) {
//   order: 2;
// }
// .card:nth-child(n + 9) {
//   order: 3;
// }
// .product-matrix::before {
//   content: "1";
//   width: 100%;
//   order: 2;
// }
// .product-matrix::after {
//   content: "2";
//   width: 100%;
//   order: 2;
// }
</style>
