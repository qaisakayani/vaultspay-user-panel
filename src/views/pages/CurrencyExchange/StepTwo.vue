<template>
    <div class="money_card">
							
        <div class="head"><span class="title">Confirm Exchange</span></div>
        
            <div class="content">
            
                <div class="two_block pd-20">
                    <div class="block">
                        <span class="label">Money exchanged from</span>
                        <div class="amount amount-lg">
                            <span>{{this.$store.getters.getDataCurrencyExchange.currencyFrom}}</span>
                            {{this.$store.getters.getDataCurrencyExchange.fromAmount}}
                        </div>  
                    </div>
                        
                    <div class="middle_exchange-block">
                        <button type="button" class="exchange-btn"><img src="assets/images/exchange-icon.png" alt=""></button>
                    </div>

                    <div class="block">
                        
                        <span class="label">Money Exchanged to</span>
                        <div class="amount amount-lg"><span>{{this.$store.getters.getDataCurrencyExchange.currencyTo}}</span>
                            {{this.$store.getters.getDataCurrencyExchange.toAmount}}
                        </div>
                        
                    </div>
                </div>
                
                <div class="exchange_money">

                    <div class="content">

                    <div class="exc-item">
                        
                        <span class="title black_color">Exchange Rate</span>
                        <strong class="blue_color"><b>(1.00{{this.$store.getters.getDataCurrencyExchange.currencyFrom}} = {{this.$store.getters.getDataCurrencyExchange.currencyExchangeRate + " " + this.$store.getters.getDataCurrencyExchange.currencyTo}})</b></strong>
                    
                    </div>
                
                <div class="exc-item">
                    
                    <span class="title">Fee</span>
                    <strong>{{this.$store.getters.getDataCurrencyExchange.exchangeFee + " " + this.$store.getters.getDataCurrencyExchange.currencyFrom}}</strong>
                
                </div>
                
                <div class="exc-item">
                    
                    <span class="title">VAT</span>
                    <strong>{{this.$store.getters.getDataCurrencyExchange.vatText + " " + this.$store.getters.getDataCurrencyExchange.currencyFrom}}</strong>
                
                </div>
                
                </div>
            </div>
                
        
                
            </div>
                
            <div class="footer">
            
                <div class="submit-btn">
                    <button class="btn cancel-btn marg-rt" @click.prevent="back()">Back</button>
                    <button class="btn" @click.prevent="confirmExchange()">Next</button>
                </div>
                
            </div>
            
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },

        methods: {
            confirmExchange() {
                var data = {
                    fromAccountId: this.$store.getters.getDataCurrencyExchange.fromAccountId,
                    currencyId: this.$store.getters.getDataCurrencyExchange.currencyId,
                    amount: this.$store.getters.getDataCurrencyExchange.fromAmount,
                }
                this.$store.dispatch("confirmExchangePayment", data).then((res) => {
                    if (res.code == 200) {
                        var data = {
                            transactionId: res.data.transactionId,
                            dateTime: res.data.dateTime
                        }
                        this.$store.commit('setExchangeConfirmData', data);
                        this.$store.commit('setCurrencyExchangeStep', 3);
                    }
                });
            },

            back() {
                this.$store.commit('setCurrencyExchangeStep', 1);
            }
        }
    }
    
</script>