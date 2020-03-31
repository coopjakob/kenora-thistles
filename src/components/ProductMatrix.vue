<template>
  <div class="product-matrix">
    <component
      :is="components[card.type]"
      v-for="card in cards"
      :key="card.sortKey"
      :card="card"
    />

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
import InfoCard from "./InfoCard.vue";
import AdCard from "./AdCard.vue";

import { CardTypes } from "@/types/Card";

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
    ProductCard,
    AdCard,
    InfoCard
  },
  data() {
    return {
      showProducts: [] as any[],
      columns: 2,
      rows: 999,
      width: 0,
      moreAdded: false,
      components: {
        [CardTypes.INFO]: InfoCard,
        [CardTypes.AD]: AdCard
      },
      cards: [
        {
          type: CardTypes.AD,
          position: 1,
          image: "https://source.unsplash.com/random/230x460/?dinner",
          link: "http://coop.se/product"
        },
        {
          type: CardTypes.INFO,
          label: "KRAV0U0MARK",
          image:
            "https://res.cloudinary.com/coopsverige/image/upload/cooponline/alltid-bra-pris-200x200.png",
          imageAltText: "",
          buttonText: "Krav på Coop",
          header: "Kravmärkt",
          text:
            "Ekologiskt betyder att det är dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
          link: "http://coop.se/product"
        },
        {
          type: CardTypes.INFO,
          brand: "Änglamark",
          image:
            "https://res.cloudinary.com/coopsverige/image/upload/cooponline/produktmarkning/NyckelhalLogo.svg",
          imageAltText: "",
          buttonText: "Mer info",
          header: "Änglamark",
          text: `Änglamark är vårt varumärke. Smod tempor incididunt ut labore et dol.
            Magna aliqua. Ut enim ad minim veniam`,
          link: "http://coop.se/product"
        },
        {
          type: CardTypes.INFO,
          image:
            "https://res.cloudinary.com/coopsverige/image/upload/v1576163066/cooponline/G%C3%A5rdsbutiken/landingpage-recommended-producers/syltkrukan-type4.jpg",
          imageAltText: "",
          buttonText: "Gårdsbutiken",
          header: "Handla lokalt",
          text:
            "I gårdsbutiken finns lokala varo rdolor sit amet, consectetur adipiscing elit, sed do et dolore magna aliqua. Ut enim ad minim veniam",
          link: "http://coop.se/product"
        },
        {
          type: CardTypes.AD,
          position: 12,
          image: "https://source.unsplash.com/random/230x460/?food",
          link: "http://example.com/product"
        }
      ]
    };
  },
  computed: {
    fillersNeeded(): Number {
      let itemsOnLastRow = this.showProducts.length % this.columns;

      if (itemsOnLastRow == 0) {
        return 0;
      } else {
        let qtyFreeSpace = this.columns - itemsOnLastRow;
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

    let config = {};
    if (this.config.user != "anonymous" && this.config.user != "anonymousb2b") {
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

    axios
      .get(
        `https://www.coop.se/ws/v2/coop/users/${this.config.user}/carts/${this.config.cartguid}?fields=DEFAULT`,
        config
      )
      .then(response => {
        this.$store.commit("cart", response.data);
      })
      .catch(error => {
        window.console.error(error);
      });
  },
  methods: {
    addMore() {
      let config = {};
      if (
        this.config.user != "anonymous" &&
        this.config.user != "anonymousb2b"
      ) {
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

<style lang="sass" scoped>
.card
  box-sizing: border-box
  display: flex
  flex-direction: column
  position: relative
  min-width: 142px
  max-width: 230px
  flex-basis: 142px
  flex-grow: 1
  margin: 1px
  background-color: white
  padding: 10px
  color: #333

  @media (min-width: 425px)
    min-width: 150px
    flex-basis: 150px
    padding: 15px
</style>

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
