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
        code: "31026397",
        entries: [
          {
            entryNumber: 0,
            product: {
              code: "7300170062642",
              depositPrice: {
                currencyIso: "SEK",
                formattedValue: "0:-",
                priceType: "BUY",
                value: 0.0
              },
              keywords: [],
              name: "Mellanmjölk Eko",
              pickPrice: {
                currencyIso: "SEK",
                formattedValue: "11:50",
                priceType: "BUY",
                value: 11.5
              },
              unit: {
                name: "st"
              },
              url:
                "/handla/varor/mejeri-agg/mjolk-fil/mjolk/mellanmjolk-eko-7300170062642",
              variances: []
            },
            quantity: 1,
            replace: true,
            totalPrice: {
              currencyIso: "SEK",
              formattedValue: "11:50",
              priceType: "BUY",
              value: 11.5
            }
          }
        ],
        extraAmountToBeReserved: {
          currencyIso: "SEK",
          formattedValue: "4:00 kr",
          priceType: "TOTAL",
          value: 4.0
        },
        guid: "a6360054-821c-402d-bf85-3e87a4d6d8e5",
        isPartOfSubscription: false,
        postCode: "17261",
        timeWindow: {},
        totalDepositSum: {
          currencyIso: "SEK",
          formattedValue: "0:00 kr",
          priceType: "TOTAL",
          value: 0.0
        },
        totalItems: 1,
        totalPrice: {
          currencyIso: "SEK",
          formattedValue: "11:50 kr",
          priceType: "TOTAL",
          value: 11.5
        },
        totalPriceWithExtraAmountToReserve: {
          currencyIso: "SEK",
          formattedValue: "15:50 kr",
          priceType: "TOTAL",
          value: 15.5
        },
        totalPriceWithTax: {
          currencyIso: "SEK",
          formattedValue: "11:50 kr",
          priceType: "TOTAL",
          value: 11.5
        },
        totalQuantity: 1,
        totalTaxValues: [
          {
            appliedValue: {
              currencyIso: "SEK",
              formattedValue: "1:23 kr",
              priceType: "TOTAL",
              value: 1.23
            },
            value: 12.0
          }
        ],
        amountMissing: {
          currencyIso: "SEK",
          formattedValue: "488:50 kr",
          priceType: "TOTAL",
          value: 488.5
        },
        coopStore: {
          code: "016001",
          enova: false,
          foodBagsOnly: false,
          name: "STOCKHOLM"
        },
        isExtraOrderCart: false,
        recipesGroups: [],
        replaceAll: true
      }
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});
