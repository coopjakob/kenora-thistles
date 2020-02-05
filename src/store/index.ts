import Vue from "vue";
import Vuex from "vuex";

export default new Vuex.Store({
  //
  // const store = new Vuex.Store({
  state: {
    config: {
      // Dev
      rrSessionId: "s109421930639200",
      user: "a148649e-235a-4157-8df8-5b2aa424ea7d",
      coopStore: "016001",
      cartguid: "8050f27b-ce0b-49f8-b535-daa7f6faca1d"
    },
    minicart: {
      cartData: {
        items: [
          {
            size: 0.0,
            image:
              "https://res.cloudinary.com/coopsverige/image/upload/391667.tiff",
            packageSize: "200",
            packageSizeUnit: "G",
            packageSizeInformation: "200 g",
            purchasable: false,
            manufacturer: "Änglamark",
            url: "/handla/varor/ost/matost/halloumi/halloumi-eko-7300156585899",
            id: "0",
            productId: "7300156585899",
            productIdentifier: "7300156585899",
            quantity: 1,
            total: 33.95,
            price: 33.95,
            row: 0,
            isGroceryBag: false,
            name: "Halloumi Eko",
            itemReplaceable: false,
            recycleFee: 0.0,
            variants: []
          },
          {
            size: 0.0,
            image:
              "https://res.cloudinary.com/coopsverige/image/upload/320473.tiff",
            packageSize: "14",
            packageSizeUnit: "ST",
            packageSizeInformation: "14 H87",
            purchasable: false,
            manufacturer: "Coop",
            url:
              "/handla/varor/skonhet-hygien/intimhygien/bindor/bindor-normal-ultratunn-7340011450436",
            id: "1",
            productId: "7340011450436",
            productIdentifier: "7340011450436",
            quantity: 1,
            total: 15.5,
            price: 15.5,
            row: 0,
            isGroceryBag: false,
            name: "Bindor Normal Ultratunn",
            itemReplaceable: false,
            recycleFee: 0.0,
            variants: []
          },
          {
            size: 0.0,
            image:
              "https://res.cloudinary.com/coopsverige/image/upload/50204.tiff",
            packageSize: "130",
            packageSizeUnit: "",
            packageSizeInformation: "210 gram ungefärlig vikt",
            purchasable: false,
            manufacturer: "Kl 1. Turkiet",
            url:
              "/handla/varor/frukt-gronsaker/frukt/citrusfrukt/citron-7300170029584",
            id: "2",
            productId: "7300170029584",
            productIdentifier: "7300170029584",
            quantity: 1,
            total: 8.95,
            price: 8.95,
            row: 0,
            isGroceryBag: false,
            name: "Citron ",
            itemReplaceable: false,
            recycleFee: 0.0,
            variants: []
          },
          {
            size: 0.0,
            image:
              "https://res.cloudinary.com/coopsverige/image/upload/155895.tiff",
            packageSize: "230",
            packageSizeUnit: "G",
            packageSizeInformation: "230 g",
            purchasable: false,
            manufacturer: "Santa Maria",
            url:
              "/handla/varor/varldens-mat/tex-mex/tacosas/taco-sauce-medium-7311312002112",
            id: "3",
            productId: "7311312002112",
            productIdentifier: "7311312002112",
            quantity: 1,
            total: 13.95,
            price: 13.95,
            row: 0,
            isGroceryBag: false,
            name: "Taco Sauce Medium",
            itemReplaceable: false,
            recycleFee: 0.0,
            variants: []
          },
          {
            size: 0.0,
            image:
              "https://res.cloudinary.com/coopsverige/image/upload/81710.tiff",
            packageSize: "1",
            packageSizeUnit: "KG",
            packageSizeInformation: "1000 gram ungefärlig vikt",
            purchasable: false,
            manufacturer: "Kl. 1 Sverige",
            url:
              "/handla/varor/frukt-gronsaker/rotfrukter-svamp/morotter/morotter-7393419210027",
            id: "4",
            productId: "7393419210027",
            productIdentifier: "7393419210027",
            quantity: 1,
            total: 17.95,
            price: 17.95,
            row: 0,
            isGroceryBag: false,
            name: "Morötter",
            itemReplaceable: false,
            recycleFee: 0.0,
            variants: []
          },
          {
            size: 0.0,
            image:
              "https://res.cloudinary.com/coopsverige/image/upload/365229.tiff",
            packageSize: "33",
            packageSizeUnit: "CL",
            packageSizeInformation: "330 ml",
            purchasable: false,
            manufacturer: "Sofiero",
            url:
              "/handla/varor/dryck/ol-cider-vin/alkoholfritt/alkoholfri-ol-original-sofiero-7393714201607",
            id: "5",
            productId: "7393714201607",
            productIdentifier: "7393714201607",
            quantity: 500,
            total: 5975.0,
            price: 11.95,
            row: 0,
            isGroceryBag: false,
            name: "Alkoholfri Öl Original Sofiero",
            itemReplaceable: false,
            recycleFee: 0.0,
            variants: []
          },
          {
            size: 0.0,
            image:
              "https://res.cloudinary.com/coopsverige/image/upload/380703.tiff",
            packageSize: "1000",
            packageSizeUnit: "ML",
            packageSizeInformation: "1L",
            purchasable: false,
            manufacturer: "Oatly",
            url:
              "/handla/varor/mejeri-agg/bak-matlagning/laglaktos-laktosfritt/ikaffe-7394376616037",
            id: "6",
            productId: "7394376616037",
            productIdentifier: "7394376616037",
            quantity: 1,
            total: 17.95,
            price: 17.95,
            row: 0,
            isGroceryBag: false,
            name: "IKaffe",
            itemReplaceable: false,
            recycleFee: 0.0,
            variants: []
          },
          {
            size: 0.0,
            image:
              "https://res.cloudinary.com/coopsverige/image/upload/375947.tiff",
            packageSize: "900",
            packageSizeUnit: "G",
            packageSizeInformation: "900g",
            purchasable: false,
            manufacturer: "Pågen",
            url:
              "/handla/varor/brod-bageri/brod/ljust/pagenlimpa-7311070338188",
            id: "7",
            productId: "7311070338188",
            productIdentifier: "7311070338188",
            quantity: 1,
            total: 27.95,
            price: 27.95,
            row: 0,
            isGroceryBag: false,
            name: "Pågenlimpa",
            itemReplaceable: false,
            recycleFee: 0.0,
            variants: []
          },
          {
            size: 0.0,
            image:
              "https://res.cloudinary.com/coopsverige/image/upload/303124.tiff",
            packageSize: "150",
            packageSizeUnit: "G",
            packageSizeInformation: "150 g",
            purchasable: false,
            manufacturer: "Zeta",
            url:
              "/handla/varor/ost/matost/fetaost-salladsost/feta-23-7350002402658",
            id: "8",
            productId: "7350002402658",
            productIdentifier: "7350002402658",
            quantity: 777,
            total: 15501.15,
            price: 19.95,
            row: 0,
            isGroceryBag: false,
            name: "FETA 23 %",
            itemReplaceable: false,
            recycleFee: 0.0,
            variants: []
          },
          {
            size: 0.0,
            image:
              "https://res.cloudinary.com/coopsverige/image/upload/355901.tiff",
            packageSize: "390",
            packageSizeUnit: "G",
            packageSizeInformation: "390 GRM",
            purchasable: false,
            manufacturer: "Änglamark",
            url:
              "/handla/varor/skafferi/konserv-burk/tomat/tomater-passerade-krav-7340011492023",
            id: "9",
            productId: "7340011492023",
            productIdentifier: "7340011492023",
            quantity: 1,
            total: 11.95,
            price: 11.95,
            row: 0,
            isGroceryBag: false,
            name: "Tomater Passerade Krav",
            itemReplaceable: false,
            recycleFee: 0.0,
            variants: []
          },
          {
            size: 0.0,
            image:
              "https://res.cloudinary.com/coopsverige/image/upload/390165.tiff",
            packageSize: "800",
            packageSizeUnit: "G",
            packageSizeInformation: "800 gram/st ungefärlig vikt",
            purchasable: false,
            manufacturer: "Coop",
            url:
              "/handla/varor/frukt-gronsaker/gronsaker/ovriga-gronsaker/broccoli-7340011443070",
            id: "10",
            productId: "7340011443070",
            productIdentifier: "7340011443070",
            quantity: 1,
            total: 23.95,
            price: 23.95,
            row: 0,
            isGroceryBag: false,
            name: "Broccoli ",
            itemReplaceable: false,
            recycleFee: 0.0,
            variants: []
          },
          {
            size: 0.0,
            image:
              "https://res.cloudinary.com/coopsverige/image/upload/308577.tiff",
            packageSize: "500",
            packageSizeUnit: "G",
            packageSizeInformation: "500 GR",
            purchasable: false,
            manufacturer: "Coop",
            url:
              "/handla/varor/skafferi/pasta/ovrig-vit-pasta/pasta-gnocchi-7340011443704",
            id: "11",
            productId: "7340011443704",
            productIdentifier: "7340011443704",
            quantity: 1,
            total: 8.5,
            price: 8.5,
            row: 0,
            isGroceryBag: false,
            name: "Pasta Gnocchi",
            itemReplaceable: false,
            recycleFee: 0.0,
            variants: []
          },
          {
            size: 0.0,
            image:
              "https://res.cloudinary.com/coopsverige/image/upload/354068.tiff",
            packageSize: "33",
            packageSizeUnit: "CL",
            packageSizeInformation: "33cl",
            purchasable: false,
            manufacturer: "Carlsberg",
            url:
              "/handla/varor/dryck/ol-cider-vin/alkoholfritt/alkoholfritt-ol-eko-0-5-7310070002396",
            id: "12",
            productId: "7310070002396",
            productIdentifier: "7310070002396",
            quantity: 1,
            total: 9.5,
            price: 9.5,
            row: 0,
            isGroceryBag: false,
            name: "Alkoholfritt Öl Eko 0.5%",
            itemReplaceable: false,
            recycleFee: 0.0,
            variants: []
          }
        ],
        promos: [],
        cartData: {
          cartId: "4cee9b50-e39c-4740-a8f9-514af92c9e01",
          quantity: 1288,
          total: 21666.25,
          productSum: 0.0,
          reservationSum: 0.0,
          tax: 0.0,
          leftToCheckout: 0.0,
          totalDiscount: 0.0,
          deliveryFee: 0.0,
          inCredit: 0.0,
          paymentFee: 0.0,
          isHybris: true
        },
        recipes: []
      }
    },
    products: {}
  },
  mutations: {},
  actions: {},
  modules: {}
});
