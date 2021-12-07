import mutations from "./mutations.js";
import getters from "./getters.js";
import actions from "./actions.js";

export default 
{
    namespace: true,
    state()
    {
        return {
            currencyId: null,
            allowedCurrencies: null,
            allowedPaymentMethods: null,
            balanceAndLimits: {}
        }
    },
    getters: getters,
    mutations: mutations,
    actions: actions,
};