<template>
  <div class="card" :data-clickurl="p.clickUrl">
    <div class="product-labels">
      <div v-for="label in p.productLabels" :key="label.code">
        <img :src="label.icon" />
      </div>
    </div>
    <div class="product-image">
      <a :href="url" :title="p.name"
        ><img
          width="200"
          height="200"
          :src="imgSrc"
          :alt="p.name"
          loading="lazy"
      /></a>
    </div>

    <Splash v-if="promo" :description="promo.description" />

    <div class="product-name">
      {{ p.name }}
    </div>

    <div class="product-summary">
      <img
        v-if="p.fromSweden"
        class="flag"
        src="https://www.coop.se/assets/icons/flag-sweden.svg"
        alt="Sverige"
        width="16"
        height="10"
      />
      <span class="manufacturer">{{ p.manufacturer }}.</span>
      {{ p.packageSizeInformation }}. Jmf-pris
      {{ p.comparisonPrice.formattedValue }}.
      <span v-if="p.depositPrice && p.depositPrice.value" class="deposit"
        >Pant {{ p.depositPrice.formattedValue }}</span
      >
    </div>

    <div
      v-for="object in p.consumerInformationText"
      :key="object"
      class="consumer-info"
    >
      {{ object }}
    </div>

    <div class="pricing" :data-product="id">
      <div v-if="promo && promo.medmera" class="members-only">
        Medlemspris
      </div>

      <div v-if="promo && promo.maxUseText" class="max-use">
        {{ promo.maxUseText }}
      </div>

      <div class="product-price" :class="{ 'is-promo': p.promotionPrice }">
        <div v-if="p.promotionPrice" class="promo-price">
          {{ p.promotionPrice.formattedValue }}<span class="unit">/st</span>
        </div>
        <div class="pick-price">
          {{ p.price.formattedValue }}<span class="unit">/st</span>
        </div>
      </div>

      <div class="action">
        <div
          class="add-to-cart m-cart-addition qty-selector js-qty-selector"
          :class="{ 'has-value': initQty > 0 }"
          :data-product="id"
          :data-category-lvl-1="p.categories[0].code"
          :data-category-lvl-3="p.categories[2].code"
        >
          <button
            class="remove js-qty-selector-minus"
            :disabled="initQty === 0"
            aria-label="Minska antalet"
          ></button>
          <input
            class="js-qty-selector-input"
            type="number"
            :value="initQty"
            min="0"
            max="999"
            data-max="999"
          />
          <button
            class="add js-qty-selector-plus"
            aria-label="Öka antalet"
          ></button>
          <button
            class="buy-mobile js-qty-selector-plus"
            aria-label="Lägg till i varukorgen"
          >
            Köp
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

import chat from "@/plugins/chat";

import Splash from "@/components/Splash.vue";

export default Vue.extend({
  components: {
    Splash
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    initQty(): number {
      let index = this.$store.state.cart.entries.findIndex(
        (entry: any) => entry.product.code === this.id
      );

      if (index > -1) {
        chat(
          "a",
          `Du har redan lagt ${this.p.name} i varukorgen, men vi visar den igen.`
        );

        return this.$store.state.cart.entries[index].quantity;
      } else {
        return 0;
      }
    },
    productIndex(): string {
      return this.$store.state.products.findIndex(
        (p: any) => p.code === this.id
      );
    },
    p(): any {
      return this.$store.state.products[this.productIndex];
    },
    promo(): any {
      if (this.p.potentialPromotions) {
        return this.p.potentialPromotions[0];
      } else {
        return false;
      }
    },
    url(): string {
      return "https://coop.se" + this.p.url;
    },
    imgSrc(): string {
      return this.cloudinaryImg(this.p.images[0].url);
    }
  },
  methods: {
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
  padding: 10px
  color: #333

  @media (min-width: 425px)
    min-width: 150px
    flex-basis: 150px
    padding: 15px

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
    position: absolute
    top: 10px
    right: 10px
    font-family: CoopNew, "Coop New", Helvetica, Arial, sans-serif;
    padding-top: 5px; // adjustment to CoopNew font

  .product-name
    font-size: 16px
    margin-bottom: 7px

  .product-summary
    font-size: 12px
    margin-bottom: 15px

  .flag
    margin-right: 0.25em

  .manufacturer
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

    .buy-mobile
      width: 100%
      height: 34px
      justify-content: center
      align-items: center
      background-color: #00aa46
      border: 0
      outline: 0
      border-radius: 17px
      cursor: pointer
      text-align: center
      font-size: 16px
      color: white

    .add, .remove
      display: none
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
      border: none;
      background-color: #001b11;

    input
      display: none
      width: 34px
      height: 32px
      flex-grow: 1
      text-align: center
      font-size: 16px
      color: white
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

    .is-delayed .remove
      cursor: wait!important

    @media (min-width: 425px)

      .add, .remove
        display: flex

      input
        display: block

      .buy-mobile
        display: none

    &.has-value
      background-color: #f5f5f5
      color: #00aa46

      .buy-mobile
        display: none

      .add
        display: flex
        background-color: white
        background-image: url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjAiIHk9IjAiIHZpZXdCb3g9IjAgMCAxMSAxMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlPi5zdDB7ZmlsbDpub25lO3N0cm9rZTojMDBhYTQ2O3N0cm9rZS1taXRlcmxpbWl0OjEwfTwvc3R5bGU+PGcgaWQ9IktvbXBvbmVudGJpYmxpb3RlayI+PGcgaWQ9Il94NUJfS8OWUEtOQVBQX3g1RF8tX3gyRl8tU8O2ay1Db3B5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTUgLTE0KSI+PGcgaWQ9Il94NUJfSUtPTl94NURfLV94MkJfIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNSAxNCkiPjxwYXRoIGlkPSJMaW5lLTYiIGNsYXNzPSJzdDAiIGQ9Ik01LjUuNXYxMCIvPjxwYXRoIGlkPSJMaW5lLTZfMV8iIGNsYXNzPSJzdDAiIGQ9Ik0xMC41IDUuNUguNSIvPjwvZz48L2c+PC9nPjwvc3ZnPg==')

      .remove
        display: flex
        background-color: white
        background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHBhdGggZD0iTTE5IDkuNUgxIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMGFhNDYiLz48L3N2Zz4=')

      input
        display: block
        color: #00aa46

  input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button
    -webkit-appearance: none
    margin: 0
</style>
