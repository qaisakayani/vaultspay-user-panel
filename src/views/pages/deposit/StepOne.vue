<template>
    <form class="form lg-card">
        <div class="inner_width">
            
            <div class="field-two-col field baseline">
                <label class="label">Deposit to</label>
                
                <div class="field_block">
                    <select class="select-field input-field" @change="changeCurrency($event.target.value)" v-model="_validator.form.currencyId.$model" :class="_vClass(_validator.form, 'currencyId') ">
                        <option value="">Select Currency</option>
                        <option 
                            v-for="(currency, index) in this.$store.getters.getAllowedCurrencies" 
                            :key="index" 
                            :value="currency.id"
                            :selected="this.$store.getters.getDepositDetails?.currency?.id == currency.id"
                        >
                            {{ currency.code }}
                        </option>
                    </select>
                    <div class="invalid-feedback" v-if="_vError(_validator.form, 'currencyId')">
                            {{ _vErrorMessage(_validator.form, "currencyId") }}
                    </div>
                    <div class="avail_bal" v-if="this.$store.getters.getDepositDetails?.wallet">Available Balance: <span> {{ this.$store.getters.getDepositDetails?.wallet?.available_balance }} {{ this.$store.getters.getDepositDetails?.wallet?.currency?.code }} </span></div>
                    <div class="avail_bal" v-else>  <span> No wallet found! </span></div>
                </div>
            </div>
            
            <div class="field-two-col field flex-start">
                <label class="label">Amount</label>
                <div class="field_block">
                    <input placeholder="AED0.00" 
                        v-model="_validator.form.amount.$model"
                    class="input-field amount-field"
                    :class="_vClass(_validator.form, 'amount') "
                    >
                    
                    <div class="suggestion mar-btm-0"> 
                        <span class="amount" @click="this.form.amount=500"> 500</span> 
                        <span class="amount" @click="this.form.amount=1000">1000</span> 
                        <span class="amount" @click="this.form.amount=1500">1500</span> 
                        <span class="amount" @click="this.form.amount=2000">2000</span> 
                    </div>
                    <div class="invalid-feedback" v-if="_vError(_validator.form, 'amount')">
                            {{ _vErrorMessage(_validator.form, "amount") }}
                    </div>
                </div>
            </div>
            
            <div class="field-two-col field baseline">
                <label class="label">Mode Of Deposit</label>
                
                <div class="field_block">
                    <select class="select-field input-field" @change="changePaymentMethod($event.target.value)"  v-model="_validator.form.method.$model" :class="_vClass(_validator.form, 'method') ">
                        <option value="">Select Method</option>
                        <option v-for="(method, index) in this.$store.getters.getAllowedPaymentMethods" 
                            :key="index" 
                            :value="method.id"
                            :selected="this.$store.getters.getDepositDetails?.method?.id == method.id"
                        >
                            {{ method.name }}
                        </option>
                    </select>
                    <div class="avail_bal">Fee: <strong>(0.00% + 0.00)</strong></div>
                    </div>
            </div>
            
        
            <div class="field-two-col field">
                <label class="label empty-label"></label>
                <div class="submit-btn">
                    <button class="btn" @click.prevent="next()">Next</button>
                </div>
            </div>
            
        </div>
    </form>
</template>


<script>
 import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default 
{

    data() {
        return {
            
            wallet: false,
            form:
            {
                currencyId:'',
                amount:null,
                method:''
            }
        };
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
                currencyId:{required},
                amount:{required},
                method:{required}
            }
        }
    },
    methods: 
    {
        changePaymentMethod(methodId)
        {
            this.$store.commit("setDepositDetails", { paymentMethod: this.$store.getters.getPaymentMethodById(methodId) });
            this.checkBalanceAndLimits();
        },

        changeCurrency(currencyId)
        {
            this.wallet = this.$store.getters.getWalletByCurrencyId(currencyId);
            this.$store.commit("setDepositDetails", { wallet: this.wallet,  currency: this.$store.getters.getCurrencyById(currencyId) });
            this.$store.dispatch("fetchAllowedPaymentMethods", {type:'DEPOSIT', currencyId: currencyId });
        },

        checkBalanceAndLimits()
        {
            var userAccountId = this.$store.getters.getDepositDetails.wallet?.id;
            var paymentMethodId = this.$store.getters.getDepositDetails.paymentMethod?.id;
            
            this.$store.dispatch("fetchBalanceAndLimits", {type: "DEPOSIT", userAccountId, paymentMethodId, amount: this.form.amount })
            .then( () => {
                this.$store.commit("setDepositDetails", { ...this.$store.getters.getBalanceAndLimits, amount: this.form.amount });
            });
        },
        
        next()
        {
            this._validator.$validate()
            if(!this._validator.$error){

                this.$store.commit("setDepositDetails", { step: 2 });
            }
        }
    },
    mounted() 
    {
        
    },
};
</script>