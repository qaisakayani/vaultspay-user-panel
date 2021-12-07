<template>
  <div class="main_content">
    <div class="inner_block">
      <BreadCrumb
        :pageHeader="{
          baseTitle: 'Dashboard',
          baseURl: '/',
          pageTitle: 'Withdraw Request',
          pageHeading: 'Withdraw Request',
          icon: 'assets/images/withdraw_money.png',
          pageDescription: 'Easily Withdraw payments from your customers.',
        }"
      />

      <div class="horizontal-line"></div>

      <form class="form lg-card" @submit.prevent="withdrawRequests">
        <div class="inner_width">
          <div class="field-two-col field baseline">
            <label class="label">Withdraw from</label>

            <div class="field_block">
              <select v-model="form.currecyID"
                class="select-field input-field"
                @change="changeCurrency($event.target.value)"
                :class="_vClass(_validator.form, 'currecyID') "
              >
                <option 
                  v-for="(wallet, index) in this.$store.getters.getWallets"
                  :key="index"
                  :value="wallet.id"
                >
                  {{ wallet.currency.code }}
                </option>
                <option  v-if="!this.$store.getters.getWallets"  disabled value=""  >No Withdraw Currency</option>

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

          <div class="field-two-col field baseline">
            <label class="label">Withdraw method</label>
            <div class="field_block">
              <select
                class="select-field input-field" v-model="form.withdrawMethod"
                @change="changeMethod($event.target.value)"
                :class="_vClass(_validator.form, 'withdrawMethod') "

              >
                <option 
                  v-for="item in this.$store.getters.getUserWithdrawMethods
                    .data"
                  :key="item.id"
                  :value="item.id"
                  >{{ item.payment_method.name }}</option
                >
                <option v-if="!this.$store.getters.getUserWithdrawMethods.data" disabled value=""   >No Withdraw method</option>
              </select>
            </div>
          </div>
          {{}}
          <div class="field-two-col field flex-start">
            <label class="label">Amount</label>
            <div class="field_block">
              <input
                placeholder="AED0.00"
                v-model="form.amount"
                class="input-field amount-field"
                :class="_vClass(_validator.form, 'amount') "
              />
              <div class="suggestion mar-btm-0">
                <span class="amount" @click="this.form.amount = 500"> 500</span>
                <span class="amount" @click="this.form.amount = 1000">1000</span>
                <span class="amount" @click="this.form.amount = 1500">1500</span>
                <span class="amount" @click="this.form.amount = 2000">2000</span>
              </div>
            </div>
          </div>
          <div class="field-two-col field">
            <label class="label empty-label"></label>
            <div class="submit-btn">
              <button class="btn">Submit Request</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  data() {
    return {
      form:{
        withdrawMethod:'',
        currecyID:"",
        amount: null,
      }
    };
  },
   setup()
        {
            return { _validator: useVuelidate() };
        },
  validations()
    {
        return {
            form:
            {
                withdrawMethod:{required},
                amount:{required},
                currecyID:{required}
            }
        }
    },

  async created() {
    this.fetchWallet();
    await this.$store.dispatch("fetchUserwithdrawalMethods");
    this.form.currecyID=this.$store.getters.getWallets[0]?this.$store.getters.getWallets[0].id:''
    this.form.withdrawMethod=12
    this.$store.getters.getUserWithdrawMethods[0]?this.$store.getters.getUserWithdrawMethods?.data[0].id:''
  },
  methods: {
    async fetchWallet() {
      //   await  this.$store.dispatch('fetchDrawWallet');
    },
    changeCurrency(methodId) {
      this.$store.dispatch("changeCurrentWallet", methodId);
    },
    changeMethod(id) {
      this.$store.commit("setUserMethod", id);
    },
    withdrawRequests() {
      this._validator.$validate()
      if(this._validator.$error) return false
      let data = {
        withdrawalMethodId: this.$store.getters.getCurrentMethod,
        userAccountId: this.$store.getters.getCurrentWallet.id,
        amount: this.form.amount,
      };
      this.$store.dispatch("sendWithdrawRequest", data).then((res) => {
        if (res.code == 200) {
          this.$router.push({ name: "withdraw" });
        }
      });
    },
  },
};
</script>
