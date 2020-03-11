<template>
  <div id="app" class="o-start-module">
    <div class="header-module">
      <h2 class="a-heading-1">Populära varor</h2>
      <a class="a-link" href=""></a>
    </div>
    <ProductMatrix />
  </div>
</template>

<script>
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import ProductMatrix from "@/components/ProductMatrix.vue";

Vue.prototype.$receivedProducts = [];

export default {
  components: {
    ProductMatrix
  },
  created() {
    if (process.env.NODE_ENV !== "production") {
      // add config to window.ACC.config
      window.console.log(process.env.NODE_ENV);
      window.console.warn("Using fake config - data is not real");
      window.ACC = {
        config: {
          rrSessionId: "s109421930639200",
          // user: "a148649e-235a-4157-8df8-5b2aa424ea7d",
          user: "anonymous",
          coopStore: "016001",
          cartguid: "a22a9ca5-1296-4606-9309-ed366f630723",
          authToken:
            "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk3OEIzMjQwOTExQkE4QkYxRUZDNzI2NDI3MTFGQ0U3RkM0RUNEMkMiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJsNHN5UUpFYnFMOGVfSEprSnhIODVfeE96U3cifQ.eyJuYmYiOjE1ODM0ODY3MDAsImV4cCI6MTU4MzQ5MDMwMCwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5jb29wLnNlIiwiYXVkIjpbImh0dHBzOi8vbG9naW4uY29vcC5zZS9yZXNvdXJjZXMiLCJoeWJyaXNfYXBpIl0sImNsaWVudF9pZCI6Imh5YnJpc19jbXNfcHJvZCIsInN1YiI6ImExNDg2NDllLTIzNWEtNDE1Ny04ZGY4LTViMmFhNDI0ZWE3ZCIsImF1dGhfdGltZSI6MTU4MzI2NjExNywiaWRwIjoibG9jYWwiLCJlbm92YUlkIjoiMjA5MjMxMjI0IiwiaXNDb21wYW55IjoiRmFsc2UiLCJsYXN0TG9naW5EYXRlIjoiMjAyMC0wMy0wMyAyMTowODozNyIsImlkMzYwIjoiM2I0YmJiNTQtM2IxYS00MWExLWJmZDMtMzdiODFlZjE4ODNiIiwiZW1haWwiOiJqYWtvYi5uYW5uZXNvbkBjb29wLnNlIiwic2NvcGUiOlsiaHlicmlzLnByb2ZpbGUiLCJvcGVuaWQiLCJoeWJyaXNfYXBpIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.H-2GiXn8z10xR-2GKPa6ODhTDPUXxJictLl0SfLZCC0t5ilVAZdez7-wA8P619T8lartKpNNQmDrsR-Cm_lwN26DqmOzcI77JcbPSnhRVa9y__sfUsMsKDnE-FLZfwYYWkghzrpOgP9K-RN3dVvWHm-00kZXpHeEIAvrvdx5qLV7DLQbNhCtVki5RFuNAJTKR8PaxtxiLekVruUf-z20rKYkX95cR_yom-KcCBQz8vna3h5T1oSSr9hvfG-c1Evgs68KDyHQfm01DH1pljhZXc0vxtZqLkRfvxb4pXOitB2qg-IVG9vyORxV_69Nek7lgLelez2qo4bYDgwigtcyOg"
        }
      };

      // add Rich Relevance session identifier
      sessionStorage.setItem(
        "rcs",
        "eF5j4cotK8lMETA0N7bUNdQ1ZClN9jAxNDFLS05O1k0xMzTRNTFNSdFNTTFMBXJNk5Is0xKNEg0tAZ_oDyg"
      );

      // add cart data to storage
      const cartData = {
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
      };
      this.$store.commit("cart", cartData);
    }
  }
};
</script>

<style lang="less">
*,
div {
  //like on coop.se
  box-sizing: border-box;
}
body {
  background-color: #f5f5f5;
}
a {
  cursor: pointer;
}
a {
  color: #337ab7;
  text-decoration: none;
}
.a-link {
  color: #00aa46;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
#app {
  font-family: "Akkurat", "Roboto", Helvetica, Arial, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1320px;
}
.o-start-module .header-module {
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
}
.o-start-module .header-module .a-heading-1 {
  font-family: Akkurat, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 1.6rem;
  margin-top: -2px;
  margin-bottom: 24px;
}
.o-start-module .header-module .a-link {
  position: absolute;
  right: 0;
  z-index: 1;
  margin-top: -4px;
  font-size: 1.4rem;
}
</style>
