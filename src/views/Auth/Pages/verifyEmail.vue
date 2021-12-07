<template>
	<div class="wrapper">
		<div class="">
			<div class="login_form">
				<div class="left_block">
					<div class="inner_contentbox">
                        
						<div class="logo">
							<a href="#">
                                <img src="assets/images/logo.png" alt=""/>
                            </a>
						</div>

						<div class="title-block">
							<h1>Lets’s get started!</h1>
						</div>
						<div class="pargraph">
							<p>
								Please enter your email ID to continue to
								vaultspay
							</p>
						</div>

						<form @submit.prevent="sendOtp">
							<div class="forms">
								<div class="field">
									
                                    <label class="label pd_left">Email ID</label>
									<input
										type="email"
										placeholder="Enter your email ID"
										class="input-field"
										v-model="_validator.form.email.$model"
										:class="'input-field '+ _vClass(_validator.form, 'email')"
									    />
                                    <div class="invalid-feedback" v-if="_vError(_validator.form, 'email')">
                                        {{ _vErrorMessage(_validator.form, "email") }}
                                    </div>

								</div>

								<div class="field btn_margin_top">
									<button class="btn">Continue</button>
								</div>
							</div>
						</form>

						<div class="copyright_txt">
							<p>
								Copyright © Designed & Developed by
								<a href="#">VaultsPay</a> 2021
							</p>
						</div>
					</div>
				</div>

				<div class="right_block">
					<div class="illustration_img">
						<img
							src="assets/images/login_illustration-1-1.png"
							alt=""
						/>
					</div>

					<div class="content">
						<h2>
							Transfer<br />
							Money with Ease
						</h2>
						<p>
							Send and receive money with better exchange rates
							and avoid excessive bank fees
						</p>
					</div>

					<div class="pagination_dots">
						<ul>
							<li><span class="dots active"></span></li>
							<li><span class="dots"></span></li>
							<li><span class="dots"></span></li>
						</ul>
					</div>
				</div>
                
			</div>
		</div>
	</div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
export default 
{
	data() 
    {
		return {
			auth: null,
            form: {
                email: null
            },
			authState: {},
			isError: false,
		};
	},
	setup() 
    {
		sessionStorage.removeItem("auth");
		return { _validator: useVuelidate() };
	},
	methods: 
    {
		sendOtp() 
        {
			this._validator.$validate();
			if (!this._validator.$error) 
            {
				this.$store.dispatch("verifyEmail", this.form)
					.then((data) => 
                    {
                        if (data.data.otpVerification == 1) 
                        {
                            this.$router.push("/verify-otp");
                        }
					});
			}
		},
	},
	created() 
    {
        this.$store.dispatch("logout");
		this.auth = this.$store.getters.auth;
	},
	validations() 
    {
        return {
            form: {
                email: {
                    required,
                    email
                },
            },
        };
	},
};
</script>
