<template>
  <div class="home">
    <ProductMatrix />
    <HelloWorld msg="Hello world string!" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import ProductMatrix from "@/components/ProductMatrix.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    ProductMatrix
  }
};
</script>
