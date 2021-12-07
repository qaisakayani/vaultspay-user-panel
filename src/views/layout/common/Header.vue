<template>
<div class="white_bg">
    <div class="inner_container">
    <header class="header_block">

        <div class="responsive_menu">
            <a href="#" data-pushbar-target="side-menu">
                <img src="assets/images/menu_icon.png" alt=""/>
            </a>
        </div>

        <div class="logo">
            <router-link to="/">
                <img src="assets/images/logo.png" alt=""/>
            </router-link>
        </div>
        <div class="btm_line">
        <div class="search_bar">
            <input class="search-input" placeholder="Search..." />
        </div>

        <div class="right_block">
            
            <!-- Current Wallet -->
            
            <div v-if="this.$store.getters.getCurrentWallet" class="currency_changer" id=""> 

                <select id=""  class="name select-field" @change="changeCurrentWallet($event.target.value)">

                    <option v-for="(wallet, index) in this.$store.getters.getWallets" :key="index" :value="wallet.id" >
                        {{ wallet.currency.code }}
                    </option>
                    
                </select>

            </div>

            <div class="notif" id="notification-icon">
                
                <a href="javascript:void(0)">
                    <img src="assets/images/notification-icon.png" alt=""/>
                </a>

                <span class="no">
                    {{ this.$store.getters.getTotalNotifications }}
                </span>

                <div class="custom_drop_down">
                    <div class="content" v-bind:style="{ position: 'unset' }">
                        <div class="title"><span>Notifications</span></div>

                        <ul v-if="this.$store.getters.getNotifications">
                            <li
                                class="list"
                                v-for="(index, notification) in this.$store.getters.getNotifications"
                                :key="this.$store.getters.getNotifications[notification].id">
                                <div class="icon">
                                    <img src="assets/images/transactions-icon.png" alt="" />
                                </div>
                                <div class="detail">
                                    <span>{{ this.$store.getters.getNotifications[notification].type }}</span>
                                    <p>{{ this.$store.getters.getNotifications[notification].message }}</p>
                                </div>
                            </li>

                            <li
                                class="list"
                                v-if="this.$store.getters.getTotalNotifications == 0">
                                <div class="icon">
                                    <img src="assets/images/transactions-icon.png" alt="" />
                                </div>
                                <div class="detail">
                                    <span>Empty</span>
                                    <p></p>
                                </div>
                            </li>

                        </ul>

                        <div class="view_all">
                            <router-link to="/notification_list">
                                View all notifications
                                <img src="assets/images/right_arrow.png" alt=""/>
                            </router-link>
                        </div>
                    </div>

                    <div class="arrow-up"></div>
                </div>

            </div>

            <div class="profile-account " id="drop-down">
                <a href="javascript:void(0)" class="logout">
                    <div class="icon">
                        <img src="assets/images/Account.png" alt="" />
                    </div>

                    <div class="text">
                        <div class="name">
                            {{ auth.user.name }}
                            <img src="assets/images/drop_down_arrow.png" alt="" />
                        </div>
                        <div class="verified">
                            <img src="assets/images/green-tick.png" alt="" /> KYC Verified
                        </div>
                    </div>
                </a>

                <div class="hide detail">
                    <a href="javascript:void(0)" @click="logout" class="link">
                        <img src="assets/images/logout.png" alt="" />
                        <span>logout</span>
                    </a>
                    <div class="arrow-up"></div>
                </div>
            </div>

        </div>
        </div>
    </header>
    </div>
</div>
</template>

<script>
export default 
{
    data() 
    {
        return {
            auth: {},
            isActive: false,
        };
    },
    watch: 
    {
        "$store.getters.getCurrentWallet": 
        {
            handler: function(currentWallet) 
            {
                if(currentWallet.id != 'undefined')
                    this.$store.commit("setFilters", { userAccountId: currentWallet.id } );
            },
        }
    },
    methods: 
    {
        logout() 
        {
            this.$store.dispatch("logout", {}).then((value) => {});
            this.$router.push("/verify-email");
        },
        async changeCurrentWallet(walletId)
        {
            await this.$store.dispatch("changeCurrentWallet", walletId);
        }
    },
    async mounted() 
    {
        await this.$store.dispatch("fetchWallets").then(() => 
        {
            this.currentWallet = this.$store.getters.getCurrentWallet;
        });

        await this.$store.dispatch("fetchNotifications");
    },
    created() 
    {
        this.auth = this.$store.getters.auth;
    },
};
</script>
