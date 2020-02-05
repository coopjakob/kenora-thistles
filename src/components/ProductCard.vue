<template>
  <div>
    <div
      class="product-card"
      :class="{ added: added }"
      @mousedown="reach"
      @mouseup="withdraw"
    >
      <div class="placeholder">
        <img :src="imgSrc" :title="imgAlt" :alt="imgAlt" />
      </div>
      <div class="gear">
        <svg
          v-if="added"
          width="30"
          height="30"
          viewBox="0 0 63 63"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 31.5C0 14.103 14.103 0 31.5 0V0C48.897 0 63 14.103 63 31.5V31.5C63 48.897 48.897 63 31.5 63V63C14.103 63 0 48.897 0 31.5V31.5Z"
            fill="#00AA46"
          />
          <path d="M12 33L26.5 45L48.5 17" stroke="white" stroke-width="8" />
        </svg>
      </div>
      <div class="labels">
        <template v-if="!added">
          <div
            v-for="label in receivedProducts[productIndex].productLabels"
            :key="label.code"
          >
            <img :src="label.icon" width="30" />
          </div>
          <img
            v-if="isSweden"
            width="30"
            alt="flag-sweden"
            src="../assets/flag-sweden.svg"
          />
        </template>
      </div>
      <div v-if="!added" class="splash">
        <img
          src="https://res.cloudinary.com/coopsverige/image/upload/v1569329381/cooponline/SVGs/pricesplash.svg"
        />
        <div class="description">
          {{ promoDescription }}
        </div>
      </div>
      <div v-if="!added" class="price" :class="{ 'is-promo': isPromo() }">
        <div v-if="isMedmera" class="pill">Medlemspris</div>
        <div v-if="maxUseText" class="max-use-text">{{ maxUseText }}</div>
        <span v-if="promoPrice" class="promotion-price">
          {{ promoPrice }} <span class="unit">kr/st </span>
        </span>
        <span :class="{ strikeout: isPromo() }">
          <span class="formatted-value">{{ price }}</span>
          <span class="unit"> kr/st</span>
        </span>
      </div>
    </div>
    <div class="add-to-cart">
      <button value="-" :disabled="qty == 0" @click="updateCart(qty - 1)">
        -
      </button>
      <!-- <input v-model.number="qty" type="number" min="0" max="999" /> -->
      <input
        type="number"
        min="0"
        max="999"
        :placeholder="qty"
        @keydown.enter="updateCartInput"
      />
      <!-- <input v-model.number="updateCartModel" type="number" min="0" max="999" :placeholder="qty"/> -->
      <button value="+" @click="updateCart(qty + 1)">+</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

//dev
let COOP: any;
// COOP = [];
// COOP.config = [];

export default Vue.extend({
  props: {
    // price: String,
    id: {
      type: String,
      // default: "0",
      required: true
    }
  },
  data() {
    COOP = this.$store.state;
    return {
      added: false,
      isAdding: false,
      receivedProducts: Vue.prototype.$receivedProducts,
      // qty: 0 as number,
      // quantity: 0 as number,
      savedQuantity: 0 as number
    };
  },
  computed: {
    // TODO: need to reorder the flow, including test data
    qty: {
      get: function() {
        let quantityFromCartIndex = COOP.minicart.entries.findIndex(
          (entry: any) => entry.product.code === this.id
        );

        window.console.debug("quantityFromCartIndex:", quantityFromCartIndex);

        if (quantityFromCartIndex > 0) {
          window.console.debug("quantity exist in cart product, get old");
          return COOP.minicart.entries[quantityFromCartIndex].quantity;
        }

        // return 0;
        // Dev, if not in cart
        return this.savedQuantity;
      },
      set: function(value: number) {
        this.savedQuantity = value;

        let quantityFromCartIndex = COOP.minicart.entries.findIndex(
          (entry: any) => entry.product.code === this.id
        );

        window.console.debug("quantityFromCartIndex:", quantityFromCartIndex);

        // DEV
        // you need to set via API and then get the new file, then update,
        if (quantityFromCartIndex > 0) {
          window.console.debug(
            "quantity exist in cart product, set new value",
            value
          );
          COOP.minicart.entries[quantityFromCartIndex].quantity = value;
          // latest from server
          // update here or update on this.savedQuantity?
        }
      }
    },
    updateCartModel: {
      get: function() {
        let qty: number = this.qty;
        if (qty > 0) {
          return qty;
        } else {
          return "";
        }
      },
      set: function(value: number) {
        if (value > 0) {
          this.updateCart(value);
        } else {
          this.updateCart(0);
        }
      }
    },
    productIndex(): string {
      return this.receivedProducts.findIndex(
        (product: any) => product.code === this.id
      );
    },
    name(): string {
      return this.receivedProducts[this.productIndex].name;
    },
    isSweden(): string {
      return this.receivedProducts[this.productIndex].fromSweden;
    },
    isMedmera(): any {
      if (this.receivedProducts[this.productIndex].potentialPromotions[0]) {
        return this.receivedProducts[this.productIndex].potentialPromotions[0]
          .medmera;
      } else {
        return false;
      }
    },
    promoDescription(): any {
      if (this.receivedProducts[this.productIndex].potentialPromotions[0]) {
        return this.receivedProducts[this.productIndex].potentialPromotions[0]
          .description;
      } else {
        return false;
      }
    },
    price(): string {
      let price = this.receivedProducts[this.productIndex].price.formattedValue;
      price = price.replace(":-", "");
      return price;
    },
    promoPrice(): any {
      const index = this.productIndex;
      if (this.isPromo()) {
        let price = this.receivedProducts[index].promotionPrice.formattedValue;
        price = price.replace(":-", "");
        return price;
      } else {
        return false;
      }
    },
    maxUseText(): any {
      let str = false;
      if (
        this.receivedProducts[this.productIndex].potentialPromotions[0] &&
        this.receivedProducts[this.productIndex].potentialPromotions[0]
          .maxUseText
      ) {
        str = this.receivedProducts[this.productIndex].potentialPromotions[0]
          .maxUseText;
      }

      return str;
    },
    imgSrc(): string {
      return this.cloudinaryImg(
        this.receivedProducts[this.productIndex].images[0].url
      );
    },
    imgAlt(): string {
      return this.name + " " + this.price + "kr/st";
    },
    rcs(): any {
      sessionStorage.setItem(
        "rcs",
        "eF5j4cotK8lMETA0N7bUNdQ1ZClN9jAxNDFLS05O1k0xMzTRNTFNSdFNTTFMBXJNk5Is0xKNEg0tAZ_oDyg"
      ); // local env
      return sessionStorage.getItem("rcs"); //this.getCookieValue("rr_rcs");
    },
    rrSessionId(): String {
      // COOP.config.rrSessionId = "s109421930639200";
      return COOP.config.rrSessionId;
    },
    user(): String {
      // COOP.config.user = "a148649e-235a-4157-8df8-5b2aa424ea7d";
      return COOP.config.user;
    },
    storeId(): String {
      // COOP.config.coopStore = "016001";
      return COOP.config.coopStore;
    },
    cartguid(): String {
      // COOP.config.cartguid = "8050f27b-ce0b-49f8-b535-daa7f6faca1d";
      return COOP.config.cartguid;
    }
  },
  mounted: function() {
    const element = document.getElementsByClassName("example");
    // this.receivedProducts[this.productIndex].productLabels.forEach(element => {
    //   switch(element.code) {
    //     case "KRAV0U0MARK": {
    //       this.isKrav = true;
    //       break;
    //     }
    //     case "EKO_SV": {
    //       this.isEko = true;
    //       break;
    //     }
    //     case "NY": {
    //       this.isNew = true;
    //       break;
    //     }
    //     case "SVANEN": {
    //       this.isSvanen = true;
    //       break;
    //     }
    //     case "NYCKELHALET": {
    //       this.isN
    //       break;
    //     }

    //   }
    // });
  },
  methods: {
    // object.addEventListener("touchstart", myScript);
    eventListener(e: any) {
      window.console.log(e);
    },
    reach() {
      window.console.debug("reach");
      if (!this.added) {
        this.isAdding = true;
        window.console.debug("adding...");
      } else {
        this.added = false;
        this.updateCart(0);
        window.console.debug("removed");
        window.console.info(
          "%c<Rick> I see you thow the item back in the shelf. Guess you don't want it.",
          "background: #000; color: #fff; padding: 5px"
        );
      }
    },
    withdraw() {
      window.console.debug("withdraw");
      if (this.isAdding) {
        this.added = true;
        this.updateCart(1);
        window.console.debug("added");
        window.console.info(
          "%c<Adam> I can see that you are interested in a product.",
          "background: #000; color: #fff; padding: 5px"
        );
        this.isAdding = false;
      }
    },
    info(target: string) {
      return this.receivedProducts[this.productIndex][target];
    },
    isPromo() {
      let index = this.productIndex;
      if (this.receivedProducts[index].promotionPrice !== undefined) {
        return true;
      } else {
        return false;
      }
    },
    formattedPrice(str: string) {
      str = str + ' <span class="unit">kr/st</span>';
      str = str.replace(".", ":");
      return str;
    },
    // https://res.cloudinary.com/coopsverige/image/upload/387245.tiff
    //         res.cloudinary.com/coopsverige/image/upload/fl_progressive,q_90,c_lpad,g_center,h_222,w_222/352288.jpg
    // https://res.cloudinary.com/coopsverige/image/upload/d_cooponline:missingimage:missing-image.png,fl_progressive,q_90,c_lpad,w_120,h_120/q_auto,f_auto//349012.jpg
    cloudinaryImg(imageUrl: string): string {
      const imageSize = "300";
      const search = "/upload/"; //TODO
      const imgId = imageUrl
        .substr(imageUrl.indexOf(search) + search.length - 1)
        .replace(".tiff", ".jpg"); //TODO
      return (
        "https://res.cloudinary.com/coopsverige/image/upload/d_cooponline:missingimage:missing-image.png,fl_progressive,q_90,c_lpad,w_" +
        imageSize +
        ",h_" +
        imageSize +
        "/q_auto,f_auto/" +
        imgId
      );
    },
    updateCartInput(e: any) {
      let input = +e.target.value;
      window.console.debug(input);

      if (input > 0) {
        this.updateCart(input);
      } else {
        this.updateCart(0);
      }
      e.target.value = null;
    },
    updateCart(newQuantity: number) {
      if (newQuantity < 0) {
        newQuantity = 0;
      }

      window.console.debug("updateCart(", newQuantity, ")");
      window.console.debug("old qty:", this.qty);

      this.qty = newQuantity;
      window.console.debug("new qty:", this.qty);

      // const params = new URLSearchParams();
      // params.append('code', '7300156585899');
      // params.append('qty', qty);

      axios
        .post(
          `https://www.coop.se/ws/v2/coop/users/${this.user}/carts/${this.cartguid}/products`,
          `code=${this.id}&qty=${this.qty}`
        )
        .then(function(response) {
          window.console.debug(response);
        })
        .catch(function(error) {
          window.console.debug(error);
        });

      // axios.post(
      // 'https://www.coop.se/api/hybris/carts/current/items',
      // {"quantity":999,"id":"57","productId":"7300156507235","variantId":null,"total":0,"isGroceryBag":false,"row":0,"name":null,"itemReplaceable":false,"notBuyable":false,"variants":[],"packageSize":null,"packageSizeUnit":null,"packageSizeInformation":null,"image":null,"manufacturer":null,"recycleFee":null})
    }
  }
});
</script>

<style lang="less">
.splash {
  position: absolute;
  width: 64px;
  height: 47px;
  right: 0;
  margin: 0.5rem;
  img {
    position: absolute;
    left: 0;
    top: 0;
  }
  .description {
    position: absolute;
  }
}
</style>

<style lang="less" scoped>
.product-card {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  /* flex-grow: 1; */
  /* flex-shrink: 1; */
  width: 200px;
  height: 300px;
  /* flex-basis: 10rem; */
  /* min-width: 10rem; */
  /* max-width: 16rem; */
  /* border: thin solid silver; */
  border-radius: 1rem;
  overflow: hidden;
  margin: 0.5rem;
  background-color: white;
}
.labels {
  position: absolute;
  left: 0;
  top: 0.5rem;
  width: 25%;
}
.placeholder {
  margin: 1rem;
  transition: transform 0.05s linear; // slow start
  transform: scale(0.75);
}
.added .placeholder {
  transform: scale(1);
}
.placeholder img {
  display: block;
  max-width: 100%;
}
.pill {
  font-size: 0.75rem;
  font-weight: bold;
  display: inline-block;
  color: #005537;
  background-color: #aad23c;
  border-radius: 999px;
  padding: 2px 10px;
}
.price {
  font-size: 1.1rem;
  text-align: right;
  margin: 0.5rem;
}
.promotion-price {
  color: red;
  font-weight: bold;
}
.price.is-promo .formatted-value {
  /* text-decoration: line-through; */
  font-size: 0.9rem;
}
.unit {
  font-size: 0.9rem;
}
.strikeout {
  // display: none;
  position: relative;
}
.strikeout::after {
  border-bottom: 2px solid black;
  content: "";
  left: 0;
  line-height: 1em;
  /* margin-top: calc(0.125em / 2 * -1); */
  position: absolute;
  right: 0;
  top: 50%;
}
.gear {
  position: absolute;
  width: 100%;
  bottom: 0;
  margin-bottom: 0.25rem;
}
.add-to-cart {
  input {
    text-align: center;
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>
