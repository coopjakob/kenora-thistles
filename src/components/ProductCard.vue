<template>
  <div class="product-card">
    <div class="placeholder">
      <img :src="imgScr" :alt="imgAlt" />
    </div>
    <div class="price">{{ price }} <span class="unit">kr/st</span></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    price: String
  },
  data() {
    return {
      imgScr: "img/304493.webp",
      imgAlt: "Rostad lök, 28:95 kr/st"
      // price: "28:95"
    };
  }
});
</script>

<style scoped>
.product-card {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 14rem;
  min-width: 14rem;
  max-width: 18rem;
  border: thin solid silver;
  border-radius: 1rem;
  overflow: hidden;
  margin: 0.5rem;
}
.placeholder {
  margin: 1rem;
}
.placeholder img {
  display: block;
  max-width: 100%;
}
.price {
  font-size: 1.1rem;
  text-align: right;
  margin: 0.5rem;
}
.unit {
  font-size: 0.9rem;
}
</style>
