import { request } from "@/mixins/request";

export default 
{
    async fetchAllowedCurrencies(context, payload) 
    {
        return await request.methods.makeRequest("POST", "api/v1/get-allowed-currencies", payload)
            .then((data) => {
                context.commit("setAllowedCurrencies", data.data);
            });
    },
    async fetchAllowedPaymentMethods(context, payload) 
    {
        return await request.methods.makeRequest("POST", "api/v1/get-allowed-payment-methods", payload)
            .then((data) => {
                context.commit("setAllowedPaymentMethods", data.data);
            });
    },
    async fetchBalanceAndLimits(context, payload) 
    {
        return await request.methods.makeRequest("POST", "api/v1/check-balance-and-limits", payload)
            .then((data) => {
                context.commit("setBalanceAndLimits", data.data);
            });
    },
};
