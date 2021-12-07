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
							<h1>Passcode</h1>
						</div>
						<div class="pargraph">
							<p>Please enter your passcode to login</p>
						</div>
						<form @submit.prevent="setPasscode">
							<div class="forms">
								<div class="field">
									<label class="label pd_left"
										>Enter Pascode</label
									>
									<div class="divOuter">
										<div id="divInner">
											<input
												placeholder=""
												class="passcode-field"
												id="partitioned"
												type="text"
												maxlength="4"
												v-model="
													v$.form.passcode.$model
												"
											/>
										</div>
										<div
											class="feedback invalid-feedback"
											v-for="(error, index) of v$.form
												.passcode.$errors"
											:key="index"
										>
											{{ error.$message }}
										</div>
									</div>
								</div>
								<div class="field">
									<label class="label pd_left"
										>Confirm Pascode</label
									>
									<div class="divOuter">
										<div id="divInner">
											<input
												placeholder=""
												class="passcode-field"
												id="partitioned"
												type="text"
												maxlength="4"
												v-model="
													v$.form.confirmpasscode
														.$model
												"
											/>
										</div>
										<div
											class="feedback invalid-feedback"
											v-for="(error, index) of v$.form
												.confirmpasscode.$errors"
											:key="index"
										>
											{{ error.$message }}
										</div>
									</div>
								</div>

								<div class="field btn_margin_top">
									<button type="submit" class="btn">
										Continue
									</button>
								</div>

								<div class="btm_links">
									<div class="text">
										<!-- <p>
                      Forgot your password?<a href="#" class="reset_ps"
                        >Reset Passcode</a
                      >
                    </p> -->
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
import {
	required,
	email,
	sameAs,
	integer,
	minLength,
} from "@vuelidate/validators";

export default {
	mounted() {
		this.authState = this.$store.getters.authState;
	},
	setup() {
		return { v$: useVuelidate() };
	},
	data() {
		return {
			fullPage: true,
			authState: {},
			form: {
				passcode: "",
				confirmpasscode: "",
			},
		};
	},
	methods: {
		async setPasscode() {
			this.v$.$validate();
			if (!this.v$.$error) 
            {
				let data = {
					passcode: this.form.passcode,
					confirmPasscode: this.form.confirmpasscode,
				};
				// send to store
				await this.$store.dispatch("setpasscode", data).then((res) => 
                {
					if (res.code == 200) 
                    {
						this.$router.push("/");
					}
                    else {
						this.$router.push("/verify-email");
					}
				});
			}
		},
	},
	validations()
    {
		return {
			form: {
				passcode: {
					required,
				},
				confirmpasscode: {
					required,
					sameAs: sameAs(this.form.passcode),
				},
			},
		};
	},
};
</script>
