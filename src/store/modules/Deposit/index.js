import mutations from "./mutations.js";
import getters from "./getters.js";
import actions from "./actions.js";

export default {
    namespace: true,
    state() {
        return {
            details: {
                step: 1,
                amount: null,
                currency: {},
                wallet: {},
                paymentMethod: {},
                hash: null,
            },
            depositTransaction: {

            }
        };
    },
    getters: getters,
    mutations: mutations,
    actions: actions,
};
