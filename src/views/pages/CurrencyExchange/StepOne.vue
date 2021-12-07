<template class="">
    <div class="lg-card">
    <div class="exchange_two_col_block ">	
    
        <div class="left_block">
            <form class="form ">
                
            <div class="inner_width">
                
                <div class="field-two-col field baseline">
                    <label class="label">Exchange from</label>
                    
                    <div class="field_block">
                    <select class="select-field input-field"
                        v-model="currencyExchange.fromCurrency"
                        @change="selectedWalletBalance()">
                        <option v-for="(wallet, index) in this.$store.getters.getWalletList" 
                        :value="wallet.currency.code" :key="index">{{wallet.currency.code}}</option>
                    </select>
                    <div class="avail_bal">
                        Available Balance: <span>{{selectedCurrency + " " +  vpNum(avaliableBalance)}}</span>
                    </div>
                    </div>
                </div>		
            
                <div class="field-two-col field flex-start">
                    <label class="label">Exchange from<br> Amount</label>
                    <div class="field_block">
                        <input placeholder="AED0.00"
                         v-model="currencyExchange.amount" 
                         @keyup="getCurrencyExchangeDetails()"
                         class="input-field amount-field"
                         :class="_vClass(_validator.currencyExchange, 'amount')"
                         >
                        <div class="suggestion"> 
                            <span class="amount"  @click="this.currencyExchange.amount=500,getCurrencyExchangeDetails()"> 500</span> 
                            <span class="amount" @click="this.currencyExchange.amount=1000,getCurrencyExchangeDetails()">1000</span> 
                            <span class="amount" @click="this.currencyExchange.amount=1500,getCurrencyExchangeDetails()">1500</span> 
                            <span class="amount" @click="this.currencyExchange.amount=2000,getCurrencyExchangeDetails()">2000</span> 
                        </div>
                        
                    </div>
                    
                </div>
                <!-- <div class="invalid-feedback" v-if="_vError(_validator.currencyExchange, 'amount')">
                    {{ _vErrorMessage(_validator.currencyExchange, "amount") }}
                </div> -->
                
            </div>
        </form>
        </div>
        
        <div class="middle_exchange-block">
            <button type="button" class="exchange-btn"><img src="assets/images/exchange-icon.png" alt=""></button>
        </div>
        
        <div class="right_block">
            
            <form class="form ">
                
                <div class="inner_width">
                    
                    <div class="field-two-col field baseline">
                        <label class="label">Exchange to</label>
                        
                        <div class="amount_block">
                            <select class="select-field input-field excange-to"
                                v-model="currencyData"
                                @change="selectedToCurrency"
                            >
                                
                                <option v-for="(currency, index) in this.$store.getters.getCurrencyList" 
                                    :value="{ id: currency.id, text: currency.code }" :key="index">{{currency.code}}
                                </option>
                                
                            </select>
                            <div class="avail_bal">
                                <!-- Available Balance: <span>AED2038.13</span> -->
                            </div>
                        </div>
                    </div>		
                
                    <div class="field-two-col field flex-start">
                        <label class="label">Exchange to<br> Amount</label>
                        <div class="amount_block">
                            
                            <input placeholder="AED0.00" 
                                v-model="exchangeAmount"
                                class="input-field amount-field"
                                disabled

                                >
                            <!-- <div class="suggestion"> 
                                <span class="amount">500</span> 
                                <span class="amount">1000</span> 
                                <span class="amount">1500</span> 
                                <span class="amount">2000</span> 
                            </div> -->
                            
                        </div>
                    </div>
                
                </div>

            </form>
        
        </div>
    
    </div>	
    
    <div class="exchange_money" v-if="exchangeAmount">
        <div class="content">
            <div class="exc-item">
                
                <span class="title black_color">Exchange Rate</span>
                <strong class="blue_color"><b>(1.00 {{ currencyExchange.fromCurrency }} = {{ vpNum(currencyExchangeRate) }} {{ currencyExchange.toCurrency }})</b></strong>
            
            </div>
            
            <div class="exc-item">
                
                <span class="title">Fee</span>
                <strong>{{exchangeFee + " " + currencyExchange.fromCurrency}}</strong>
            
            </div>
            
            <div class="exc-item">
                
                <span class="title">VAT</span>
                <strong>{{ vatText + " " + currencyExchange.fromCurrency }}</strong>
            
            </div>
            
        </div>
    </div>
    
    <div class="submit-btn text-align-right">
        <button class="btn cancel-btn marg-rt" @click="cancel()">Cancel</button>
        <button class="btn" :class="{'disable-input': isDisabled}" @click="next()" :disabled="isDisabled">Next</button>
    </div>
</div>
</template>

<script>
   
    import useVuelidate from "@vuelidate/core";
    import { required } from "@vuelidate/validators";

    export default {

        setup() {
            return {
              _validator: useVuelidate(),
            };
        },

        data() {
    
            return {
                isDisabled: true,
                submitted: false,
                exchangeFee: null,
                vatText: null,
                exchangeAmount: null,
                currencyExchangeRate: null,
                currencyData: null,
                timeout: null,
                value: '',
                outputValue: '',
                currencyExchange: {
                    amount: null,
                    currencyId: null,
                    fromAccountId: null,
                    fromCurrency: null,
                    toCurrency: null,
                }
            };

        },
       
        validations() {
            return {
                
                currencyExchange: {
                    amount: { required },
                },
            };
        },

        created() {
            this.getWalletList();
            this.getAllowedCurrencies();
            this.$store.commit("getCurrentAccountId");
        },
        
        methods: {

            getWalletList() {
                this.$store.dispatch("fetchWalletList").then((res) => {
                    this.currencyExchange.fromCurrency = this.$store.getters.getWalletList[0].currency.code;
                    this.selectedCurrency = this.$store.getters.getWalletList[0].currency.code;
                    this.avaliableBalance = this.$store.getters.getWalletList[0].available_balance;
                    this.currencyExchange.fromAccountId = this.$store.getters.getWalletList[0].id;
                });
            },

            getAllowedCurrencies() {
                this.$store.dispatch("fetchCurrencies").then((res) => {
                    this.currencyData = { 
                        id: this.$store.getters.getCurrencyList[0].id, 
                        text: this.$store.getters.getCurrencyList[0].code
                    };
                });
            },

            getCurrencyExchangeDetails() {
                this.submitted = true;
                this.isDisabled = true;
                this._validator.$validate();
                if (!this._validator.$error ) {

                    this.currencyExchange.currencyId = this.currencyData.id;   
                    this.currencyExchange.toCurrency = this.currencyData.text;
                    var self = this;
                    clearTimeout(self.timeout);
                    self.timeout = setTimeout(function () {
                        // enter this block of code after 1 second
                        // handle stuff, call search API etc.
                        // console.log('searching:', self.value);
                        self.$store
                        .dispatch("iniateCurrencyExchange", self.currencyExchange).then((res) => {
                            if (res.code == 200) {
                                self.currencyExchangeRate = res.data.exchangeRate;
                                self.exchangeAmount = self.vpNum(res.data.transactionAmount);
                                self.exchangeFee = self.vpNum(res.data.fee);
                                self.vatText = self.vpNum(res.data.vat);
                                self.isDisabled = false;
                                let data = {
                                    currencyFrom: self.currencyExchange.fromCurrency,
                                    currencyTo: self.currencyExchange.toCurrency,
                                    fromAmount: self.currencyExchange.amount,
                                    toAmount: self.vpNum(res.data.transactionAmount),
                                    currencyExchangeRate: self.vpNum(res.data.exchangeRate),
                                    exchangeFee: self.vpNum(res.data.fee),
                                    vatText: self.vpNum(res.data.vat),
                                    fromAccountId: self.currencyExchange.fromAccountId,
                                    currencyId: self.currencyExchange.currencyId,
                                }
                                self.$store.commit('setDataCurrencyExchange', data);
                            } else {
                                // this.$toast.success(res.message, { position: "top-right" });
                            }
                    });
                        // self.outputValue = self.value;
                    }, 800);
                   
                    
                } else {
                  return;
                }
            },

            selectedWalletBalance(){
                var walletId = this.currencyExchange.fromCurrency;
                var newArray = this.$store.getters.getWalletList.filter(function (el) {
                    return el.currency.code == walletId;
                });
                this.avaliableBalance = newArray[0].available_balance;
                this.currencyExchange.fromAccountId = newArray[0].id;
                this.$store.commit("setCurrency", 
                                newArray[0].currency.code);
                this.getCurrencyExchangeDetails();
            },

            selectedToCurrency(){
                var selectedToCurrencyid = this.currencyData.id;
                // var newArray = this.$store.getters.getCurrencyList.filter(function (el) {
                //     return el.code == selectedToCurrency;
                // });
                this.getCurrencyExchangeDetails();
                // this.avaliableBalance = newArray[0].available_balance;
                // this.$store.commit("setCurrency", 
                //                 newArray[0].currency.code);
            },

            cancelFun(){
               this.$router.push("/dashboard");
            },

            next() {  
                this.$store.commit('setCurrencyExchangeStep', 2);
            },
            
            cancel() {  
                this.$router.push('/dashboard');
            }

        },
    };
</script>

<style scoped>
    .feedback{display: none}

    .invalid-feedback {
        color: #dc3545;
        font-size: 12px;
        /* padding-top: 10px; */
        font-family: 'Spartan MB Regular';
        display: block;
        margin-top: -40px;
        align-items: center;
        margin-left: 198px;
        margin-bottom: 13px;
    }
    .excange-to {
        width: 255px !important;
    }
    .disable-input {
        background-color: gray;
        cursor: not-allowed;
    }
    
</style>

