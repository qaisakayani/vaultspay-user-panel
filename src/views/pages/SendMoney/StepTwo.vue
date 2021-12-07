<template>
    
    <div class="money_card">
                        
        <div class="head"><span class="title">Confirm Transaction</span></div>
        <div class="content">
            <div class="block">
                <span class="label">Sending money to</span>
                
                <div class="profile" v-if="this.$store.getters.getSendMoneyData.senderName">

                    <div class="img" v-if="this.$store.getters.getSendMoneyData.isVaultspayUser == true">
                        <img src="assets/images/Account-icon.png" alt="">
                    </div>

                    <div class="tumbnail">
                        <span class="name" v-if="this.$store.getters.getSendMoneyData.isVaultspayUser == true">
                            {{this.$store.getters.getSendMoneyData.senderName}}
                        </span>
                        <span class="name" v-else>
                            {{this.$store.getters.getSendMoneyData.emailOrPhone}}
                        </span>
                        <div class="user" v-if="this.$store.getters.getSendMoneyData.isVaultspayUser == true">
                            <span>Vaults</span><strong>Pay</strong> User
                        </div>
                        <div class="user" v-else>
                            <span>Not Vaults</span><strong>Pay</strong> User
                        </div>
                    </div>
                </div>	
                <div class="profile" v-else>

                    <div class="img">
                        <img src="assets/images/mail-icon.png" alt="">
                    </div>

                    <div class="tumbnail">
                        <span class="name" >
                           {{this.$store.getters.getSendMoneyData.emailOrPhone}}
                        </span>
                        <div class="user">
                          <span>  Not a Vaults </span><strong>Pay</strong> User
                        </div>	
                    </div>
                </div>	
                
            </div>
            
            <div class="block">
                
                <span class="label">Sending money</span>
                <div class="amount">
                    <span>{{this.$store.getters.getSendMoneyData.currencyName}}</span>
                    {{this.$store.getters.getSendMoneyData.amount}}
                </div>
                
            </div>
            
            <div class="block">

                <span class="label">Transfer note</span>
                <div class="note">
                    {{this.$store.getters.getSendMoneyData.transferNote}}
                </div>
                
            </div>
            
        </div>
            
        <div class="footer">
        
            <div class="submit-btn">
                <button class="btn cancel-btn marg-rt" @click.prevent="backFun()">Back</button>
                <button class="btn" @click.prevent="handleSubmit()">Confirm & send</button>
            </div>
            
        </div>
                        
    </div>

</template>

<script>

    export default {

        data() {

            return {
            };

        },

        created() {
            console.log("sadadad:", this.$store.getters.getSendMoneyData.senderName)
        },
         
        methods: {
    
            handleSubmit(e) {     
                this.$store
                .dispatch("confirmSendMoney", {
                    transactionHash: this.$store.getters.getSendMoneyData.transactionHash
                    }).then((res) => {
                    if (res.code == 200) {
                        this.$store.commit("setSendMoneyData", {
                            transactionId: res.data.transactionId,
                            transactionDate: res.data.dateTime
                        });
                        this.$store.commit("setSendMoneyStep", 3);
                    }
                });
            },

            backFun(){
                this.$store.commit("setSendMoneyStep", 1);
            }
        },
    };
</script>

