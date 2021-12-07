<template lang="">
  <div class="main_content">
    <div class="inner_block">
      <BreadCrumb
        :pageHeader="{
          baseTitle: 'Dashboard',
          baseURl: '/',
          pageTitle: 'Request Money',
          pageHeading: 'Request Money',
          icon: 'assets/images/req_payment-icon.png',
          pageDescription:'Easily receive payments from your customers by Request money.',
        }"
      />

      <div class="horizontal-line"></div>

      <form class="form lg-card" @submit.prevent="requestMoney">
        <div class="inner_width">
          <div class="field-two-col field post_relative">
            <label class="label">Request from</label>
            <div class="field_block">
              <input
                class=" input-field"
                placeholder="Enter email ID or phone to request from"
                v-model="form.emailOrPhone"
                @keyup="checkEmailOrPhone"
              />
            </div>
                <div class="tooltip" v-if="isRegesteredUser==true">
                        <div class="content">
                        <div class="profile">
                            <div class="img">
                                <img :src="emailorPhoneRes?.avatar?emailorPhoneRes.avatar:'assets/images/Account-icon.png'" alt="">
                            </div>
                            <div class="tumbnail">
                                <span class="name"> {{emailorPhoneRes.first_name + " " + emailorPhoneRes.last_name}}</span>
                            <div class="user">
                                <span>Vaults</span><strong>Pay</strong> User
                            </div>
                                
                                
                            </div>
                        <div class="arrow-left"></div>
                        </div>
                    </div>
              </div>
                          <div class="tooltip" v-if="isRegesteredUser==false">
                        <div class="content">
                        <div class="profile">
                            <div class="img">
                                <img src="assets/images/mail-icon.png" alt="">
                            </div>
                            <div class="tumbnail">
                                <span class="name"> {{form.emailOrPhone}}</span>
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
          </div>

          <div class="field-two-col field baseline">
            <label class="label"
              >Select wallet
              <span>(currency)</span>
            </label>

            <div class="field_block">
              <select
                class="select-field input-field"
                @change="changeCurrency($event.target.value)"
              >
                <option
                  v-for="(wallet, index) in this.$store.getters.getWallets"
                  :key="index"
                  :value="wallet.id"
                >
                  {{ wallet.currency.code }}
                </option>
              </select>
              <div
                class="avail_bal"
                v-if="this.$store.getters.getCurrentWallet"
              >
                Available Balance:
                <span>
                  {{
                    this.vpNum(
                      this.$store.getters.getCurrentWallet?.available_balance
                    )
                  }}
                  {{ this.$store.getters.getCurrentWallet?.currency?.code }}
                </span>
              </div>
              <div class="avail_bal" v-else>
                <span> No wallet found! </span>
              </div>
            </div>
          </div>

          <div class="field-two-col field flex-start">
            <label class="label">Amount</label>
            <div class="field_block">
              <input
                placeholder="AED0.00"
                v-model="form.amount"
                class="input-field amount-field"
              />

              <div class="suggestion">
                <span class="amount" @click="this.form.amount = 500"> 500</span>
                <span class="amount" @click="this.form.amount = 1000"
                  >1000</span
                >
                <span class="amount" @click="this.form.amount = 1500"
                  >1500</span
                >
                <span class="amount" @click="this.form.amount = 2000"
                  >2000</span
                >
              </div>
              <div class="charges">
                <div class="link-status">
                  <p>Deduct charges from amount</p>
                  <label class="toggle-control">
                    <input type="checkbox" /> <span class="control"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="field-two-col field">
            <label class="label">Request Note <span>(optional)</span></label>
            <div class="field_block">
              <input
                class=" input-field"
                v-model="form.notes"
                placeholder="Type your note here"
              />
            </div>
          </div>

          <div class="field-two-col field">
            <label class="label empty-label"></label>
            <div class="submit-btn">
              <button class="btn">Send Request</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      emailorPhoneRes:null,
      isRegesteredUser:null,

      form: {
        emailOrPhone: "",
        amount: null,
        notes: "",
        userAccountId: null,
      },
    };
  },
  methods: {
    changeCurrency(methodId) {
      this.$store.dispatch("changeCurrentWallet", methodId);
    },
    requestMoney() {
      (this.form.userAccountId = this.$store.getters.getCurrentWallet.id),
        this.$store.dispatch("sendMoneyRequest", this.form).then((res) => {
          if (res.code == 200) {
            this.$router.push({ name: "request" });
          }
        });
    },
    checkEmailOrPhone() {
                this.isRegesteredUser = null;
                
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }
                this.timer = setTimeout(() => {
                if(this.form.emailOrPhone) {
                  console.log('hi')
                    this.$store
                    .dispatch("widthUserverifyEmailorPhone", {'emailOrPhone':this.form.emailOrPhone}).then((res) => {
                        if (res.code == 200) {
                            if (res.data) {
                                this.emailorPhoneRes = res.data;
                                this.isRegesteredUser = true;
                            } else {
                                this.isRegesteredUser = false;
                            }
                           
                        }
                    });
                }
                },1000)
                
            },
  },
};
</script>
