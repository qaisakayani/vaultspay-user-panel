<template>
    <div class="lg-card">
    <div class="inner_width ">
    <div class="field-two-col field post_relative">
        <label class="label">Receiver Email ID<br> or Phone</label>
        <div class="field_block">
        <input
            placeholder="Enter receiver email ID or Phone Number"
            class="input-field"
           @keyup="checkEmailOrPhone()"
            v-model="sendMoney.emailOrPhone"
            :class="_vClass(_validator.sendMoney, 'emailOrPhone')"
        />
        </div>
        <div class="tooltip" v-if="isRegesteredUser == true">
            <div class="content">
                <div class="profile">
                    <div class="img">
                        <img src="assets/images/Account-icon.png" alt="">
                    </div>
                    <div class="tumbnail">
                        <span class="name">
                            {{emailorPhoneRes.first_name + " " + emailorPhoneRes.last_name}}
                        </span>
                        <div class="user">
                            <span>Vaults</span><strong>Pay</strong> User
                        </div>	
                    </div>
                </div>
                
                <div class="arrow-left"></div>
            </div>
        </div>

        <div class="tooltip" v-if="isRegesteredUser == false">
            <div class="content">
            <div class="profile">
                <div class="img">
                    <img src="assets/images/mail-icon.png" alt="">
                </div>
                <div class="tumbnail">
                    <span class="name">{{sendMoney.emailOrPhone}}</span>
                <div class="user">
                    Not a VaultsPay User
                </div>
                    
                    
                </div>
            </div>
                
            <hr class="horizontal-line">
                
            <div class="caution">
                <img src="assets/images/icon_feather-info.png" alt="">
                <p>If the payee does not have a vaults pay account you 
                    can still send them money. We will send them a mail 
                    with instructions to receive their money.
                </p>
            </div>
                
            <div class="arrow-left"></div>
            </div>
        </div>

        <!-- <div class="invalid-feedback" v-if="_vError(_validator.sendMoney, 'emailOrPhone')">
            {{ _vErrorMessage(_validator.sendMoney, "emailOrPhone") }}
        </div> -->

    </div>

  
        
    <div class="invalid-feedback" v-if="emailOrPhoneError">
        {{emailOrPhoneError}}
    </div>

    <div class="field-two-col field">
        <label class="label">Wallet</label>
        <div class="field_block">
            <select
                class="select-field input-field"
                v-model="sendMoney.payerAccountId"
                @change="selectedWalletBalance()"
                :class="_vClass(_validator.sendMoney, 'payerAccountId')"
            >

                <option
                v-for="(wallet, index) in this.$store.getters.getWalletList"
                :key="index"
                :value="wallet.id"
                :selected="this.$store.getters.getWalletList[0]"
                >
                {{ wallet.currency.code }}
                </option>
            </select>
            <div class="avail_bal">
                Available Balance: <span>{{selectedCurrency + " " + vpNum(avaliableBalance)}}</span>
            </div>
        </div>

    </div>

    <div class="field-two-col field">
        <label class="label">Amount</label>
        
        <div class="field_block">
            <input
                placeholder="AED0.00"
                class="input-field amount-field"
                v-model="sendMoney.amount"
                :class="_vClass(_validator.sendMoney, 'amount')"
            />

            <div class="suggestion">
                <span class="amount" @click="this.sendMoney.amount=500"> 500</span> 
                <span class="amount" @click="this.sendMoney.amount=1000">1000</span> 
                <span class="amount" @click="this.sendMoney.amount=1500">1500</span> 
                <span class="amount" @click="this.sendMoney.amount=2000">2000</span> 
            </div>

            <!-- <div class="invalid-feedback" v-if="_vError(_validator.sendMoney, 'amount')">
                {{ _vErrorMessage(_validator.sendMoney, "amount") }}
            </div> -->

            <div class="charges">

                <div class="link-status">
                    <p>Deduct charges from amount</p>
                    <label class="toggle-control">
                        <input type="checkbox"  v-model="sendMoney.deductChargesFromTransactionAmount" /> 
                        <span class="control"></span>
                    </label>
                </div>

            </div>
        </div>
        
    </div>

    <div class="field-two-col field">
        <label class="label">Transfer Note <span>(optional)</span></label>
        <div class="field_block">
        <input
            class="input-field"
            v-model="sendMoney.transactionNote"
            placeholder="Transfer Note"
        />
        </div>
    </div>

    <div class="field-two-col field">
        <label class="label empty-label"></label>
        <div class="submit-btn">
            <button class="btn cancel-btn marg-rt" @click.prevent="cancelFun()">Cancel</button>
            <button class="btn" @click.prevent="handleSubmit()">Next</button>
        </div>
    </div>
    </div>
    </div>
</template>

<script>
   
    import useVuelidate from "@vuelidate/core";
    import { required } from "@vuelidate/validators";
    export default {
        
        setup() {
            return {
              _validator: useVuelidate(),
            };
        },

        data() {

            return {
                submitted: false,
                isRegesteredUser: null,
                emailorPhoneRes: null,
                emailOrPhoneError: null,
                avaliableBalance: null,
                selectedCurrency: "",
                sendMoney: {
                    emailOrPhone: null,
                    amount: null,
                    payerAccountId: null,
                    deductChargesFromTransactionAmount: null,
                    transactionNote: null
                },
                timer:null
            };

        },
       
        validations() {
            return {
                
                sendMoney: {
                    emailOrPhone: { required },
                    amount: { required },
                    payerAccountId: { required }
                },
            };
        },

        created() {
            this.getWalletList();
        },

        watch: {
            "sendMoney.deductChargesFromTransactionAmount": {
                immediate: true,
                deep: true,
                handler(val) {
                    if(val == true) {
                        this.sendMoney.deductChargesFromTransactionAmount = 1;
                    } else {
                        this.sendMoney.deductChargesFromTransactionAmount = 0;
                    }
                },
            },

            "sendMoney.emailOrPhone": {
                
                immediate: true,
                deep: true,
                handler(val) {
                    this.isRegesteredUser = null;
                },
            },

           
        },
        
        methods: {

            getWalletList() {
                this.$store.dispatch("fetchWalletList").then((res) => {
                    this.sendMoney.payerAccountId = this.$store.getters.getWalletList[0].id;
                    this.selectedCurrency = this.$store.getters.getWalletList[0].currency.code;
                    this.avaliableBalance = this.$store.getters.getWalletList[0].available_balance;

                    this.$store.commit("setSendMoneyData", {
                        currency: this.selectedCurrency,
                    });
                });
            },

            checkEmailOrPhone() {
                this.isRegesteredUser = null;
                this.emailOrPhoneError = null;
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }
                this.timer = setTimeout(() => {
                if(this.sendMoney.emailOrPhone) {
                    this.$store
                    .dispatch("verifyEmailorPhone", this.sendMoney).then((res) => {

                        if (res.code == 200) {
                            if (res.data) {
                                this.emailorPhoneRes = res.data;
                                this.isRegesteredUser = true;

                                this.$store.commit("setSendMoneyData", {
                                    senderName: res.data.first_name + " " + res.data.last_name,
                                    isVaultspayUser: true,
                                });
                            } else {
                                this.isRegesteredUser = false;
                                this.$store.commit("setSendMoneyData", {
                                    senderName: null,
                                    isVaultspayUser: false,
                                });
                            }
                           
                        } else {
                            this.emailOrPhoneError = res.message;
                        }
                    });
                }
                },1000)
                
            },

            handleSubmit(e) {
                this.submitted = true;
                this._validator.$validate();
                if (!this._validator.$error && !this.emailOrPhoneError) {
                  this.$store
                    .dispatch("iniateSendMoney", this.sendMoney).then((res) => {
                        if (res.code == 200) {
                            console.log("res.data.first_name:", res.data)
                            let data = {
                                emailOrPhone: this.sendMoney.emailOrPhone,
                                amount: this.sendMoney.amount,
                                transactionHash: res.data.hash,
                                transferNote: this.sendMoney.transactionNote
                            };
                            this.$store.commit("setSendMoneyData", data)
                            this.$store.commit("setSendMoneyStep", 2);
                        }
                    });
                } else {
                  return;
                }
            },

            selectedWalletBalance(){
                var walletId = this.sendMoney.payerAccountId;
                var newArray = this.$store.getters.getWalletList.filter(function (el) {
                    return el.id == walletId;
                });
                this.avaliableBalance = newArray[0].available_balance;
                var data = {
                    currency: newArray[0].currency.code,
                }
                this.$store.commit("setSendMoneyData", data);
            },

            cancelFun(){
               this.$router.push("/dashboard");
            }

        },
    };
</script>

<style scoped>
   
</style>
