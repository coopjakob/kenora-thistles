<template>
  <div class="card">
    <div class="product-labels">
      <div
        v-for="label in receivedProducts[productIndex].productLabels"
        :key="label.code"
      >
        <img :src="label.icon" />
      </div>
    </div>
    <div class="product-image">
      <a :href="url" :title="imgAlt"
        ><img width="200" height="200" :src="imgSrc" :alt="imgAlt"
      /></a>
    </div>

    <div v-if="splash" class="splash">
      <div v-if="splash.label" class="promo-text">{{ splash.label }}</div>
      <div class="price">
        {{ splash.price }}<span class="unit">{{ splash.unit }}</span>
        <span v-if="splash.decimal" class="decimal">{{ splash.decimal }}</span>
      </div>
    </div>

    <div class="product-name">
      {{ name }}
    </div>

    <div class="product-summary">
      <img
        v-if="isSweden"
        class="flag"
        src="https://www.coop.se/assets/icons/flag-sweden.svg"
        alt="Sverige"
        width="16"
        height="10"
      />
      <span class="brand">{{ brand }}.</span> {{ packageSizeInformation }}.
      Jmf-pris {{ comparisonPrice }}.
      <span
        v-if="receivedProducts[productIndex].depositPrice.value"
        class="deposit"
        >Pant {{ deposit }}</span
      >
    </div>

    <div
      v-for="(theInfo, index) in consumerInfo"
      :key="index"
      class="consumer-info"
    >
      {{ theInfo }}
    </div>

    <div
      class="pricing"
      :data-product="this.id"
      data-category-lvl-1="0"
      data-category-lvl-3="0"
    >
      <div v-if="isMedmera" class="members-only">
        Medlemspris
      </div>

      <div v-if="maxUseText" class="max-use">
        {{ maxUseText }}
      </div>

      <div class="product-price" :class="{ 'is-promo': promoPrice }">
        <div v-if="promoPrice" class="promo-price">
          {{ promoPrice }}<span class="unit">/st</span>
        </div>
        <div class="pick-price">{{ price }}<span class="unit">/st</span></div>
      </div>

      <div class="action">
        <div
          v-if="qty === 0"
          class="add-to-cart js-qty-selector-plus"
          tabindex="0"
          role="button"
          aria-pressed="false"
          @click="updateCart(1)"
        >
          <span>Lägg till</span>
        </div>
        <div v-else class="add-to-cart qty-selector js-qty-selector">
          <button
            class="add js-qty-selector-minus"
            aria-label="Minska antalet"
            @click="updateCart(qty - 1)"
          >
            <img
              width="11"
              src="https://www.coop.se/Assets/Icons/sprite/minus-white.svg?version=@{cache-version}"
            />
          </button>
          <input
            class="js-qty-selector-input"
            type="number"
            min="0"
            max="999"
            data-max="999"
            :placeholder="qty"
            @keydown.enter="updateCartInput"
          />
          <button
            class="remove js-qty-selector-plus"
            aria-label="Öka antalet"
            @click="updateCart(qty + 1)"
          >
            <img
              width="11"
              src="https://www.coop.se/Assets/Icons/sprite/plus-white.svg?version=@{cache-version}"
            />
          </button>
        </div>
      </div>
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

        let returnValue = this.savedQuantity as number;
        // return 0;
        // Dev, if not in cart
        return returnValue;
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
    url(): string {
      return "https://coop.se" + this.receivedProducts[this.productIndex].url;
    },
    name(): string {
      return this.receivedProducts[this.productIndex].name;
    },
    brand(): string {
      return this.receivedProducts[this.productIndex].manufacturer;
    },
    packageSizeInformation(): string {
      return this.receivedProducts[this.productIndex].packageSizeInformation;
    },
    comparisonPrice(): string {
      return this.receivedProducts[this.productIndex].comparisonPrice
        .formattedValue;
    },
    deposit(): string {
      return this.receivedProducts[this.productIndex].depositPrice
        .formattedValue;
    },
    consumerInfo(): string {
      return this.receivedProducts[this.productIndex].consumerInformationText;
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
    splash(): any {
      if (!this.receivedProducts[this.productIndex].potentialPromotions[0]) {
        return false;
      }

      let parts: any;
      const regex = /(?<label>\d+ för )*(?<price>\d+):(?<decimal>[-\d]+) *\/*(?<unit>.*)/g;
      // https://regex101.com/

      parts = regex.exec(
        this.receivedProducts[this.productIndex].potentialPromotions[0]
          .description
      );

      if (!parts) {
        window.console.error("Kan inte lista ut erbjudandet i splash");
        return false;
      }

      let label = parts[1];
      let price = parts[2];
      let decimal = parts[3];
      let unit = parts[4];

      if (unit == "st" && decimal == "-") {
        price = price + ":-";
        decimal = "";
        unit = "";
      }

      if (unit == "" && decimal == "-") {
        price = price + ":-";
        decimal = "";
      }

      if (unit != "") {
        unit = "/" + unit;
      }

      return { label, price, decimal, unit };
    },
    splashText(): any {
      if (this.receivedProducts[this.productIndex].potentialPromotions[0]) {
        let promoText: any;
        const regex = /(\d{1,} för) \d{1,}/g;

        promoText = regex.exec(
          this.receivedProducts[this.productIndex].potentialPromotions[0]
            .description
        );
        if (promoText) {
          return promoText[1];
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    splashTextPrice(): any {
      if (this.receivedProducts[this.productIndex].potentialPromotions[0]) {
        let promoText: any;
        const regex = /\d{1,} för (\d{1,}.+)/g;

        promoText = regex.exec(
          this.receivedProducts[this.productIndex].potentialPromotions[0]
            .description
        );
        if (promoText) {
          return promoText[1];
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    splashPrice(): any {
      if (this.receivedProducts[this.productIndex].potentialPromotions[0]) {
        let promoText: any;
        const regex = /(\d+)(.+) \/(.+)/g;

        promoText = regex.exec(
          this.receivedProducts[this.productIndex].potentialPromotions[0]
            .description
        );

        if (promoText) {
          if (promoText[3] === "st") {
            return promoText[1] + promoText[2];
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    splashDecimal(): any {
      if (this.receivedProducts[this.productIndex].potentialPromotions[0]) {
        let promoText: any;
        const regex = /\d+ för \d+(.+)/g;

        promoText = regex.exec(
          this.receivedProducts[this.productIndex].potentialPromotions[0]
            .description
        );
        return promoText[1];
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
      //price = price.replace(":-", "");
      return price;
    },
    promoPrice(): any {
      const index = this.productIndex;
      if (this.isPromo()) {
        let price = this.receivedProducts[index].promotionPrice.formattedValue;
        //price = price.replace(":-", "");
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
      if (this.receivedProducts[index].promotionPrice) {
        window.console.log(
          "This was a promo: " + this.receivedProducts[index].name
        );
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

      // axios
      //   .post(
      //     `https://www.coop.se/ws/v2/coop/users/${this.user}/carts/${this.cartguid}/products`,
      //     `code=${this.id}&qty=${this.qty}`
      //   )
      //   .then(function(response) {
      //     window.console.debug(response);
      //   })
      //   .catch(function(error) {
      //     window.console.debug(error);
      //   });

      // axios.post(
      // 'https://www.coop.se/api/hybris/carts/current/items',
      // {"quantity":999,"id":"57","productId":"7300156507235","variantId":null,"total":0,"isGroceryBag":false,"row":0,"name":null,"itemReplaceable":false,"notBuyable":false,"variants":[],"packageSize":null,"packageSizeUnit":null,"packageSizeInformation":null,"image":null,"manufacturer":null,"recycleFee":null})
    }
  }
});
</script>

<style lang="sass" scoped>
.card
  display: flex
  flex-direction: column
  position: relative
  // box-sizing: border-box;
  min-width: 115px
  max-width: 200px
  flex-basis: 115px
  flex-grow: 1
  margin: 1px
  background-color: white
  padding: 15px
  color: #333

  .pricing
    flex-grow: 1
    display: flex
    flex-direction: column
    justify-content: flex-end

  .product-labels
    position: absolute
    top: 10px
    left: 10px
    width: 30px

    img
      width: 100%

  .product-image
    width: 100%
    margin-bottom: 10px

    img
      width: 100%
      height: auto

  .splash
    display: flex
    flex-direction: column
    justify-content: center
    width: 64px
    height: 47px
    position: absolute
    top: 10px
    right: 10px
    font-family: 'Coop New', 'CoopNew-Black', sans-serif
    text-align: center
    font-size: 22px
    color: rgb(255, 51, 0)
    background-image: url('https://res.cloudinary.com/coopsverige/image/upload/v1569329381/cooponline/SVGs/pricesplash.svg')
    background-size: contain

    .promo-text
      font-size: 10px
      text-align: center
      margin-bottom: -5px

    .price
      display: inline-block
      align-self: flex-start
      position: relative
      margin: 0 auto

    .decimal
      position: absolute
      top: 2px
      right: 3px
      font-size: 10px

    .unit
      font-size: 10px

  .product-name
    font-size: 16px
    margin-bottom: 7px

  .product-summary
    font-size: 12px
    margin-bottom: 15px

  .flag
    margin-right: 0.25em
  .brand
    font-weight: bold

  .members-only
    margin-bottom: 10px
    align-self: flex-start

    font-size: 12px
    font-weight: bold
    display: inline-block
    color: rgb(0, 85, 55)
    background-color: rgb(170, 210, 60)
    border-radius: 999px
    padding: 2px 10px

  .consumer-info
    font-size: 14px
    color: rgb(170, 170, 170)
    margin-bottom: 10px

  .deposit
    font-size: 12px
    color: rgb(153, 153, 153)
    font-style: italic
    white-space: nowrap

  .max-use
    font-size: 12px
    color: rgb(255, 51, 0)

  .product-price
    font-size: 20px
    margin-bottom: 10px

  .promo-price
    display: inline-block
    margin-right: 0.25em;
    color: rgb(255, 51, 0)

  .pick-price
    display: inline-block

  .is-promo .pick-price
    font-size: 12px
    color: rgb(74, 74, 74)
    text-decoration-line: line-through

  .is-promo .unit
    font-size: 14px

  .is-promo .pick-price .unit
    font-size: inherit

  .pick-price .unit
    font-size: 14px

  .action
    display: flex
    justify-content: center
    align-items: stretch

    width: 100%
    height: 40px
    border-radius: 20px
    background-color: #00aa46

  .add-to-cart
    display: flex
    justify-content: center
    align-items: center
    flex-grow: 1
    color: white
    cursor: pointer

  .qty-selector
    display: flex
    justify-content: space-between
    flex-grow: 1
    padding: 3px

    .add, .remove
      display: flex
      width: 34px
      height: 34px
      justify-content: center
      align-items: center
      border: 0
      outline: 0
      border-radius: 50%
      cursor: pointer

    .add:focus, .remove:focus
      border: 1px solid white

    .add
      background-color: rgba(0,85,55,.3)

    .remove
      background-color: #005537

    input
      width: 34px
      height: 32px
      flex-grow: 1
      color: white
      text-align: center
      font-size: 16px
      background: transparent
      border: none
      outline: none

      &::placeholder  /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: white
        opacity: 1 /* Firefox */

      &:-ms-input-placeholder /* Internet Explorer 10-11 */
        color: white

      &::-ms-input-placeholder /* Microsoft Edge */
        color: white

  input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button
    -webkit-appearance: none
    margin: 0
</style>
