<template>
  <div class="product-matrix">
    <ProductCard
      v-for="p in showProducts.slice(0, columns * rows)"
      :id="p.code"
      :key="p.code"
    />
    <div v-for="n in fillersNeeded" :key="n" class="fill-last-row"></div>
    <div class="show-more">
      <button
        v-if="showProducts.length > 0 && showProducts.length <= 6"
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

import chat from "@/plugins/chat";
chat("c", "Hej! 👋");

export default Vue.extend({
  components: {
    ProductCard
  },
  data() {
    return {
      showProducts: [] as any[],
      columns: 2,
      rows: 999,
      width: 0,
      moreAdded: false
    };
  },
  computed: {
    fillersNeeded(): Number {
      let itemsOnLastRow = this.showProducts.length % this.columns;

      if (itemsOnLastRow == 0) {
        chat("p", "sista raden är full, det finns inte plats för extra kort");
        return 0;
      } else {
        let qtyFreeSpace = this.columns - itemsOnLastRow;
        chat("p", `det finns ${qtyFreeSpace} lediga platser på sista raden`);
        return qtyFreeSpace;
      }
    },
    rcs(): any {
      return sessionStorage.getItem("rcs"); //this.getCookieValue("rr_rcs");
    },
    config(): any {
      return window.ACC.config;
    }
  },
  mounted() {
    this.getWidth();
    window.addEventListener("resize", this.getWidth);

    chat("p", "Det verkar få plats " + this.columns + " varor på varje rad...");

    let config = {};
    if (this.config.user != "anonymous") {
      config = {
        headers: { Authorization: `Bearer ${this.config.authToken}` }
      };
    }

    axios
      .get(
        `https://www.coop.se/ws/v2/coop/users/${this.config.user}/products/recommend-segmented?placements=home_page.2020_start_few&fields=DEFAULT&storeId=${this.config.coopStore}&rrSessionId=${this.config.rrSessionId}&rcs=${this.rcs}`,
        config
      )
      .then(response => {
        const products = response.data.placements[0].products;
        this.$store.commit("addProducts", products);

        this.showProducts = [...products, ...this.showProducts]; // sometimes the second request is received first, so lets add it to the beginning
        this.showProducts = uniqBy(this.showProducts, "code");
      })
      .catch(error => window.console.error(error));

    chat("a", "Nu ska jag hämta din senaste varukorg");
    axios
      .get(
        `https://www.coop.se/ws/v2/coop/users/${this.config.user}/carts/${this.config.cartguid}?fields=DEFAULT`,
        config
      )
      .then(response => {
        this.$store.commit("cart", response.data);
        chat("a", "Nu har jag hämtat din varukorg");
      })
      .catch(error => {
        chat("a", "Kan tyvärr inte hämta din varukorg");
        window.console.error(error);
      });
  },
  methods: {
    addMore() {
      chat("a", "Nu är det dags att ladda in fler varor...");

      let config = {};
      if (this.config.user != "anonymous") {
        config = {
          headers: { Authorization: `Bearer ${this.config.authToken}` }
        };
      }

      axios
        .get(
          `https://www.coop.se/ws/v2/coop/users/${this.config.user}/products/recommend-segmented?placements=home_page.2020_start_full&fields=DEFAULT&storeId=${this.config.coopStore}&rrSessionId=${this.config.rrSessionId}&rcs=${this.rcs}`,
          config
        )
        .then(response => {
          const products = response.data.placements[0].products;
          this.$store.commit("addProducts", products);

          this.showProducts = [...this.showProducts, ...products];
          this.showProducts = uniqBy(this.showProducts, "code");

          this.moreAdded = true;
        })
        .catch(error => window.console.error(error));
    },
    getWidth() {
      this.width = this.$parent.$el.clientWidth;

      chat(
        "p",
        "Platsen där vi kan visa varor är " +
          this.width +
          "pixlar bred, brukar man säga"
      );

      if (this.width > 3 * 152) {
        this.columns = 3;
        this.rows = 999;
      }

      if (this.width >= 4 * 152) {
        this.columns = 4;
        this.rows = 3;

        if (!this.moreAdded) {
          this.addMore();
        }
      }

      if (this.width > 5 * 152) {
        this.columns = 5;
        this.rows = 3;
      }

      if (this.width > 6 * 152) {
        this.columns = 6;
        this.rows = 3;
      }

      if (this.width > 7 * 152) {
        this.columns = 7;
        this.rows = 3;
      }

      if (this.width > 8 * 152) {
        this.columns = 8;
        this.rows = 3;
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

.show-more {
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
  min-width: 142px;
  max-width: 230px;
  flex-basis: 142px;
  flex-grow: 1;
  margin: 1px;
  padding: 10px;
}

@media (min-width: 425px) {
  .fill-last-row {
    min-width: 150px;
    flex-basis: 150px;
    padding: 15px;
  }
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
