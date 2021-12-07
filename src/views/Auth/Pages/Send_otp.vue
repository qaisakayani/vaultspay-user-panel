<template>
    <div class="wrapper fadeInDown">
        <div id="formContent">
            <!-- Tabs Titles -->

            <!-- Icon -->
            <div class="fadeIn first">
                <img src="assets/img/logo.svg" id="icon" alt="User Icon" />
            </div>

            <!-- Login Form -->
            <form @submit.prevent="handleSubmit">
                <input
                    type="text"
                    v-model="v$.email.$model"
                    id="login"
                    class="fadeIn second"
                    name="email"
                    placeholder="Enter Your  Email ID"
                />
                <!-- <div class="input-errors" v-for="(error, index) of v$.email.$errors" :key="index">
        <small class="error-msg text-danger">{{ error.$message }}</small>
      </div> -->
                <input type="submit" class="fadeIn fourth" value="Continue" />
            </form>
        </div>
    </div>
</template>
<style scoped>
    @import "/../assets/demo/auth.css";
</style>
<script>
    import useVuelidate from "@vuelidate/core";
    import { required, email } from "@vuelidate/validators";

    export default {
        name: "otp",
        setup() {
            return { v$: useVuelidate() };
        },
        data() {
            return {
                email: "",
            };
        },
        methods: {
            handleSubmit() {
                this.v$.$validate(); // checks all inputs
                if (!this.v$.$error) {
                    // if ANY fail validation
                    let data = {
                        email: "kayaniqaisar@gmail.com",
                        application: "webMerchant",
                        applicationVersion: "1.33",
                        deviceId: "XYXYXYXYXYXYXYX",
                        deviceDetail: "XYXYXYXYXYXYXYX",
                    };
                    this.makeRequest("POST", "api/v1/verify-email", data).then(
                        (data) => {
                            console.log(data);
                        }
                    );
                    // this.$store.dispatch('Auth_Sendopt',{email:this.email}).then((value) => {
                    //   console.log(value)
                    // })
                }
            },
        },
        validations() {
            return {
                email: {
                    required,
                    email,
                },
            };
        },
    };
</script>
