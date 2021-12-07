import { request } from "@/mixins/request";

export default {

  async fetchCurrencies(context, payload) {
    return await request.methods
      .makeRequest("POST", "api/v1/get-allowed-currencies", payload)
      .then((data) => {
        context.commit("setCurrencyList", data.data);
      });
  },
  async iniateCurrencyExchange(context, payload) {
    return await request.methods
      .makeRequest(
        "POST",
        "api/v1/get-exchange-payment-details",
        payload,
        true,
        false
      )
      .then((data) => {
        // context.commit("setExchangeDetails", data.data);
        return data;
      });
  },
  async confirmExchangePayment(context, payload) {
    return await request.methods
      .makeRequest("POST", "api/v1/exchange-payment", payload, true, true)
      .then((data) => {
        return data;
      });
  },
};
