import { request } from "@/mixins/request";

export default 
{
    async createDeposit(context, payload) 
    {
        const body = {
            hash: context.getters.getDepositDetails.hash,
            ...payload
        };
        return await request.methods.makeRequest("POST", "api/v1/initiate-deposit", body,false,true)
            .then((data) => {
                console.log("data.data:", data)
                context.commit("setDepositTransaction", data.data);
                return data
            });
    },
    
};
