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
                        <form @submit.prevent="loginPasscode">
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
                                                v-model="
                                                    v$.form.passcode.$model
                                                "
                                                id="partitioned"
                                                type="text"
                                                maxlength="4"
                                            />
                                        </div>
                                        <div
                                            class="feedback invalid-feedback"
                                            v-for="(error, index) of v$.form
                                                .passcode.$errors"
                                            :key="index"
                                        >
                                            <P> {{ error.$message }}</P>
                                        </div>
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
                                                @click="resetPasscode"
                                                class="reset_ps"
                                                >Reset Passcode</a
                                            >
                                        </p>
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

<style scoped>
    @import "/../assets/css/login_pages.css";
</style>
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
        created() {
            this.auth = this.$store.getters.auth;
        },
        setup() {
            return { v$: useVuelidate() };
        },
        data() {
            return {
                auth: {},
                fullPage: true,
                form: {
                    passcode: "",
                },
            };
        },
        methods: {
            async loginPasscode() {
                this.v$.$validate();
                if (!this.v$.$error) {
                    let data = {
                        passcode: this.form.passcode,
                    };
                    // send to store
                    await this.$store
                        .dispatch("loginPasscode", data)
                        .then((res) => {
                            if (res.code == 200) {
                                this.$router.push("/");
                            } else {
                                this.$router.push("/verify-email");
                            }
                        });
                }
            },
            resetPasscode() {
                let data = { email: this.$store.getters.auth?.email, type: 2 };
                this.$store
                    .dispatch("Reset_Password_or_passcode", data)
                    .then((res) => {
                        if (res.code == 200) {
                            this.$router.push("/resetpasscode");
                        } else {
                            this.$router.push("/verify-email");
                        }
                    });
            },
        },

        validations() {
            return {
                form: {
                    passcode: {
                        required,
                        minLength: minLength(4),
                        integer,
                    },
                },
            };
        },
    };
</script>
