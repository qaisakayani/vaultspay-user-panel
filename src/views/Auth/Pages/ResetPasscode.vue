<template>
    <div class="wrapper">
        <div class="">
            <form @submit.prevent="resetPasscode">
                <div class="login_form">
                    <div class="left_block">
                        <div class="inner_contentbox">
                            <div class="logo">
                                <a href="#"
                                    ><img src="assets/images/logo.png" alt=""
                                /></a>
                            </div>
                            <div class="title-block">
                                <h1>Reset Passcode</h1>
                            </div>
                            <div class="pargraph">
                                <p>
                                    Enter the OTP verification code send to your
                                    email address and enter a new passcode for
                                    your account.
                                </p>
                            </div>

                            <div class="sub_heading pd_left">
                                <h3>OTP Verification</h3>
                            </div>
                            <div class="pargraph pd_left">
                                <p>Enter a new Passcode for your account.</p>
                            </div>

                            <div class="forms">
                                <div class="field otp_field">
                                    <label class="label pd_left"
                                        >Verification Code</label
                                    >
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
                                    <h3>Reset Passcode</h3>
                                </div>
                                <div class="pargraph pd_left">
                                    <p>
                                        Enter a new passcode for your account.
                                    </p>
                                </div>
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
                                                    v$.login.passcode.$model
                                                "
                                            />
                                        </div>
                                        <div
                                            class="feedback invalid-feedback"
                                            v-for="(error, index) of v$.login
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
                                                    v$.login.confirmpasscode
                                                        .$model
                                                "
                                            />
                                        </div>
                                        <div
                                            class="feedback invalid-feedback"
                                            v-for="(error, index) of v$.login
                                                .confirmpasscode.$errors"
                                            :key="index"
                                        >
                                            {{ error.$message }}
                                        </div>
                                    </div>
                                </div>

                                <div class="field btn_margin_top">
                                    <button class="btn">Reset Passcode</button>
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
    import moment from 'moment';

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
                    passcode: "",
                    confirmpasscode: "",
                },
                countDown:60
            };
        },
        methods: {
            resetPasscode() {
                this.v$.$validate();
                if (!this.v$.$error) {
                    let data = {
                        email: this.login.login_email,
                        passcode: this.login.passcode,
                        confirmPasscode: this.login.confirmpasscode,
                        otp: this.login.otp,
                        type: 2,
                    };
                    // send to store
                    this.$store.dispatch("updatePasscode", data).then((res) => {
                        if (res.code == 200) {
                            this.$router.push("/login_passcode");
                        } else {
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
                    passcode: {
                        required,
                    },
                    confirmpasscode: {
                        required,
                        sameAs: sameAs(this.login.passcode),
                    },
                },
            };
        },
    };
</script>
