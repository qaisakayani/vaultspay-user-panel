<template>
    <div class="main_content">
        <div class="inner_block">

             <BreadCrumb
                :pageHeader="{
                     baseTitle: 'Dashboard', baseURl: '/',
                     pageTitle:'Currency Exchange',pageHeading:'Currency Exchange',
                     icon:'assets/images/exchange-money-icon.png',
                     pageDescription:'Exchange currency in your VaultsPay wallets to any other available currencies.',
                                 }"
            />

            <div class="horizontal-line"></div>

            <StepOne v-if="this.$store.getters.getCurrencyExchangeStep == 1"></StepOne>
            <StepTwo v-if="this.$store.getters.getCurrencyExchangeStep == 2"></StepTwo>
            <StepThree v-if="this.$store.getters.getCurrencyExchangeStep == 3"></StepThree>
        
        </div>
	</div>
</template>

<script>
    import StepOne from "./StepOne.vue";
    import StepTwo from "./StepTwo.vue";
    import StepThree from "./StepThree.vue";

    export default {
        data() {
            return {

            }
        },
        created() {
            this.$store.commit('setCurrencyExchangeStep', 1);
        },
        components: {
            StepOne,
            StepTwo,
            StepThree
        }
    }
</script>
