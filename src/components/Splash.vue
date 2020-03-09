<template>
  <div v-if="splash" class="splash">
    <div v-if="splash.label" class="promo-text">{{ splash.label }}</div>
    <div class="price">
      <div class="price-start">{{ splash.price }}</div>
      <div class="price-end">
        <span class="unit">{{ splash.unit }}</span>
        <span v-if="splash.decimal" class="decimal">{{ splash.decimal }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    description: {
      type: String,
      default: ""
    }
  },
  computed: {
    splash(): any {
      if (this.description === "") {
        return false;
      }

      let parts: any;

      const regex = /(?<label>\d+ för)? *(?<price>\d+)[:.]-?(?<decimal>[\d]+)? *k?r?\/*(?<unit>.*)/g;
      // https://regex101.com/

      parts = regex.exec(this.description);

      if (!parts) {
        window.console.error(
          "Kan inte lista ut erbjudandet i splash:",
          this.description
        );
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
    }
  }
});
</script>

<style scoped>
.splash {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 47px;
  font-family: CoopNew, "Coop New", Helvetica, Arial, sans-serif;
  text-align: center;
  font-size: 22px;
  line-height: normal;
  color: #ff3300;
  background-image: url("https://res.cloudinary.com/coopsverige/image/upload/v1569329381/cooponline/SVGs/pricesplash.svg");
  background-size: contain;
}

.promo-text {
  font-size: 10px;
  line-height: 1em;
  text-align: center;
  margin-bottom: -2px;
}

.price {
  display: flex;
  align-self: flex-start;
  position: relative;
  margin: 0 auto;
}

.price-start {
  display: inline-block;
}

.price-end {
  display: inline-block;
  position: relative;
  font-size: 22px;
}

.decimal {
  position: absolute;
  top: 1px;
  left: 0;
  font-size: 12px;
}

.unit {
  font-size: 12px;
}
</style>
