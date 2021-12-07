import { request } from "@/mixins/request";

export default {
    async fetchWalletList(context, payload) {
        return await request.methods
          .makeRequest("POST", "api/v1/get-wallet-list", payload)
          .then((data) => {
            context.commit("setWalletList", data.data);
          });
    },
    async verifyEmailorPhone(context, payload) {
        return await request.methods
          .makeRequest("POST", "api/v1/verify-email-phone", payload, false, true)
          .then((data) => {
            return data;
          });
    },
    async iniateSendMoney(context, payload) {
        return await request.methods
          .makeRequest("POST", "api/v1/initiate-send-money", payload,true,true)
          .then((data) => {
            return data;
          });
    },
    async confirmSendMoney(context, payload) {
        return await request.methods
          .makeRequest("POST", "api/v1/confirm-send-money", payload,true,true)
          .then((data) => {
            return data;
          });
    },
};
