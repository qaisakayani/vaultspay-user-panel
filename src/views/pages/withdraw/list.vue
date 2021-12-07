<template>
  <div class="main_content">
    <div class="inner_block">
      <BreadCrumb
        :pageHeader="{
          baseTitle: 'Dashboard',
          baseURl: '/',
          pageTitle: 'Withdraw money',
        }"
      />
      <div class="title_block pd-lft-0">
        <div class="left_block">
          <div class="title-heading">
            <img
              src="assets/images/withdraw_money.png"
              alt=""
              class="send_money-icon"
            /><span>Withdraw money </span>
          </div>
          <div class="create_new-link">
            <router-link :to="{ name: 'withdraw-request' }" class="link"
              ><img src="assets/images/withdraw_money.png" alt="" />Create Withdraw
              request</router-link
            >
          </div>
        </div>
      </div>

      <div class="tabs_block">
        <div class="tab">
          <button class="tablinks active" onclick="tab_btn(event, 'completed')">
            Withdraw Requests <span class="resp_hide"></span>
          </button>
        </div>
      </div>

      <div class="main_table_block">
        <div id="completed" class="tabcontent" style="display: block">
          <div class="table_block">
            <table>
              <tbody>
                <tr>
                  <th>Date</th>
                  <th>Method</th>
                  <th>Withdraw Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

                <tr
                  v-for="item in this.$store.getters.getWithdrawLIst.data"
                  :key="item.id"
                >
                  <td>
                    <span class="date_time">{{
                      this.vpDate(item.created_at, "D-MMM-Y h:m:s")
                    }}</span>
                  </td>
                  <td>
                    <div class="pay_method">
                      <span class="badge primary">{{
                        item.with_drawal_method.payment_method.name
                      }}</span>
                    </div>
                  </td>
                  <td class="total-amount">
                    <span class="amount"
                      >{{ item.user_account.currency.code }}
                      {{ this.vpNum(item.amount) }}</span
                    >
                  </td>
                  <td>
                    <div class="status-btn">
                      <span class="badge md" :class="checkstatus(item.status,0)">{{checkstatus(item.status,1)}}</span>
                    </div>
                  </td>

                  <td>
                    <div class="action-btn">
                      <button
                        @click="requestCancelModelSHow(item.id)"
                        class="btn cancel"
                      >
                        <b>Cancel requests</b>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <Pagination
          :pagination="this.$store.getters.getWithdrawLIst.paginationData"
          fetchAction="fetchAllWithdraw"
        />
      </div>
    </div>
  </div>
  <div id="myModal" class="modal">
    <!-- Modal content -->
    <div class="modal-content ">
      <div class="txt_center">
        <div class="close_icon">
          <a href="#" class="close"
            ><img src="assets/images/close-icon.png" alt=""
          /></a>
        </div>
        <div class="title">Are you sure?</div>
        <div class="pargraph">
          <p>
            Are you sure you want to cancel this Withdraw request?
          </p>
        </div>

        <div class="footer">
          <div class="btn_block">
            <div class="cancel-btn">
              <button class="btn close">Cancel</button>
            </div>
            <div class="create-btn ">
              <button class="btn" @click="requestCancel()">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    // this.fetchWithdrawList()
    return {
      removeID: null,
    };
  },
  async created() {
    await this.fetchWithdrawList();
  },
  methods: {
    fetchWithdrawList() {
      this.$store.dispatch("fetchAllWithdraw");
    },
    requestCancelModelSHow(id) {
      this.removeID = id;
      $("#myModal").show();
    },
    requestCancel() {
      this.$store.dispatch("requestCancel", { id: this.removeID });
      this.$store.dispatch("fetchAllWithdraw");
      $("#myModal").hide();
    },
     checkstatus:(status,check)=>
        {   
          let stateData=[]
            if(check==1)
            stateData=['Pending','Active','Canceled','Rejected','Completed']
            else
            stateData=['pending','sucess','warning','warning','sucess']
            
            if(stateData[status])
              return stateData[status]
              else
              return null
            
        },
  },
};
</script>
