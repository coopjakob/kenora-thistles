<template>
  <div class="product-card">
    <div class="placeholder">
      <img :src="imgSrc()" :title="imgAlt" :alt="imgAlt" />
    </div>
    <div class="price">{{ price }} <span class="unit">kr/st</span></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    // price: String,
    id: String
  },
  data() {
    return {
      // imgSrc: "img/304493.webp",
      imgSrc: this.cloudinaryImg,
      // imgAlt: "Rostad lök, 28:95 kr/st",
      // price: "28:95"
      productIndex: this.$receivedProducts.findIndex(receivedProducts => {
        return receivedProducts.code == this.id;
      })
    };
  },
  computed: {
    name: function() {
      return this.$receivedProducts[this.productIndex].name;
    },
    imgOrgScr: function() {
      return this.$receivedProducts[this.productIndex].images[0].url;
    },
    price: function() {
      return this.$receivedProducts[this.productIndex].price.formattedValue;
    },
    imgAlt: function() {
      return this.name + " " + this.price + "kr/st";
    }
  },
  methods: {
    // https://res.cloudinary.com/coopsverige/image/upload/387245.tiff
    //         res.cloudinary.com/coopsverige/image/upload/fl_progressive,q_90,c_lpad,g_center,h_222,w_222/352288.jpg
    // https://res.cloudinary.com/coopsverige/image/upload/d_cooponline:missingimage:missing-image.png,fl_progressive,q_90,c_lpad,w_120,h_120/q_auto,f_auto//349012.jpg
    cloudinaryImg: function() {
      const imageUrl = this.imgOrgScr;
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

<style scoped>
.product-card {
  flex-grow: 1;
  flex-shrink: 1;
  /* flex-basis: 10rem; */
  min-width: 10rem;
  max-width: 16rem;
  /* border: thin solid silver; */
  border-radius: 1rem;
  overflow: hidden;
  margin: 0.5rem;
  background-color: white;
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
