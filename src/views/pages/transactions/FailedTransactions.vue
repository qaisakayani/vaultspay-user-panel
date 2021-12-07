<template>
  <div v-if="isLoading">loading...</div>
  <div v-else>
    <div id="pending" class="tabcontent">
      <div class="table_block">
        <table>
          <tr>
            <th>Transaction Activity</th>
            <th>Method</th>
            <th>Total Amount</th>
            <th>Fee</th>
            <th>VAT</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          <tr
            v-for="failedTransaction in failedTransactions"
            :key="failedTransaction.id"
          >
            <td>
              <div class="reciver">
                <div class="icon">
                  <img src="assets/images/received-icon.png" alt="" />
                </div>
                <div class="name">
                  <span
                    ><strong class="from">Received from</strong>
                    {{
                      failedTransaction.receiver.first_name +
                      " " +
                      failedTransaction.receiver.last_name
                    }}</span
                  >
                </div>
              </div>
            </td>

            <td>
              <div class="pay_method">
                <span>{{ failedTransaction.payment_method.name }}</span>
              </div>
            </td>
            <td>
              <span class="amount">{{
                vpNum(failedTransaction.total_amount) +
                " " +
                failedTransaction.currency.code
              }}</span>
            </td>

            <td>
              <span class="amount">{{
                vpNum(failedTransaction.fee) +
                " " +
                failedTransaction.currency.code
              }}</span>
            </td>
            <td>
              <span class="amount">{{
                vpNum(failedTransaction.vat) +
                " " +
                failedTransaction.currency.code
              }}</span>
            </td>
            <td>
              <span class="date">{{
                vpDate(failedTransaction.created_at)
              }}</span>
            </td>
            <td class="txt_center">
              <div id="more-action" class="more-action">
                <a
                  href="javascript:void(0)"
                  @click="
                    toggleClass(`dropdown-content-${failedTransaction.id}`)
                  "
                  class="action"
                  ><img src="assets/images/dots-icons.png" alt=""
                /></a>
                <div
                  class="drop_down_content action_details"
                  v-bind:id="`dropdown-content-${failedTransaction.id}`"
                >
                  <a
                    href="#"
                    class="link"
                    @click.prevent="transactionDetails(failedTransaction.uuid)"
                    >Details</a
                  >
                  <a
                    href="#"
                    class="link last"
                    @click.prevent="transactionAttempts(failedTransaction.uuid)"
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
    <div class="showing_result">
      <div class="data">
        <p>
          <!-- {{ paginationDetails.total }} -->
          Showing {{ 10 * paginationDetails.currentPage }}-{{
            10 * paginationDetails.currentPage + recordsPerPage
          }}
          of total {{ paginationDetails.total }}
        </p>
        <a
          v-if="paginationDetails.currentPage == 1"
          style="display: none"
          href="#"
          class="back"
          @click.prevent="getTransactions(paginationDetails.currentPage - 1)"
          ><img src="assets/images/left_arrow.png" alt=""
        /></a>

        <a
          v-else
          href="#"
          class="back"
          @click.prevent="getTransactions(paginationDetails.currentPage - 1)"
          ><img
            src="assets/images/left_arrow.png"
            alt=""
            style="background-color: #3a8abc"
        /></a>
        <a
          v-if="paginationDetails.total <= paginationDetails.currentPage * 10"
          style="display: none"
          href="#"
          class="back"
          @click.prevent="getTransactions(paginationDetails.currentPage - 1)"
          ><img src="assets/images/right_arrow.png" alt=""
        /></a>
        <a
          v-else
          href="#"
          class="next"
          @click.prevent="getTransactions(paginationDetails.currentPage + 1)"
          ><img src="assets/images/right_arrow.png" alt=""
        /></a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      failedTransactions: null,
      paginationDetails: null,
      recordsPerPage: null,
      isLoading: false,
    };
  },
  created() {
    this.getFailedTransactions();
  },
  methods: {
    toggleClass(dropdownId) {
      var element = document.getElementById(dropdownId);
      element.style.display = element.style.display === "block" ? "" : "block";
    },
    getFailedTransactions(pageNo) {
      this.isLoading = true;
      this.$store
        .dispatch("getFailureTransactionsAction", {
          status: 2,
          page: pageNo,
        })
        .then((res) => {
          this.isLoading = false;
          if (res.code == 200) {
            this.failedTransactions = res.data.data;
            this.paginationDetails = res.data.paginationData;
            this.recordsPerPage = this.failedTransactions.length;
          }
        })
        .catch((error) => {
          this.isLoading = false;
        });
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
