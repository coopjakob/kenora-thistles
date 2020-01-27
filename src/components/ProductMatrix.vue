<template>
  <div class="product-matrix">
    <ProductCard id="7300156505033" />
    <ProductCard id="2317301700002" />
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
