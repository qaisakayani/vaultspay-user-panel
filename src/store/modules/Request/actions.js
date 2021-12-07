import { request } from "@/mixins/request";

export default 
{
    async fetchmyRequest(context, payload) 
    {
        
        return await request.methods.makeRequest("POST", "api/v1/get-money-requests", payload,true,false)
            .then((data) => {
                context.commit("setmyRequest", data.data);
            });
    },
    async fetchuserRequest(context, payload) 
    {
        
        return await request.methods.makeRequest("POST", "api/v1/get-user-request-money", payload,false,false)
            .then((data) => {
                context.commit("setuserRequest", data.data);
            });
    },
    async sendMoneyRequest(context, payload) 
    {
        
        return await request.methods.makeRequest("POST", "api/v1/initiate-request-money", payload,true,true)
            .then((data) => {
                return data;
            });
    },
    async cancelRequest(context, payload) 
    {
        
        return await request.methods.makeRequest("POST", "api/v1/cancel-request-money", payload,true,true)
            .then((data) => {
                return data;
            });
    },
    async widthUserverifyEmailorPhone(context, payload) {
        return await request.methods
          .makeRequest("POST", "api/v1/verify-email-phone", payload, false)
          .then((data) => {
            return data;
          });
    },
    
};
