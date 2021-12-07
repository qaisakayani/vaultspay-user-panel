import mutations from "./mutations.js";
import getters from "./getters.js";
import actions from "./actions.js";

export default {
    namespace: true,
    state() {
        return {
          //   walletList: null,
          step: 1,
          currencyList: null,
          accountId: null,
          currencyExchangeData: {},
          exchangeConfirmData: {},
        };
    },
    getters: getters,
    mutations: mutations,
    actions: actions,
};
