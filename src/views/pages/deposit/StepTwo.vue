<template>
    <div class="two_col_block">
        <form class="form lg-card">
            <div class="inner_width">
                <h2>Enter Payment Method Details</h2>

                <div class="field-two-col field">
                    <label class="label">Card Holder Name</label>
                    <div class="field_block">
                         <input class="input-field" v-model="form.cardHolderName" placeholder="Card Holder Name" :class="_vClass(_validator.form, 'cardHolderName') " />
                    </div>
                </div>

                <div class="field-two-col field">
                    <label class="label">Card Number</label>
                    <div class="field_block">
                        <input class="input-field" v-model="form.cardNumber" placeholder="1284-1241-2349-1241" :class="_vClass(_validator.form, 'cardNumber') " />
                    </div>
                </div>

                <div class="field-two-col field">
                    <label class="label">Expiry Date <span>(MM/YYYY)</span></label>
                    <div class="expires-field field_block">
                        <div class="field">
                            <input class="month input-field" v-model="form.expMonth" placeholder="MM" maxlength="2" :class="_vClass(_validator.form, 'expMonth') " />
                        </div>
                        <i>/</i>
                        <div class="field">
                            <input class="year input-field" v-model="form.expYear" placeholder="YYYY" maxlength="4" :class="_vClass(_validator.form, 'expYear') " />
                        </div>
                    </div>
                </div>

                <div class="field-two-col field cvc-field">
                    <label class="label">CVC</label>
                    <input v-model="form.cvc" class="input-field cvc" placeholder="..."
                        maxlength="3" :class="_vClass(_validator.form, 'cvc') " />
                </div>
            </div>
        </form>

        <div class="right_block">
            <div class="all_paymeny-icon">
                <img
                    src="assets/images/all_payment-method.png"
                    alt=""
                    class=""
                />
            </div>

            <div class="money_card">
                <div class="content" :style="{position:'unset'}">
                    <div class="block">
                        <span class="label">Depositing amount</span>
                        <div class="amount">
                            <span> {{ this.$store.getters.getDepositDetails.currency?.code }} </span> {{ this.$store.getters.getDepositDetails.amount }}
                        </div>
                    </div>

                    <div class="block">
                        <span class="label">Mode of deposit</span>
                        <div class="pay-type"> {{ this.$store.getters.getDepositDetails.paymentMethod?.name }} </div>
                        <div class="charges">Fee <span>(0.00% + 0.00)</span></div>
                    </div>
                </div>

                <div class="submit-btn">
                    <button class="btn cancel-btn marg-rt" @click.prevent="prev">Back</button>
                    <button class="btn" @click.prevent="makeDeposit">Deposit</button>
                </div>
            </div>
        </div>

    </div>

</template>


<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default 
{
    data() {
        return {
            form: {
                cardHolderName: null,
                cardNumber: null,
                expMonth: null,
                expYear: null,
                cvc: null,
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
                cardHolderName: {required},
                cardNumber: {required},
                expMonth: {required},
                expYear: {required},
                cvc: {required},
            }
        }
    },
    methods: {
        makeDeposit()
        {   
            this._validator.$validate()
            if(!this._validator.$error){

                this.$store.dispatch("createDeposit", { ...this.form }).then((res) => {
                    if(res.code==200)
                    {

                        this.$store.commit("setDepositDetails", { step: 3 });
                    }

                    
                })
            }
            
        },
        prev()
        {
            this.$store.commit("setDepositDetails", { step: 1 });
        }
    },
    mounted() {

    },
};
</script>