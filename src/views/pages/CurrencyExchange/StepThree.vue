<template>
    <div class="money_card">
							
        <div class="head"><span class="title">Exchange Status</span></div>
        
        <div class="content">
            
            <div class="block">
                <span class="sucess"><img src="assets/images/success-icon.png" alt="" class="">Success!</span>
            </div>
            
            <div class="two_block">
                
                <div class="block">
                
                    <span class="label">Money exchanged from</span>
                    
                    <div class="amount"><span>{{this.$store.getters.getDataCurrencyExchange.currencyFrom}} </span>{{this.$store.getters.getDataCurrencyExchange.fromAmount}}</div>
                    
                </div>
                    
                <div class="middle_exchange-block">
                    
                    <button type="button" class="exchange-btn"><img src="assets/images/exchange-icon.png" alt=""></button>
                
                </div>
                
                <div class="block">
                    
                    <span class="label">Money Exchanged to</span>
                    <div class="amount"><span>{{this.$store.getters.getDataCurrencyExchange.currencyTo}}</span>
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
            
            <div class="block">
                
                <span class="label">Transaction ID</span>
                <div class="note">{{this.$store.getters.getExchangeConfirmData.transactionId}}</div>
                
            </div>
            
            <div class="block">
                
                <span class="label">Transaction Date</span>
                <div class="note">
                    {{vpDate(this.$store.getters.getExchangeConfirmData.dateTime)}}
                </div>
                
            </div>
            
        </div>
            
        <div class="footer">
        
            <div class="submit-btn">
                
                <button @click.prevent="exchangeAgain()" class="btn cancel-btn marg-rt">Exchange Again</button>
                <button @click.prevent="dashboardRedirect()" class="btn">Go to Dashboard</button>
            
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
            exchangeAgain() {
                this.$store.commit('setCurrencyExchangeStep', 1);
            },

            dashboardRedirect() {
                this.$router.push('/dashboard');
            }
        }
    }
</script>