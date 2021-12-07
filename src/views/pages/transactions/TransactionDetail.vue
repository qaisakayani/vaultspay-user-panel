<template>
    <div class="main_content">
        <div class="inner_block" v-if="this.$store.getters.getTransaction">

            <div class="title-heading">
                <h1>Transaction Details</h1>
            </div>

            <div class="detail_trans">
                <div class="boxes">

                    <div class="card-box">
                        <div class="badge green_bg">Customer</div>
                        <div class="from_cust">From</div>

                        <div class="name">
                            {{ this.$store.getters.getTransaction.sender.first_name + " " + this.$store.getters.getTransaction.sender.last_name }}
                        </div>
                        
                        <div class="email"> {{ this.$store.getters.getTransaction.sender.email ?? "" }} </div>
                        <div class="ph_no"> {{ "" }} </div>
                    </div>

                    <div class="card-box">
                        <div class="badge blue_bg">Merchant</div>
                        <div class="from_cust">To</div>
                        
                        <div class="name">
                            {{ this.$store.getters.getTransaction.receiver.first_name + " " + this.$store.getters.getTransaction.receiver.last_name }}
                        </div>

                        <div class="address">
                            <a href="#" target="_blank"> {{ this.$store.getters.getTransaction.receiver.email ?? "" }} </a>
                        </div>
                    </div>
                </div>

                <div class="status_block">
                    <div class="tran_no">
                        Transaction: 
                        <span>#{{ this.$store.getters.getTransaction.uuid ?? "" }}</span>
                    </div>

                    <div class="date">Date: <span>{{ vpDate(this.$store.getters.getTransaction.created_at ?? "", "DD MMM YYYY, LT") }}</span></div>

                    <div class="types">

                        <div class="status">
                            <strong>Transaction Status</strong> 
                            <span v-if="this.$store.getters.getTransaction.status == 1">Success</span>
                            <span v-else-if="this.$store.getters.getTransaction.status == 0">Pending</span>
                            <span v-else-if="this.$store.getters.getTransaction.status == 2">Failed</span>
                        </div>

                        <div class="pipeline">|</div>
                        <div class="status">
                            <strong>Settlement Status</strong>
                            <span class="not-settled" v-if="this.$store.getters.getTransaction.settlement_status == 0"> Not Settled </span>
                            <span class="not-settled" v-else-if="this.$store.getters.getTransaction.settlement_status == 1">Initiated</span>
                            <span class="not-settled" v-else-if="this.$store.getters.getTransaction.settlement_status == 2">Cancelled</span>
                            <span class="not-settled" v-else-if="this.$store.getters.getTransaction.settlement_status == 3">Completed</span>
                        </div>
                    </div>

                </div>
            </div>

            <div class="main_table_block">
                <div class="table_block">
                <table>
                    <tr>
                        <th>SL No.</th>
                        <th>Transaction ID</th>
                        <th>Customer</th>
                        <th>Card</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                    <tr class="last">
                        <td>1</td>
                        <td class="primary-color"> {{ this.$store.getters.getTransaction.uuid ?? "" }} </td>
                        <td class=""><span class=""> {{ this.$store.getters.getTransaction.receiver_account_title ?? "" }} </span></td>
                        <td>
                            <span class="total-amount"> 
                                {{ this.$store.getters.getTransaction.user_card_id ?? "" }}
                            </span>
                        </td>
                        <td>
                            <span class="">
                                {{ this.$store.getters.getTransaction.user_card_id ?? "" }}
                            </span>
                        </td>
                        <td>
                            <span class="amount">
                                {{ (this.$store.getters.getTransaction.currency.code ?? "")+ " " +( vpNum(this.$store.getters.getTransaction.total_amount) ) }}
                            </span>
                        </td>
                    </tr>
                </table>
                </div>
            </div>

            <div class="detail_trans space_btw">
                <div class="gateway_ref">
                <div class="title-heading">
                    <h3>Gateway References</h3>
                </div>
                <ul>
                    <li class="ids">
                        <span class="title">Transaction Date</span>
                        <strong class="no"> {{ vpDate(this.$store.getters.getTransaction.created_at ?? "", "DD MMM YYYY, HH:MM a ") }} </strong>
                    </li>
                    <li class="ids">
                        <span class="title"> Gateway Reference </span>
                        <strong class="no"> {{ (this.$store.getters.getTransaction.gateway_reference_id ?? "") }}  </strong>
                    </li>
                </ul>
                <div class="title-heading">
                    <h3>Payment Methods</h3>
                </div>
                <div class="payment-icon">
                    <img src="assets/images/visa_cards.png" alt="" />
                </div>
                </div>
                <div class="small-table">
                <table>
                    <tr>
                        <td>Total Amount</td>
                        <td>{{ (this.$store.getters.getTransaction.currency.code ?? "")+ " " +  vpNum(this.$store.getters.getTransaction.total_amount) }}</td>
                    </tr>
                    <tr>
                        <td>Charges</td>
                        <td>{{ (this.$store.getters.getTransaction.currency.code ?? "")+ " " + vpNum(this.$store.getters.getTransaction.fee) }}</td>
                    </tr>
                    <tr>
                        <td>VAT</td>
                        <td>{{ (this.$store.getters.getTransaction.currency.code ?? "")+ " " + vpNum(this.$store.getters.getTransaction.vat) }}</td>
                    </tr>
                    <tr class="last gray-bg">
                        <td>Subtotal</td>
                        <td class="primary-color">
                            {{ (this.$store.getters.getTransaction.currency.code ?? "")+ " " + vpNum(this.$store.getters.getTransaction.amount) }}
                        </td>
                    </tr>
                </table>

                <div class="amount-date">Amount Date: {{ vpDate(this.$store.getters.getTransaction.created_at ?? "", "DD MMM YYYY, LT") }}</div>
                </div>
            </div>

            <div class="btn_block">
                <a href="#" class="btn">
                    <img src="assets/images/print-icon.png" alt="" />Print
                </a>
                <a href="#" class="btn">
                    <img src="assets/images/pdf-icon.png" alt="" />Generate PDF
                </a>
                <button class="btn req_refund canopen my_btn">
                    <img src="assets/images/req_refresh-icon.png" alt="" />Request Refund
                </button>

                <div id="myModal" class="modal">
                    <!-- Modal content -->
                    <div class="modal-content create_Refund">
                        <div class="close_icon">
                            <a href="#" class="close">
                                <img src="assets/images/close-icon.png" alt=""
                            /></a>
                        </div>
                        <div class="title">Create Refund</div>
                        <div class="pargraph">
                            <p>
                                You can issue a full or partial refund to your customer by
                                choosing the option below
                            </p>
                        </div>
                        <div class="field">
                            <label class="label">Refund Type</label>
                            <div class="right-field">
                                <div class="currency_types">
                                <ul>
                                    <li>
                                        <div class="type">
                                            <input type="radio" v-model="isPartial" value="0" class="radio" id="radio-1" name="radio-1"
                                            />
                                            <label for="radio-1">Full Refund </label>
                                        </div>
                                    </li>
                                    <li class="pipeline">|</li>
                                    <li>
                                        <div class="type">
                                            <input type="radio" v-model="isPartial" value="1" class="radio" id="radio-2" name="radio-1"
                                            />
                                            <label for="radio-2">Partial Refund </label>
                                        </div>
                                    </li>
                                </ul>
                                </div>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Amount</label>
                            <div class="right-field">
                                <input class="input-field amount-field" v-model="refundAmount" placeholder="AED0.00" :readonly="isPartial == 1 ? null : true" />
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Description <span>(optional)</span></label>
                            <div class="right-field">
                                <textarea
                                    v-model="description"
                                    class="input-field textarea-field"
                                    placeholder="Type description here…"
                                ></textarea>
                            </div>
                        </div>
                        <div class="footer">
                            <div class="btn_block">
                                <div class="cancel-btn">
                                    <button class="btn close">Cancel</button>
                                </div>
                                <div class="create-btn ">
                                    <button class="btn" @click="requestRefund">Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default 
{
    data() {
        return {
            search: null,
            isPartial: 0,
            description: null,
            refundAmount: null,
        };
    },
    watch: {
        isPartial: function (val) 
        {
            if(val == 0)
                this.refundAmount = this.$store.getters.getTransaction.total_amount ?? null;
            else
                1
        },
    },
    methods: {
        dateTime(value) {
            return this.vpDate(value)
        },
        filterData()
        {
            this.$store.dispatch("fetchTransactions", {
                page: 1, perPage: this.getConfig("PER_PAGE"),
                transactionId: this.$route.params.uuid,
                search: this.search,
            }).then(() => {
                this.refundAmount = this.$store.getters.getTransaction.total_amount ?? null;
            });
        },
        requestRefund()
        {
            this.$store.dispatch("requestRefund", {
                transactionId: this.$route.params.uuid,
                isPartial: this.isPartial,
                amount: this.refundAmount,
                description: this.description
            }).then(() => {
                // console.log("Done!");
            });
        }
    },
    created() {
        this.filterData();
    },
};
</script>