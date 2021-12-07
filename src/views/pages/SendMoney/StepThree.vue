<template>
    <div class="money_card">
							
        <div class="head"><span class="title">Confirm Transaction</span></div>
        
        <div class="content">
            
            <div class="block">

                <span class="sucess"><img src="assets/images/success-icon.png" alt="" class="">Success!</span>
            
            </div>
            
            <div class="block">

                <span class="label">Money send successfully to</span>
                <div class="email">{{this.$store.getters.getSendMoneyData.emailOrPhone}}</div>
                
            </div>
            
            <div class="block">

                <span class="label">Sending money</span>
                <div class="amount">
                    <span>{{this.$store.getters.getSendMoneyData.currency}}</span>
                    {{this.$store.getters.getSendMoneyData.amount}}
                </div>
                
            </div>
            
            <div class="block">

                <span class="label">Transaction ID</span>
                <div class="note">{{this.$store.getters.getSendMoneyData.transactionId}}</div>
                
            </div>
            
            <div class="block">
                
                <span class="label">Transaction Date</span>
                <div class="note">{{vpDate(this.$store.getters.getSendMoneyData.transactionDate)}}</div>
                
            </div>
            
        </div>
            
        <div class="footer">
        
            <div class="submit-btn">
                <button class="btn cancel-btn marg-rt" @click="sendAgainFun()">Send Again</button>
                <button class="btn" @click="redirectDashboard()">Go to Dashboard</button>
            </div>
            
        </div>
							
	</div>
</template>

<script>
    export default {
        
        methods: {

            sendAgainFun(){
                this.$store.commit("setSendMoneyStep", 1);
            },

            redirectDashboard(){
                this.$router.push("/dashboard");
            }
        }
    }
   
</script>