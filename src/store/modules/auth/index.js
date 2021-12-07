import mutations from "./mutations.js";
import getters from "./getters.js";
import actions from "./actions.js";

export default 
{
    // Important consideration
    namespace: true,
    state()
    {
        var sessionAuth = JSON.parse(sessionStorage.auth ?? '{"authenticated":false,"user":{}}' );
        return {
            authenticated: sessionAuth.authenticated,
            email: sessionAuth.email,
            accessToken: null,
            otpVerification: null,
            verifyotp:null,
            RegisterUser:null,
            loginUser:null,
            user: sessionAuth.user,
            lastFetch: new Date().getTime(),
            test: null,
        }
    },
    getters: getters,
    mutations: mutations,
    actions: actions,
};