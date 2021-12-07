import { request } from "@/mixins/request";

export default 
{
	setAuthenticated(context, payload) 
    {
		context.commit("setAuthenticated", { payload });
	},

	async verifyEmail(context, payload) 
    {
		return await request.methods.makeRequest("POST", "api/v1/verify-email", payload, true, true)
            .then((data) => {
                context.commit("verifyEmailMutation", { ...data, ...payload });
                return data;
            });
	},
    
	async verifyOtp(context, payload) 
	{
		console.log("payload:", payload);
		return await request.methods.makeRequest("POST", "api/v1/verify-otp", payload, true, true)
			.then((data) => {
				context.commit("Verifyotp", { ...data, ...payload });
				return data;
			});
	},

	async RegisterUser(context, payload) 
    {
		return await request.methods.makeRequest("POST", "api/v1/register", payload, true, true)
			.then((data) => {
				context.commit("RegisterUser", { ...data, ...payload });
				return data;
			});
	},
    
	async loginUser(context, payload) 
    {
		return await request.methods.makeRequest("POST", "api/v1/login", payload, true, true)
			.then((data) => {
				if (data.code == 200) {
					context.commit("loginUser", { ...data, ...payload });
				}
				return data;
			});
	},
    
	async setpasscode(context, payload) 
    {
		return await request.methods.makeRequest("POST", "api/v1/set-passcode", payload, true, true)
			.then((data) => {
                context.commit("passcodeLogin", { ...data, ...payload });
				return data;
			});
	},
    
	async loginPasscode(context, payload) 
    {
		return await request.methods.makeRequest("POST", "api/v1/passcode-login", payload, true, true)
			.then((data) => {
				if (data.code == 200) {
					context.commit("passcodeLogin", { ...data, ...payload });
				}
				return data;
			});
	},
    
	logout(context, payload) 
    {
		context.commit("logout", { ...context, ...payload });
	},

	authenticated(context, payload) 
    {
		context.commit("authenticated", { ...context, ...payload });
	},

	async Reset_Password_or_passcode(context, payload) 
    {
		return await request.methods.makeRequest("POST", "api/v1/verify-email-general", payload, true, true)
			.then((data) => {
				return data;
			});
	},

	async updatePassword(context, payload) 
    {
		return await request.methods.makeRequest("POST", "api/v1/reset-password", payload, true, true)
			.then((data) => {
				return data;
			});
	},

	async updatePasscode(context, payload) 
    {
		return await request.methods.makeRequest("POST", "api/v1/reset-passcode", payload, true, true)
			.then((data) => {
				return data;
			});
	},
};
