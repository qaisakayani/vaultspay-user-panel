<template>
    <div v-if="this.$store.getters.getTransactions">
        <div id="completed" class="tabcontent active">
            <div class="table_block">
                <table>
                <tr>
                        <th>Transaction</th>
                        <th>Method</th>
                        <th>Total Amount</th>
                        <th>Fee</th>
                        <th>VAT</th>
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
                        <span
                            ><strong class="from">Received from</strong>
                            {{
                            transaction.receiver.first_name +
                            " " +
                            transaction.receiver.last_name
                            }}</span
                        >
                        </div>
                    </div>
                    </td>

                    <td>
                    <div class="pay_method">
                        <span>{{ transaction.payment_method.name }}</span>
                    </div>
                    </td>
                    <td>
                    <span class="amount">{{
                        vpNum(transaction.total_amount) +
                        " " +
                        transaction.currency.code
                    }}</span>
                    </td>

                    <td>
                    <span class="amount">{{
                        vpNum(transaction.fee) + " " + transaction.currency.code
                    }}</span>
                    </td>
                    <td>
                    <span class="amount">{{
                        vpNum(transaction.vat) + " " + transaction.currency.code
                    }}</span>
                    </td>
                    <td>
                    <span class="date">{{ vpDate(transaction.created_at) }}</span>
                    </td>
                    <td class="txt_center">
                    <div id="more-action" class="more-action">
                        <a
                        href="javascript:void(0)"
                        @click="toggleClass(`dropdown-content-${transaction.id}`)"
                        class="action"
                        ><img src="assets/images/dots-icons.png" alt=""
                        /></a>
                        <div
                        class="drop_down_content action_details"
                        v-bind:id="`dropdown-content-${transaction.id}`"
                        >
                        <a
                            href="#"
                            class="link"
                            @click.prevent="transactionDetails(transaction.uuid)"
                            >Details</a
                        >
                        <a
                            href="#"
                            class="link last"
                            @click.prevent="transactionAttempts(transaction.uuid)"
                            >Attempts</a
                        >
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
        async created() 
        {
            await this.$store.dispatch("fetchTransactions",{
                    page: 1, perPage: this.getConfig("PER_PAGE"),
                    status: 2,
                    search: this.search,
                });
        },
        methods: {
            transactionDetails(id) {
            this.$router.push(`/transaction-details/${id}`);
            },
            transactionAttempts(id) {
            this.$router.push(`/transaction-attempts/${id}`);
            },
        },
    };
</script>

