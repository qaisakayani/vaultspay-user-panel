<template>
	<div class="wrapper">
		<div class="">
			<div class="login_form">
				<div class="left_block">
					<div class="inner_contentbox">
						<div class="logo">
							<a href="#"
								><img src="assets/images/logo.png" alt=""
							/></a>
						</div>

						<div class="title-block">
							<h1>Please verify OTP</h1>
						</div>
						<div class="pargraph">
							<p>
								Please enter the 6-Digit verification code that
								we have sent to your email ID
								<span>{{ email }}</span>
							</p>
						</div>
						<form @submit.prevent="verifyOtp">
							<div class="forms">
								<div class="field">
									<label class="label pd_left"
										>Verification Code</label
									>
									<input
										type="text"
										placeholder="Please enter the 6_Digit OTP"
										:class="'input-field '+ _vClass(_validator.form.otp, 'otp')"
										v-model="_validator.form.otp.$model"
									/>
                                    <div class="invalid-feedback" v-if="_vError(_validator.form, 'otp')">
                                        {{ _vErrorMessage(_validator.form, "otp") }}
                                    </div>
								</div>

								<div class="field btn_margin_top">
									<button type="submit" class="btn">
										Continue
									</button>
								</div>

								<div class="btm_links">
									<div class="text">
										<a
											@click="resendOtp"
											href="javascript:void(0)"
											>Didn’t receive? Resend OTP</a
										>
									</div>
									<div class="text">
										<router-link to="/verify-email"
											>Change email ID</router-link
										>
									</div>
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
					<div class="illustration_img illustration_img_2">
						<img
							src="assets/images/login_illustration-2-2.png"
							alt=""
						/>
					</div>

					<div class="content">
						<h2>
							Manage<br />
							Your business
						</h2>
						<p>
							Get hold of your business using vaultspay as your
							preferred payment gateway
						</p>
					</div>

					<div class="pagination_dots">
						<ul>
							<li><span class="dots"></span></li>
							<li><span class="dots active"></span></li>
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
import { required, integer } from "@vuelidate/validators";

export default {
	data() {
		return {
			auth: null,
            form: {
                email: null,
                otp: null
            },
			authState: {},
		};
	},
	methods: 
    {
		verifyOtp()
        {
			this._validator.$validate();
			if (!this._validator.$error && this.email !== null) 
            {
				this.$store.dispatch("verifyOtp", { email: this.email, otp: this.form.otp })
					.then((data) => 
                    {
						if (data.code == 200) {
							if (data.data.accountExist) 
                            {
								this.$router.push("/login");    
							} 
                            else if (data.data.accountExist == 0) 
                            {
								this.$router.push("/register");    
							}
						}
					});
			}
		},
		resendOtp()
        {
			if (this.email.length) 
            {
				this.$store
					.dispatch("verifyEmail", { email: this.email })
					.then((data) => {
						this.authState = this.$store.getters.authState;
					});
			}
		},
	},
	mounted() 
    {
		this.auth = this.$store.getters.auth;
        this.email = this.auth?.email;
	},
	setup() 
    {
		return { _validator: useVuelidate() };
	},
	validations() 
    {
		return {
			form: 
            {
                otp: {required, integer}
			},
		};
	},
};
</script>
