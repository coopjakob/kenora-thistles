import Vue from "vue";
import Vuex from "vuex";

// import uniqBy from "lodash.uniqby";
var uniqBy = require("lodash.uniqby");

export default new Vuex.Store({
  state: {
    cart: [] as any,
    products: [] as any
  },
  mutations: {
    cart(state, payload) {
      state.cart = payload;
    },
    products(state, payload) {
      state.products = payload;
    },
    addProducts(state, payload) {
      const oldData = state.products;
      const newData = [...payload, ...oldData];
      state.products = uniqBy(newData, "code");
    }
  },
  actions: {},
  modules: {}
});
