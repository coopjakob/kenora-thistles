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
        <div class="price-start">{{ splash.price }}</div>
        <div class="price-end">
          <span class="unit">{{ splash.unit }}</span>
          <span v-if="splash.decimal" class="decimal">{{
            splash.decimal
          }}</span>
        </div>
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

    <div v-for="theInfo in consumerInfo" :key="theInfo" class="consumer-info">
      {{ theInfo }}
    </div>

    <div
      class="pricing"
      :data-product="id"
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
        >
          <span>Lägg till</span>
        </div>
        <div
          class="add-to-cart m-cart-addition qty-selector js-qty-selector"
          :data-product="id"
          data-category-lvl-1="0"
          data-category-lvl-3="0"
        >
          <button
            class="remove js-qty-selector-minus"
            aria-label="Minska antalet"
          ></button>
          <input
            class="js-qty-selector-input"
            type="number"
            min="0"
            max="999"
            data-max="999"
          />
          <button
            class="add js-qty-selector-plus"
            aria-label="Öka antalet"
          ></button>
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

export default Vue.extend({
  props: {
    id: {
      type: String,
      // default: "0",
      required: true
    }
  },
  data() {
    // COOP = this.$store.state;
    return {
      added: false,
      isAdding: false,
      receivedProducts: Vue.prototype.$receivedProducts,
      savedQuantity: 0 as number
    };
  },
  computed: {
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
      // const regex = /(?<label>\d+ för )*(?<price>\d+):(?<decimal>[-\d]+) *\/*(?<unit>.*)/g; // problem with 10:- /kg
      const regex = /(?<label>\d+ för )*(?<price>\d+):-?(?<decimal>[\d]+)? *\/*(?<unit>.*)/g; // will return empty decimal if :-

      // https://regex101.com/

      parts = regex.exec(
        this.receivedProducts[this.productIndex].potentialPromotions[0]
          .description
      );

      if (!parts) {
        window.console.error("Kan inte lista ut erbjudandet i splash");
        return false;
      }

      let label = parts.groups.label;
      let price = parts.groups.price;
      let decimal = parts.groups.decimal;
      let unit = parts.groups.unit;

      if (unit == "st" && !decimal) {
        unit = null;
      }

      if (unit == "kg" && !decimal) {
        label = "1 " + unit;
        unit = null;
      }

      if (!unit && !decimal) {
        price = price + ":-";
      }

      if (unit) {
        unit = "/" + unit;
      }

      return { label, price, decimal, unit };
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
    }
  },
  mounted: function() {},
  methods: {
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
    align-items: center
    width: 64px
    height: 47px
    position: absolute
    top: 10px
    right: 10px
    font-family: CoopNew, "Helvetica Neue", Helvetica, Arial, sans-serif;
    text-align: center
    font-size: 22px
    line-height: normal
    color: rgb(255, 51, 0)
    background-image: url('https://res.cloudinary.com/coopsverige/image/upload/v1569329381/cooponline/SVGs/pricesplash.svg')
    background-size: contain

    .promo-text
      font-size: 10px
      line-height: 1em
      text-align: center
      margin-bottom: -2px

    .price
      display: inline-block
      align-self: flex-start
      position: relative
      margin: 0 auto

    .price-start
      display: inline-block

    .price-end
      display: inline-block
      position: relative
      font-size: 22px
      text-align: left

    .decimal
      position: absolute
      top: 3px
      left: 0
      font-size: 10px

    .unit
      font-size: 9px

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
    margin-right: 0.25em
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

  .add-to-cart
    display: flex
    height: 40px
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
    border-radius: 20px
    background-color: #00aa46
    color: white

    button:disabled
      background-color: rgba(0,85,55,.3)
    .add, .remove
      display: flex
      width: 34px
      height: 34px
      background-color: #005537
      background-repeat: no-repeat
      background-position: center
      background-size: 10px 10px
      justify-content: center
      align-items: center
      border: 0
      outline: 0
      border-radius: 50%
      cursor: pointer

    .add
      background-image: url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjAiIHk9IjAiIHZpZXdCb3g9IjAgMCAxMSAxMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlPi5zdDB7ZmlsbDpub25lO3N0cm9rZTojZmZmO3N0cm9rZS1taXRlcmxpbWl0OjEwfTwvc3R5bGU+PGcgaWQ9IktvbXBvbmVudGJpYmxpb3RlayI+PGcgaWQ9Il94NUJfS8OWUEtOQVBQX3g1RF8tX3gyRl8tU8O2ay1Db3B5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTUgLTE0KSI+PGcgaWQ9Il94NUJfSUtPTl94NURfLV94MkJfIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNSAxNCkiPjxwYXRoIGlkPSJMaW5lLTYiIGNsYXNzPSJzdDAiIGQ9Ik01LjUuNXYxMCIvPjxwYXRoIGlkPSJMaW5lLTZfMV8iIGNsYXNzPSJzdDAiIGQ9Ik0xMC41IDUuNUguNSIvPjwvZz48L2c+PC9nPjwvc3ZnPg==')

    .remove
      background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHBhdGggZD0iTTE5IDkuNUgxIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiLz48L3N2Zz4=')

    .add:focus, .remove:focus
      border: 1px solid white

    input
      width: 34px
      height: 32px
      flex-grow: 1
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

  .is-delayed button
    cursor: wait!important

  .qty-selector.has-value, .qty-selector.vue-has-value
    background-color: #f5f5f5
    color: #00aa46

    .add
      background-color: white
      background-image: url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjAiIHk9IjAiIHZpZXdCb3g9IjAgMCAxMSAxMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlPi5zdDB7ZmlsbDpub25lO3N0cm9rZTojMDBhYTQ2O3N0cm9rZS1taXRlcmxpbWl0OjEwfTwvc3R5bGU+PGcgaWQ9IktvbXBvbmVudGJpYmxpb3RlayI+PGcgaWQ9Il94NUJfS8OWUEtOQVBQX3g1RF8tX3gyRl8tU8O2ay1Db3B5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTUgLTE0KSI+PGcgaWQ9Il94NUJfSUtPTl94NURfLV94MkJfIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNSAxNCkiPjxwYXRoIGlkPSJMaW5lLTYiIGNsYXNzPSJzdDAiIGQ9Ik01LjUuNXYxMCIvPjxwYXRoIGlkPSJMaW5lLTZfMV8iIGNsYXNzPSJzdDAiIGQ9Ik0xMC41IDUuNUguNSIvPjwvZz48L2c+PC9nPjwvc3ZnPg==')

    .remove
      background-color: white
      background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHBhdGggZD0iTTE5IDkuNUgxIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMGFhNDYiLz48L3N2Zz4=')

  input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button
    -webkit-appearance: none
    margin: 0
</style>
