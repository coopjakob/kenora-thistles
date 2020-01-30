<template>
  <div
    class="product-card"
    :class="{ added: added }"
    @mouseup="mouseUp"
    @mousedown="mouseDown"
  >
    <div class="placeholder">
      <img :src="imgSrc" :title="imgAlt" :alt="imgAlt" />
    </div>
    <div class="labels">
      <svg
        v-if="added"
        width="63"
        height="63"
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
      <img
        v-if="!added && isSweden"
        width="30"
        alt="flag-sweden"
        src="../assets/flag-sweden.svg"
      />
      <img
        v-if="!added && isKrav"
        width="30"
        alt="kravlogo"
        src="../assets/kravlogo.svg"
      />
      <img
        v-if="!added && isMSC"
        width="30"
        alt="msclogo"
        src="../assets/msclogo.svg"
      />
    </div>
    <div v-if="!added" class="price" :class="{ 'is-promo': isPromo() }">
      <span v-if="promoPrice" class="promotion-price">
        {{ promoPrice }} <span class="unit">kr/st </span>
      </span>
      <span :class="{ strikeout: isPromo() }">
        <span class="formatted-value">{{ price }}</span>
        <span class="unit"> kr/st</span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
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
    return {
      added: false,
      isAdding: false,
      isKrav: true,
      isMSC: true,
      receivedProducts: Vue.prototype.$receivedProducts
    };
  },
  computed: {
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
    imgSrc(): string {
      return this.cloudinaryImg(
        this.receivedProducts[this.productIndex].images[0].url
      );
    },
    imgAlt(): string {
      return this.name + " " + this.price + "kr/st";
    }
  },
  mounted: function() {
    const element = document.getElementsByClassName("example");
  },
  methods: {
    mouseDown() {
      if (!this.added) {
        this.isAdding = true;
        window.console.log("adding");
      } else {
        this.added = false;
      }
    },
    mouseUp() {
      if (this.isAdding) {
        this.added = true;
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
    }
  }
});
</script>

<style lang="less" scoped>
.product-card {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  /* flex-grow: 1; */
  /* flex-shrink: 1; */
  width: 13rem;
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
.labels svg {
  transform: scale(0.5);
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
  display: none;
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
</style>
