export default {
  setWalletList(state, payload) {
    state.walletList = payload;
  },
  setSendMoneyStep(state, step) {
    state.step = step;
  },
  setSendMoneyData(state, data) {
      state.sendMoneyData  = {...state.sendMoneyData, ...data };
      console.log("state.sendMoneyData:", state.sendMoneyData);
  },
};
