<template>
    <div class="wrapper">
        <div class="">
            <form @submit.prevent="resetPassword">
                <div class="login_form">
                    <div class="left_block">
                        <div class="inner_contentbox">
                            <div class="logo">
                                <a href="#"
                                    ><img src="assets/images/logo.png" alt=""
                                /></a>
                            </div>
                            <div class="title-block">
                                <h1>Reset Passsword</h1>
                            </div>
                            <div class="pargraph">
                                <p>
                                    Enter the OTP verification code send to your
                                    email address and enter a new password for
                                    your account.
                                </p>
                            </div>

                            <div class="sub_heading pd_left">
                                <h3>OTP Verification</h3>
                            </div>
                            <div class="pargraph pd_left">
                                <p>Enter a new password for your account.</p>
                            </div>

                            <div class="forms">
                                <div class="field otp_field">
                                    <label class="label pd_left">
                                        Verification Code
                                    </label>
                                    <input
                                        placeholder="Please enter the 6_Digit OTP"
                                        class="input-field"
                                        v-model="v$.login.otp.$model"
                                        :class="{
                                            error_msg: v$.login.otp.$error,
                                            '': 'error_msg',
                                        }"
                                    />
                                   <div class="timer_sec" v-if="countDown">
                                        Timer: <span>{{countDown}}Sec</span>
                                    </div>
									<div class="timer_sec" v-if="countDown==0">
										<span>
                                        <a
											@click="resendOtp"
											href="javascript:void(0)"
											>Resend OTP</a>
                                        </span>
									</div>
                                    <div
                                        class="feedback invalid-feedback"
                                        v-for="(error, index) of v$.login.otp
                                            .$errors"
                                        :key="index"
                                    >
                                        {{ error.$message }}
                                    </div>
                                </div>

                                <div class="sub_heading pd_left">
                                    <h3>Reset Password</h3>
                                </div>
                                <div class="pargraph pd_left">
                                    <p>
                                        Enter a new password for your account.
                                    </p>
                                </div>

                                <div class="field">
                                    <label class="label pd_left"
                                        >Password</label>
                                    <input type="password"
                                        placeholder="Enter your password"
                                        class="input-field"
                                        v-model="v$.login.password.$model"
                                        :class="{
                                            error_msg: v$.login.password.$error,
                                            '': 'error_msg',
                                        }"
                                    />
                                    <div
                                        class="feedback invalid-feedback"
                                        v-for="(error, index) of v$.login
                                            .password.$errors"
                                        :key="index"
                                    >
                                        {{ error.$message }}
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label pd_left"
                                        >Confirm Password</label
                                    >
                                    <input type="password"
                                        placeholder="Enter your password"
                                        class="input-field"
                                        v-model="
                                            v$.login.confirmPassword.$model
                                        "
                                        :class="{
                                            error_msg:
                                                v$.login.confirmPassword.$error,
                                            '': 'error_msg',
                                        }"
                                    />
                                    <div
                                        class="feedback invalid-feedback"
                                        v-for="(error, index) of v$.login
                                            .confirmPassword.$errors"
                                        :key="index"
                                    >
                                        {{ error.$message }}
                                    </div>
                                </div>

                                <div class="field btn_margin_top">
                                    <button class="btn">Reset Password</button>
                                </div>

                                <div class="support">
                                    <p>
                                        Facing issues resetting your password?
                                        contact VaultsPay:
                                        <a href="#">support@vaultspay.ae</a>
                                    </p>
                                </div>
                            </div>

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
                                Easily make your payments to shops or services
                                with features like QR Pay
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
            </form>
        </div>
    </div>
</template>

<style scoped>
    @import "/../assets/css/login_pages.css";
</style>
<script>
    import useVuelidate from "@vuelidate/core";
    import { required, sameAs, minLength } from "@vuelidate/validators";

    export default {
        mounted() {
            this.authState = this.$store.getters.authState;
            this.login.login_email = this.$store.getters.auth.email;
            this.countDownTimer()
           
        },
        setup() {
            return { v$: useVuelidate() };
        },
        data() {
            return {
                authState: {},
                login: {
                    login_email: "",
                    otp: "",
                    password: "",
                    confirmPassword: "",
                },
                countDown:60
            };
        },
        methods: {
            resetPassword() {
                this.v$.$validate();
                if (!this.v$.$error) {
                    let data = {
                        email: this.login.login_email,
                        password: this.login.password,
                        confirmPassword: this.login.confirmPassword,
                        otp: this.login.otp,
                    };
                    // send to store
                    this.$store.dispatch("updatePassword", data).then((res) => {
                        // this.$router.push('/')

                        if (res.code == 200) {
                            this.$router.push("/login");
                        } else if(res.code==401) {
                            this.$router.push("/verify-email");
                        }
                    });
                } else {
                }
            },
            resendOtp()
                {
                    if (this.login.login_email.length) 
                    {
                        this.$store
                            .dispatch("verifyEmail", { email:this.login.login_email }).then(()=>{
                                   this.countDown=60
                                   this.countDownTimer() 
                            })
                    }
                },
                countDownTimer() {
                if(this.countDown > 0) {
                    setTimeout(() => {
                        this.countDown -= 1
                        this.countDownTimer()
                    }, 1000)
                }
            }
        },
        validations() {
            return {
                login: {
                    otp: {
                        required,
                    },
                    password: {
                        required,
                        minLength: minLength(6),
                    },
                    confirmPassword: {
                        required,
                        sameAs: sameAs(this.login.password),
                    },
                },
            };
        },
    };
</script>
