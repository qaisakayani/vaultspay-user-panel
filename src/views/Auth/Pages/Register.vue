<template>
    <div class="wrapper">
        <div class="">

            <form @submit.prevent="registerUser">
                <div class="login_form">
                    <div class="left_block">
                        <div class="inner_contentbox">
                            <div class="logo">
                                <a href="#"><img src="assets/images/logo.png" alt="" /></a>
                            </div>
                            <div class="title-block">
                                <h1>Sign up</h1>
                            </div>

                            <div class="pargraph">
                                <p>
                                    Please enter your details to create an account on vaultspay
                                </p>
                            </div>

                            <div class="forms">
                                <div class="fields">

                                    <div class="field">
                                        <label class="label pd_left">First Name</label>
                                        <input placeholder="Enter your first name" 
                                            v-model="_validator.form.first_name.$model" 
                                            :class="'input-field ' + _vClass(_validator.form, 'first_name')"
                                        />
                                        <div class="invalid-feedback" v-if="_vError(_validator.form, 'first_name')">
                                            {{ _vErrorMessage(_validator.form, "first_name") }}
                                        </div>
                                    </div>

                                    <div class="field marg_left">
                                        <label class="label pd_left">Last Name</label>
                                        <input placeholder="Enter your last name" v-model="_validator.form.last_name.$model"
                                            :class="'input-field ' + _vClass(_validator.form, 'last_name')"
                                        />
                                        <div class="invalid-feedback" v-if="_vError(_validator.form, 'last_name')">
                                            {{ _vErrorMessage(_validator.form, "last_name") }}
                                        </div>
                                    </div>

                                </div>

                                <div class="field">

                                    <label class="label pd_left">Email</label>
                                    <input placeholder="Enter your email ID" readonly v-model="form.email"
                                        :class="'input-field ' + _vClass(_validator.form, 'email')"
                                    />

                                    <div class="invalid-feedback" v-if="_vError(_validator.form, 'email')">
                                        {{ _vErrorMessage(_validator.form, "email") }}
                                    </div>

                                </div>

                                <div class="field">
                                    <label class="label pd_left">Phone</label>
                                    <input id="phone" name="phone" type="tel"
                                        :class="'input-field flag_dropdown ' +_vClass(_validator.form, 'phone')"
                                        v-model="_validator.form.phone.$model"
                                    />
                                    <div class="invalid-feedback" v-if="_vError(_validator.form, 'phone')">
                                        {{ _vErrorMessage(_validator.form, "phone") }}
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label pd_left">Password</label>
                                    <input placeholder="Enter your Password"
                                        :class="'input-field ' + _vClass(_validator.form, 'password')"
                                        v-model="_validator.form.password.$model"
                                    />

                                    <div class="invalid-feedback" v-if="_vError(_validator.form, 'password')">
                                        {{ _vErrorMessage(_validator.form, "password") }}
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label pd_left">Confirm Password</label>
                                    <input placeholder="Enter Confirm Password"
                                        :class="'input-field ' +_vClass(_validator.form, 'confirmPassword')"
                                        v-model="_validator.form.confirmPassword.$model"
                                    />
                                    <div class="invalid-feedback" v-if="_vError(_validator.form, 'confirmPassword')">
                                        {{ _vErrorMessage(_validator.form, "confirmPassword") }}
                                    </div>
                                </div>

                                <div class="terms_checkbox">
                                    <div class="checkbox">
                                        <input type="checkbox" title="installer agreement" id="agreement-1" value="1"
                                            :class="' ' + _vClass(_validator.form, 'limit')" v-model="form.agreement"
                                        />
                                        <label for="agreement-1" class="checkbox-label"></label>
                                    </div>

                                    <p class="terms-agreement-p">
                                        By creating your account, you agree to our
                                        <a href="#">Terms & Conditions</a> and
                                        <a href="#">PrivacyPolicy</a>
                                    </p>
                                </div>

                                <div class="field btn_margin_top">
                                    <button type="submit" class="btn">Continue</button>
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
                            <img src="assets/images/login_illustration-3-3.png" alt="" />
                        </div>

                        <div class="content">
                            <h2>
                                Quick and<br />Easy Payments
                            </h2>
                            <p>
                                Easily make your payments to shops or services with features
                                like QR Pay
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

<script>

import useVuelidate from "@vuelidate/core";
import { required, sameAs, integer, minLength } from "@vuelidate/validators";

export default 
{
    async created() 
    {
        await this.loadCSS(["assets/css/intlTelInput.css"]);
        await this.loadJS(["assets/javascript/intlTelInput.js"]);

        var intelPhone = setInterval(() => 
        {
            if( window.intlTelInput )
                initializePhoneInput();
        }, 1);

        var that = this;
        function initializePhoneInput()
        {
            var phoneInput = document.querySelector("#phone");
            var itializedIntel=  window.intlTelInput(phoneInput);
            var selectedCountry =itializedIntel.getSelectedCountryData();
            that.form.carrierCode = selectedCountry.dialCode;

            $("#phone").on("countrychange", function () {
                selectedCountry =itializedIntel.getSelectedCountryData();
                that.form.carrierCode = selectedCountry.dialCode;
            });
            clearInterval(intelPhone);
        }

        this.authState = this.$store.getters.auth;
        this.form.email = this.authState.email;
    },
    data()
    {
        return {
            auth: null,
            authState: {},
            form: {
                first_name: "",
                email: "",
                last_name: "",
                type: "user",
                phone: "",
                password: "",
                confirmPassword: "",
                agreement: "",
                carrierCode: null,
            },
        };
    },
    methods: 
    {
        registerUser() 
        {
            this._validator.$validate();
            if (!this._validator.$error)
            {
                let data = {
                    firstName: this.form.first_name,
                    email: this.authState.email,
                    lastName: this.form.last_name,
                    type: this.form.type,
                    phone: this.form.phone,
                    password: this.form.password,
                    confirmPassword: this.form.confirmPassword,
                    carrierCode: this.form.carrierCode,
                };
                
                this.$store.dispatch("RegisterUser", data).then((res) => {
                    if (res.code == 200)
                        this.$router.push("/setpasscode");
                });
            }
        },
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
                first_name: {
                    required,
                },
                last_name: {
                    required,
                },
                phone: {
                    required,
                    integer,
                },
                password: {
                    required,
                    minLength: minLength(6),
                },
                confirmPassword: {
                    required,
                    sameAs: sameAs(this.form.password),
                },
            },
        };
    },
};
</script>