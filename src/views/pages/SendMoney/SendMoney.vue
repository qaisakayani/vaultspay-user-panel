<template>
    
    <div class="main_content">
        
        <div class="inner_block">
            
            <BreadCrumb
                :pageHeader="{
                     baseTitle: 'Dashboard', baseURl: '/',
                     pageTitle:'Send Money',pageHeading:'Send Money',
                     icon:'assets/images/send_money.png',
                     pageDescription:'Send money to a receiver or payee by entering their email address.',
                                 }"
            />
            

            <div class="horizontal-line">

            </div>
            <form class="form ">
                <div class="">
                    <StepOne v-if="this.$store.getters.getSendMoneyStep==1"></StepOne>
                    <StepTwo v-if="this.$store.getters.getSendMoneyStep==2"></StepTwo>
                    <StepThree v-if="this.$store.getters.getSendMoneyStep==3"></StepThree>
                </div>  
            </form>  
        </div>
    </div>
    
</template>

<script>
    import StepOne from "./StepOne";
    import StepTwo from "./StepTwo";
    import StepThree from "./StepThree";
    import useVuelidate from "@vuelidate/core";
    import { required } from "@vuelidate/validators";

    export default {

        setup() {
            return {
              v$: useVuelidate(),
            };
        },

        data() {

            return {
                sendMoney: {
                    currencyId: 1,
                    amount: null,
                    channelId: 1,
                    schemaIds: [],
                    type: null,
                    expiresIndays: null,
                    expiresInhours: null,
                    expiresInminutes: null,
                    redirectUrl: null,
                    callbackUrl: null,
                    receiptNo: null,
                    email: null,
                    phone: null,
                    paymentFor: null,
                },
            };

        },

        components: {
            StepOne,
            StepTwo,
            StepThree
        },

        validations() {
            return {
                sendMoney: {
                    currencyId: { required },
                    channelId: { required },
                    schemaIds: { required },
                    type: { required },
                    expiresIndays: { required },
                    expiresInhours: { required },
                    expiresInminutes: { required },
                },
            };
        },

        created() {
            this.$store.commit("setSendMoneyStep", 1);
        }
    };
</script>
