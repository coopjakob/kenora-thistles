<template>
  <div class="product-matrix">
    <ProductCard price="11" />
    <ProductCard price="22" />
    <ProductCard price="33" />
    <ProductCard price="44" />
    <ProductCard price="55" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ProductCard from "@/components/ProductCard.vue";

export default Vue.extend({
  components: {
    ProductCard
  }
});
</script>

<style lang="scss" scoped>
.product-matrix {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
}
.product-matrix::after {
  content: "";
  flex: auto;
}
</style>
