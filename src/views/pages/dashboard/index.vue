<template>
    <div class="main_content" v-if="this.$store.getters.getCurrentWallet !== null">
        <div class="all_details">
            <div class="main_card gradient_bg">
                <div class="greeting-msg">Good Morning, {{ this.$store.getters.auth.user.name }}!</div>
                    
                    <div class="balance-title">
                        <span
                        >Available Balance
                        <a href="#" class="badge">View Ledger</a></span
                        >
                    </div>
                   
                    <div class="total_balance">
                        <span> {{ this.$store.getters.getCurrentWallet.currency.code }} </span> 
                        {{ vpNum(this.$store.getters.getCurrentWallet.available_balance) }} 
                    </div>

                    <div class="balance-block">
                        <div class="balance">
                            
                            <div class="balance-title">
                                <span
                                >Balance on hold<a href="#" class="badge"
                                    >View Details</a
                                ></span
                                >
                            </div>
                            
                            <div class="amount"><span> {{ this.$store.getters.getCurrentWallet.currency.code }} </span>
                                {{ vpNum(this.$store.getters.getCurrentWallet.balance_on_hold) }}
                            </div>

                        </div>

                        <div class="balance">

                            <div class="balance-title">
                                <span>Total Balance</span>
                            </div>

                        <div class="amount"><span> {{this.$store.getters.getCurrentWallet.currency.code }} </span> {{ vpNum(this.$store.getters.getCurrentWallet.balance) }} </div>
                    </div>
                </div>
            </div>

            <div class="services_card">
                <div class="title-heading">
                    <h2>VaultsPay Services</h2>
                </div>
                <ul class="five_box">
                    <li class="card">
                        <router-link :to="{name:'send_money'}" class="gradient_bg">
                            <img src="assets/images/send_money.png" alt="" />
                            <span>Send <br />Money</span>
                        </router-link>
                    </li>

                    <li class="card">
                        <router-link :to="{name:'deposit'}" class="gradient_bg">
                            <img src="assets/images/deposit_money.png" alt="" />
                            <span>Deposit <br />Money</span>
                        </router-link>
                    </li>

                    <li class="card">
                        <router-link :to="{name:'withdraw'}" class="gradient_bg">
                            <img src="assets/images/withdraw_money.png" alt="" />
                            <span>Withdraw <br />Money</span>
                        </router-link>
                    </li>

                    <li class="card">
                        <router-link :to="{name:'request'}" class="gradient_bg">
                            <img src="assets/images/req_payment-icon.png" alt="" />
                            <span>Requet <br />Payment</span>
                        </router-link>
                    </li>

                    <li class="card">
                        <router-link :to="{name:'currency-exchange'}" class="gradient_bg">
                            <img src="assets/images/exchange-money-icon.png" alt="" />
                            <span>Exchange <br />Money</span>
                        </router-link>
                    </li>

                 </ul>
            </div>

            <div class="table_container">
                <div class="title-heading">
                    <h2>Recent Transactions</h2>
                </div>

                <div class="view_all">
                    <a href="#">View all</a>
                </div>

                <div class="table_block">
                    <table>
                        <tr>
                            <th>Transaction Activity</th>
                            <th>Total Amount</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>

                        <tr>
                            <td> 
                                <div class="activity">
                                    <div class="icon">
                                        <img src="assets/images/received-icon.png" alt="" />
                                    </div>
                                    <div class="name">
                                        <span>
                                            <strong class="from">Received from</strong>Manzoor Ahmed
                                        </span>
                                    </div>
                                </div>
                            </td>

                            <td><span class="amount">+1241424.64AED</span>
                            </td>

                            <td><span class="date">20 May 2021</span></td>

                            <td class="txt_center">
                                <div id="more-action" class="more-action">
                                    <a href="#" class="action">
                                        <img src="assets/images/dots-icons.png" alt=""/>
                                    </a>
                                    <div class="drop_down_content action_details">
                                        <a href="#" class="link">Details</a>
                                        <a href="#" class="link last">Charges</a>
                                        <div class="arrow-right">
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div class="activity">
                                    <div class="icon">
                                        <img src="assets/images/send-icon.png" alt="" />
                                    </div>
                                    <div class="name">
                                        <span>
                                            <strong class="from">Send to </strong>Farheen Jawed
                                        </span>
                                    </div>
                                </div>
                            </td>

                            <td><span class="amount">+1589.00AED</span></td>

                            <td><span class="date">19 May 2021</span></td>

                            <td class="txt_center">
                                <a href="#" class="action">
                                <img src="assets/images/dots-icons.png" alt=""/>
                                </a>
                            </td>
                        </tr>

                        <tr class="last">
                            <td>
                                <div class="activity">
                                    <div class="icon">
                                        <img src="assets/images/send-icon.png" alt="" />
                                    </div>
                                    <div class="name">
                                        <span>
                                            <strong class="from">Send to </strong>Farheen Jawed
                                        </span>
                                    </div>
                                </div>
                            </td>

                            <td><span class="amount">+1589.00AED</span></td>

                            <td><span class="date">19 May 2021</span></td>

                            <td class="txt_center">
                            <a href="#" class="action"
                                ><img src="assets/images/dots-icons.png" alt="" />
                            </a>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

        <div class="overview_Block">
            <div class="title-heading">
                <h2>Account Overview</h2>
                <div class="drop_down-days" id="days_dropdown">
                        <a href="#">Last 7 Days 
                            <img src="assets/images/down-arrow-blue.png" alt="" />
                        </a>
                    <div class="alldays drop_down_content" style="">
                        <a href="#" class="link"><span>15 Days</span></a>
                        <a href="#" class="link"><span>30 Days</span></a>
                        <a href="#" class="link last"><span>60 Days</span></a>
                        <div class="arrow-up"></div>
                    </div>
                </div>
            </div>

            <div class="amount_card">
                <div class="card-box">
                    <div class="title">Money Sent</div>
                    <div class="amount">
                    <span>AED</span><strong class="digit">1,230.50</strong>
                    </div>
                    <p class="desc">Total outgoing money from your account</p>
                </div>

                <div class="card-box">
                    <div class="title">Money Received</div>
                    <div class="amount">
                    <span>AED</span><strong class="digit">1,230.50</strong>
                    </div>
                    <p class="desc">Total outgoing money from your account</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    async created()
    {
        
    },
    data() {
        return {
            wallet: null,
            Daystatus: this.GetDaystatus(),
        };
    },
    methods: {
        changeWallet(wallet) {
            this.$store.commit("setCurrentWallet", wallet ?? null );
        },
        GetDaystatus() 
        {
            var myDate = new Date();
            var hrs = myDate.getHours();
            var greet;
            if (hrs < 12) greet = "Good Morning";
            else if (hrs >= 12 && hrs <= 17) greet = "Good Afternoon";
            else if (hrs >= 17 && hrs <= 24) greet = "Good Evening";
            return greet;
        },
    },
    mounted() {
        this.loadJS(['assets/javascript/custom.js'])
    },
};

</script>
