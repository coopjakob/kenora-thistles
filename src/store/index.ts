import Vue from "vue";
import Vuex from "vuex";

export default new Vuex.Store({
  state: {
    config: {
      // Dev
      rrSessionId: "s109421930639200",
      // user: "a148649e-235a-4157-8df8-5b2aa424ea7d",
      user: "anonymous",
      coopStore: "016001",
      cartguid: "a22a9ca5-1296-4606-9309-ed366f630723",
      authToken:
        "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk3OEIzMjQwOTExQkE4QkYxRUZDNzI2NDI3MTFGQ0U3RkM0RUNEMkMiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJsNHN5UUpFYnFMOGVfSEprSnhIODVfeE96U3cifQ.eyJuYmYiOjE1ODM0ODY3MDAsImV4cCI6MTU4MzQ5MDMwMCwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5jb29wLnNlIiwiYXVkIjpbImh0dHBzOi8vbG9naW4uY29vcC5zZS9yZXNvdXJjZXMiLCJoeWJyaXNfYXBpIl0sImNsaWVudF9pZCI6Imh5YnJpc19jbXNfcHJvZCIsInN1YiI6ImExNDg2NDllLTIzNWEtNDE1Ny04ZGY4LTViMmFhNDI0ZWE3ZCIsImF1dGhfdGltZSI6MTU4MzI2NjExNywiaWRwIjoibG9jYWwiLCJlbm92YUlkIjoiMjA5MjMxMjI0IiwiaXNDb21wYW55IjoiRmFsc2UiLCJsYXN0TG9naW5EYXRlIjoiMjAyMC0wMy0wMyAyMTowODozNyIsImlkMzYwIjoiM2I0YmJiNTQtM2IxYS00MWExLWJmZDMtMzdiODFlZjE4ODNiIiwiZW1haWwiOiJqYWtvYi5uYW5uZXNvbkBjb29wLnNlIiwic2NvcGUiOlsiaHlicmlzLnByb2ZpbGUiLCJvcGVuaWQiLCJoeWJyaXNfYXBpIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.H-2GiXn8z10xR-2GKPa6ODhTDPUXxJictLl0SfLZCC0t5ilVAZdez7-wA8P619T8lartKpNNQmDrsR-Cm_lwN26DqmOzcI77JcbPSnhRVa9y__sfUsMsKDnE-FLZfwYYWkghzrpOgP9K-RN3dVvWHm-00kZXpHeEIAvrvdx5qLV7DLQbNhCtVki5RFuNAJTKR8PaxtxiLekVruUf-z20rKYkX95cR_yom-KcCBQz8vna3h5T1oSSr9hvfG-c1Evgs68KDyHQfm01DH1pljhZXc0vxtZqLkRfvxb4pXOitB2qg-IVG9vyORxV_69Nek7lgLelez2qo4bYDgwigtcyOg"
    },
    minicart: {
      cartData: {
        type: "cartWsDTO",
        appliedOrderPromotions: [],
        appliedProductPromotions: [],
        appliedVouchers: [],
        calculated: true,
        code: "30873951",
        deliveryCost: {
          currencyIso: "SEK",
          formattedValue: "0:00 kr",
          priceType: "TOTAL",
          value: 0.0
        },
        deliveryItemsQuantity: 0,
        deliveryMode: {
          code: "homedelivery",
          name: "Hemleverans"
        },
        deliveryOrderGroups: [],
        entries: [],
        extraAmountToBeReserved: {
          currencyIso: "SEK",
          formattedValue: "4:00 kr",
          priceType: "TOTAL",
          value: 4.0
        },
        guid: "a032e48d-f264-4dda-856f-f3db7741bd1e",
        isPartOfSubscription: false,
        net: false,
        orderDiscounts: {
          currencyIso: "SEK",
          formattedValue: "0:00 kr",
          priceType: "TOTAL",
          value: 0.0
        },
        pickupItemsQuantity: 0,
        pickupOrderGroups: [],
        postCode: "17261",
        site: "coop",
        store: "016001",
        subTotal: {
          currencyIso: "SEK",
          formattedValue: "0:00 kr",
          priceType: "TOTAL",
          value: 0.0
        },
        timeWindow: {},
        totalDepositSum: {
          currencyIso: "SEK",
          formattedValue: "0:00 kr",
          priceType: "TOTAL",
          value: 0.0
        },
        totalDiscounts: {
          currencyIso: "SEK",
          formattedValue: "0:00 kr",
          priceType: "TOTAL",
          value: 0.0
        },
        totalItems: 0,
        totalPrice: {
          currencyIso: "SEK",
          formattedValue: "0:00 kr",
          priceType: "TOTAL",
          value: 0.0
        },
        totalPriceWithExtraAmountToReserve: {
          currencyIso: "SEK",
          formattedValue: "4:00 kr",
          priceType: "TOTAL",
          value: 4.0
        },
        totalPriceWithTax: {
          currencyIso: "SEK",
          formattedValue: "0:00 kr",
          priceType: "TOTAL",
          value: 0.0
        },
        totalQuantity: 0,
        totalTax: {
          currencyIso: "SEK",
          formattedValue: "0:00 kr",
          priceType: "TOTAL",
          value: 0.0
        },
        amountMissing: {
          currencyIso: "SEK",
          formattedValue: "500:00 kr",
          priceType: "TOTAL",
          value: 500.0
        },
        coopStore: {
          code: "016001",
          enova: false,
          foodBagsOnly: false,
          name: "STOCKHOLM"
        },
        hasSubscription: false,
        isExtraOrderCart: false,
        minimumShoppingValue: {
          currencyIso: "SEK",
          formattedValue: "500:00 kr",
          priceType: "TOTAL",
          value: 500.0
        },
        minimumShoppingValueReached: false,
        potentialOrderPromotions: [],
        potentialProductPromotions: [],
        recipesGroups: [],
        replaceAll: true,
        subscriptionFrequency: 0,
        totalUnitCount: 0
      }
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});
