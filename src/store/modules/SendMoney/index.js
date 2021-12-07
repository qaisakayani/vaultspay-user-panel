import mutations from "./mutations.js";
import getters from "./getters.js";
import actions from "./actions.js";

export default {
    namespace: true,
    state() {
        return {
            walletList: null,
            step: 1,
            currencyName: null,
            transactionNote: null,
            transactionId: null,
            transactionDate: null,
            sendMoneyData: {},
        };
    },
    getters: getters,
    mutations: mutations,
    actions: actions,
};
