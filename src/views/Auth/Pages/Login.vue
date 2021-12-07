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
							<h1>Sign in</h1>
						</div>
						<div class="pargraph">
							<p>
								Please enter your password to sign in to your
								account
							</p>
						</div>
						<form @submit.prevent="loginUser">
							<div class="forms">
								<div class="field">
									<label class="label pd_left"
										>Email ID</label
									>
									<input
										readonly
										placeholder="Enter your email ID"
										v-model="_validator.login.email.$model"
                                        :class="'input-field '+ _vClass(_validator.form, 'limit')"
									/>
                                    <div class="invalid-feedback" v-if="_vError(_validator.form, 'limit')">
                                        {{ _vErrorMessage(_validator.form, "limit") }}
                                    </div>
								</div>

								<div class="field">
									<label class="label pd_left"
										>Password</label
									>
									<input
										type="password"
										v-model="_validator.login.password.$model"
										placeholder="Enter your password"
										class="input-field"
									/>
									<div
										class="feedback invalid-feedback"
										v-for="(error, index) of _validator.login
											.password.$errors"
										:key="index"
									>
										{{ error.$message }}
									</div>
								</div>

								<div class="field btn_margin_top">
									<button type="submit" class="btn">
										Sign in
									</button>
								</div>

								<div class="btm_links">
									<div class="text">
										<p>
											Forgot your password?<a
												href="javascript:void(0)"
												@click="resetPassword"
												class="reset_ps"
												>Reset Password</a
											>
										</p>
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
							src="assets/images/login_illustration-3-3.png"
							alt=""
						/>
					</div>

					<div class="content">
						<h2>
							Quick and<br />
							Easy Payments
						</h2>
						<p>
							Easily make your payments to shops or services with
							features like QR Pay
						</p>
					</div>

					<div class="pagination_dots">
						<ul>
							<li><span class="dots"></span></li>
							<li><span class="dots"></span></li>
							<li><span class="dots active"></span></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
@import "/../assets/css/login_pages.css";
</style>
<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

export default 
{
	data() {
		return {
			auth: {},
			fullPage: true,
			login: {
				email: "",
				password: "",
			},
		};
	},
	methods: {
		loginUser() {
			this._validator.$validate();
			if (!this._validator.$error) {
				let data = {
					email: this.auth.email,
					password: this.login.password,
				};
				// send to store
				this.$store.dispatch("loginUser", data).then((res) => {
					if (res.code == 200) {
						if (res.data.passcode_set == 1) {
							this.$router.push("/login_passcode");
						} else {
							this.$router.push("/setpasscode");
						}
					} else if(res.code==401) {
						this.$router.push("/verify-email");
					}
				});
			}
		},
		resetPassword() {
			let data = { email: this.login.email, type: 1 };
			this.$store
				.dispatch("Reset_Password_or_passcode", data)
				.then((res) => {
					if (res.code == 200) {
						this.$router.push("/resetpassword");
					}
					 else {
						this.$router.push("/verify-email");
					}
				});
		},
	},
	mounted() 
    {
		this.auth = this.$store.getters.auth;
		this.login.email = this.auth.email;
	},
	setup() {
		return { _validator: useVuelidate() };
	},
    validations()
    {
		return {
			login: {
				email: {
					required,
					email,
				},
				password: {
					required,
					minLength: minLength(6),
				},
			},
		};
    },
};
</script>
