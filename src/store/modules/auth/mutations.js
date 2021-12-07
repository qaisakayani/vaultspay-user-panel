export default 
{
    verifyEmailMutation(state, payload) 
    {
        state.email = payload.email;
        state.authenticated = false;
        // Start Session
        sessionStorage.setItem("auth", JSON.stringify({
            flow: "verify",
            email: payload.email,
            authenticated: false,
        }));
    },
    
    Verifyotp(state, payload) 
    {
        state.email = payload.email;
        state.authenticated = false;
        sessionStorage.setItem("auth", JSON.stringify({
            flow: "step2",
            otp: payload.otp,
            email: payload.email,
            authenticated: false,
        }));
    },
    
    loginUser(state, payload)
    {
        if( payload.data.passcode_set == 0 )
        {
            state.authenticated = false;
        }
        state.email = payload.email;
        sessionStorage.setItem("auth", JSON.stringify({
            flow: "step3",
            id: payload.data.id,
            email: payload.data.email,
            authenticated: false,
        }));
    },
    
    passcodeLogin(state, payload)
    {
        state.email = payload.email;
        state.authenticated = true;
        state.user = {
            id: payload.data.id,
            first_name: payload.data.first_name,
            last_name: payload.data.last_name,
            name: payload.data.first_name + " " + payload.data.last_name,
            email: payload.data.email,
            status: payload.data.status,
            user_type: payload.data.user_type,
            kycLevel: payload.data.kycLevel,
        };
        sessionStorage.setItem("auth", JSON.stringify({
            flow: "step3",
            id: payload.data.id,
            email: payload.data.email,
            authenticated: true,
            user: {
                id: payload.data.id,
                first_name: payload.data.first_name,
                last_name: payload.data.last_name,
                name: payload.data.first_name + " " + payload.data.last_name,
                email: payload.data.email,
                status: payload.data.status,
                user_type: payload.data.user_type,
                kycLevel: payload.data.kycLevel,
            }
        }));
    },

    logout(state, payload) {
        sessionStorage.removeItem('auth');
        state.authenticated = false;
    },
    
  setAccessToken(state, payload) {
    state.accessToken = payload.accessToken;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
  RegisterUser(state, payload) {
    state.RegisterUser = payload;
  },
    setAuthenticated(state, payload) 
    {
        state.authenticated = payload;
    },
};
