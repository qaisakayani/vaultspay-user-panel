import { request } from "@/mixins/request";

export default 
{
    async fetchTransactions(context, payload) 
    {
        const body = { ...context.getters.getFilters ,...payload };
        return await request.methods.makeRequest("POST", "api/v1/get-transactions", body)
            .then((data) => {
                context.commit("setTransactions", data.data);
            });
    },

    async getTransactionAttempts(context, payload) {
        return await request.methods
        .makeRequest("POST", "api/v1/get-transaction-attempts", payload)
        .then((data) => {
            context.commit("transactionAttemptsMutation", {
            ...data,
            ...payload,
            });
        });
    },
};
