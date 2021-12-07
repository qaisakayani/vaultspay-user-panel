import { request } from "@/mixins/request";

export default 
{
    async fetchAllWithdraw(context, payload) 
    {
        
        return await request.methods.makeRequest("POST", "api/v1/get-all-withdrawals", payload)
            .then((data) => {
                context.commit("setAllWithdraw", data.data);
            });
    },
    // async fetchDrawWallet(context, payload) 
    // {
        
    //     return await request.methods.makeRequest("POST", "api/v1/get-wallet", payload)
    //         .then((data) => {
    //             context.commit("setDrawWallet", data.data);
    //         });
    // },
    async fetchUserwithdrawalMethods(context, payload) 
    {
        
        return await request.methods.makeRequest("POST", "api/v1/get-user-withdrawal-methods", payload)
            .then((data) => {
                context.commit("setUserWithdrawMethods", data.data);
            });
    },
    async sendWithdrawRequest(context,payload)
    {
        return await request.methods.makeRequest("POST", "api/v1/add-new-withdrawal", payload,true,true)
            .then((data) => {
               return data
            });
    },
    async requestCancel(context,payload)
    {
        return await request.methods.makeRequest("POST", "api/v1/add-new-withdrawal", payload)
            .then((data) => {
               return data
            });
    }
    
};
