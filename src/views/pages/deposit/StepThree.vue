<template>

    <div class="money_card">
        <div class="head">
            <span class="title">Transaction Completed</span>
        </div>

        <div class="content">
            <div class="block">
                <span class="sucess">
                <img src="assets/images/success-icon.png" alt="" class="" />Success!</span>
            </div>

            <div class="block">
                <span class="label">Deposit successful!</span>
                <div class="email"> </div>
            </div>

            <div class="block">
                <span class="label">Creadit Amount</span>
                <div class="amount"><span> {{ this.$store.getters.getDepositDetails.currency?.code }} </span> {{ this.$store.getters.getDepositDetails.amount }} </div>
            </div>

            <div class="block">
                <span class="label">Transaction ID</span>
                <div class="note"> {{ this.$store.getters.getDepositTransaction.transactionId }} </div>
            </div>

            <div class="block">
                <span class="label">Transaction Date</span>
                <div class="note"> {{ vpDate(this.$store.getters.getDepositTransaction.dateTime) }} </div>
            </div>
        </div>

        <div class="footer">
            <div class="submit-btn">
            
			</div>
            <div class="submit-btn">
                <button class="btn cancel-btn marg-rt" @click="prev()">Deposit Again</button>
                <router-link class="" to="/">
                <button class="btn">Go to Dashboard</button>
                </router-link>
            </div>
        </div>
        
    </div>

</template>


<script>

export default 
{

    data() {
        return {
            
        };
    },
    methods: {
        prev()
        {
            this.$store.commit("setDepositDetails", { step: 1 });
        }
    },
    created(){

    },
    mounted() {
       this.$store.commit("setDepositDetails", { stepList: 3 }); 
    },
};
</script>