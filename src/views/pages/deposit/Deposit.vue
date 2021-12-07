<template>
    <div class="main_content">
        <div class="inner_block">
                <BreadCrumb
                        :pageHeader="{
                        baseTitle: 'Dashboard', baseURl: '/',
                        pageTitle:'Deposit Money',pageHeading:'Deposit Money',
                        icon:'assets/images/deposit_money-icon.png',
                        pageDescription:'Deposit money to your VaultsPay wallet.',
                                    }"
                />    
            

                <div class="horizontal-line"></div>

                <StepOne
                    v-if="this.$store.getters.getDepositDetails.step == 1"
                />

                <StepTwo
                    v-if="this.$store.getters.getDepositDetails.step == 2"
                />

                <StepThree
                    v-if="this.$store.getters.getDepositDetails.step == 3"
                />
            
         </div>
    </div>
</template>


<script>
import StepOne from "./StepOne.vue";
import StepTwo from "./StepTwo.vue";
import StepThree from "./StepThree.vue";

export default 
{
    components: {
        StepOne,
        StepTwo,
        StepThree,
    },

    data()
    {
        return {
            
        };
    },

    methods: 
    {
        
    },
    
    mounted() 
    {
        this.$store.dispatch("fetchAllowedCurrencies", { type: "DEPOSIT" })
        .then(() => {
            
            this.$store.commit("setDepositDetails", { 
                currency: this.$store.getters?.getAllowedCurrencies[0],
                wallet: this.$store.getters.getWalletByCurrencyId(this.$store.getters.getAllowedCurrencies[0]?.id)
            });
            this.$store.dispatch("fetchAllowedPaymentMethods", { type:'DEPOSIT', currencyId: this.$store.getters.getAllowedCurrencies[0]?.id });
        });
        if(this.$store.getters.getDepositDetails?.stepList==3)
        {
            this.$store.commit("setDepositDetails", { step: 1 });
        }
    },
};
</script>