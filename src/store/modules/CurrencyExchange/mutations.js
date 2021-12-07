export default {
  setCurrencyList(state, payload) {
    state.currencyList = payload;
  },
  setExchangeDetails(state, payload) {
    state.exchangeDetails = payload;
  },
  setCurrencyExchangeStep(state, step) {
    state.step = step;
  },
  setDataCurrencyExchange(state, payload) {
    state.currencyExchangeData = { ...payload };
  },
  setExchangeConfirmData(state, payload) {
    state.exchangeConfirmData = { ...payload };
  },
  getCurrentAccountId(state, payload) {
    var authDetails = sessionStorage.getItem("auth");
    var authDetailsArray = JSON.parse(authDetails);
    // console.log("authDetails:", authDetailsArray.id);
    state.accountId = authDetailsArray?.id;
  },
};
