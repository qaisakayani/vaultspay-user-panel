<template>
    <div v-if="this.$store.getters.getTransactions">
        <div id="completed" class="tabcontent active">
            <div class="table_block">
                <table>
                    <tr>
                        <th>Sender</th>
                        <th>Receiver</th>
                        <th>Transaction ID</th>
                        <th>Method</th>
                        <th>Total Amount</th>
                        <th>Fee</th>
                        <th>VAT</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>

                    <tr v-for="transaction in this.$store.getters.getTransactions.data" :key="transaction.id">
                        
                        <td>
                            <div class="reciver">
                                <div class="icon">
                                    <img src="assets/images/received-icon.png" alt="" />
                                </div>
                                <div class="name">
                                    <span>
                                        <strong class="from">
                                            {{ transaction.sender_account_number }}
                                        </strong>
                                        {{ transaction.sender_account_title }}
                                    </span>
                                </div>
                            </div>
                        </td>
                        
                        <td>
                            <div class="reciver">
                                <div class="icon">
                                    <img src="assets/images/received-icon.png" alt="" />
                                </div>
                                <div class="name">
                                    <span>
                                        <strong class="from">
                                            {{ transaction.receiver_account_number }}
                                        </strong>
                                        {{ transaction.receiver_account_title }}
                                    </span>
                                </div>
                            </div>
                        </td>

                        <td>
                            <div class="reciver">
                                <div class="name">
                                    <span>
                                        <strong class="from">
                                            Tranx ID: {{ transaction.uuid }}
                                        </strong>
                                         Reference: {{ transaction.gateway_reference_id }}
                                    </span>
                                </div>
                            </div>
                        </td>

                        <td>
                            <div class="pay_method">
                                <span>{{ transaction.payment_method.name }}</span>
                            </div>
                        </td>
                        <td>
                            <span class="amount"> {{ vpNum(transaction.total_amount) + " " + transaction.currency.code }}</span>
                        </td>

                        <td>
                            <span class="amount">{{ vpNum(transaction.fee) + " " + transaction.currency.code }}</span>
                        </td>
                        <td>
                            <span class="amount">{{ vpNum(transaction.vat) + " " + transaction.currency.code }}</span>
                        </td>

                        <td>
                            {{ transaction.transaction_type.name }}
                        </td>
                        
                        <td>
                            <span class="date">{{ vpDate(transaction.created_at) }}</span>
                        </td>

                        <td class="txt_center">
                            <div id="more-action" class="more-action">
                                <a href="#" class="action"><img src="assets/images/dots-icons.png" alt=""></a>
                                <div class="drop_down_content action_details">

                                    <router-link :to="'/transaction-details/'+transaction.uuid" class="link">Details</router-link>
                                    <!-- <router-link to="/customers" class="link">Charges</router-link> -->
                                    <div class="arrow-right"></div>
                                
                                </div>
                            </div>
                        </td>
                            
                    </tr>

                </table>
            </div>
        </div>
        <Pagination 
            :pagination=this.$store.getters.getTransactions.pagination
            fetchAction="fetchTransactions"
        />
    </div>
</template>

<script>
    export default 
    {
        data() {
            return {
                
            };
        },
        created() 
        {
            this.getFilteredTransactions();
        },
        methods: 
        {
            async getFilteredTransactions()
            {
                await this.$store.dispatch("fetchTransactions", {});
            },
            transactionDetails(id) {
                this.$router.push(`/transaction-details/${id}`);
            },
            transactionAttempts(id) {
                this.$router.push(`/transaction-attempts/${id}`);
            },
        },
    };
</script>

