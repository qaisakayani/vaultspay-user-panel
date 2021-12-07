<template>
  <!-- main-content-area -->
  <div class="main_content">
    <div class="inner_block">
      <BreadCrumb
        :pageHeader="{
          baseTitle: 'Dashboard',
          baseURl: '/',
          pageTitle: 'Transactions',
        }"
      />

      <div class="title_block">
        <div class="title-heading">
          <img src="assets/images/transactions-icon.png" alt="" /><span>
            Transactions
          </span>
        </div>
      </div>

      <!-- Filters block -->
      <div class="filters-block" v-if="this.$store.getters.getFilters">
        <Filters :action="action">
          <!-- Main Filters -->
          <div class="all_show_filter" id="all_show_filter">
            <ul>
              <DateRange />

              <!-- Custom Filters -->
              <li class="w-5 marg-right">
                <div class="field">
                  <label class="label">Transaction Type</label>
                  <select
                    class="select-field downicon"
                    @change="
                      setFilter(
                        'transactionTypeId',
                        $event.target.value,
                        action
                      )
                    "
                  >
                    <option value="">Select Type</option>
                    <option
                      v-for="(type, id) in this.vpTransactionTypes()"
                      :key="id"
                      :selected="
                        type.id ==
                          this.$store.getters.getFilters.transactionTypeId
                      "
                      :value="type.id"
                    >
                      {{ type.name }}
                    </option>
                  </select>
                </div>
              </li>

              <li class="w-5 marg-right">
                <div class="field">
                  <label class="label">Status</label>
                  <select
                    class="select-field downicon"
                    @change="setFilter('status', $event.target.value, action)"
                  >
                    <option>Select Status</option>
                    <option
                      v-for="(statusItem, id) in this.vpTransactionStatus()"
                      :key="id"
                      :selected="
                        statusItem.id == this.$store.getters.getFilters.status
                      "
                      :value="statusItem.id"
                    >
                      {{ statusItem.name }}
                    </option>
                  </select>
                </div>
              </li>
            </ul>
          </div>
        </Filters>
      </div>

      <div class="main_table_block">
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

                <tr
                  v-for="transaction in this.$store.getters.getTransactions
                    .data"
                  :key="transaction.id"
                >
                  <td>
                    <div class="activity">
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
                    <div class="activity">
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
                    <div class="activity">
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
                    <span class="amount">
                      {{
                        vpNum(transaction.total_amount) +
                          " " +
                          transaction.currency.code
                      }}</span
                    >
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
                    {{ transaction.transaction_type.name }}
                  </td>

                  <td>
                    <span class="date">{{
                      vpDate(transaction.created_at)
                    }}</span>
                  </td>

                  <td class="txt_center">
                    <div id="more-action" class="more-action">
                      <a href="#" class="action"
                        ><img src="assets/images/dots-icons.png" alt=""
                      /></a>
                      <div class="drop_down_content action_details">
                        <router-link
                          :to="'/transaction-details/' + transaction.uuid"
                          class="link"
                          >Details</router-link
                        >
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
            :pagination="this.$store.getters.getTransactions.pagination"
            fetchAction="fetchTransactions"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentComponent: "CompletedTransactions",
      action: "fetchTransactions",
    };
  },
  watch: {
    "$store.getters.getCurrentWallet": {
      handler: function() {
        this.getFilteredData();
      },
    },
  },
  methods: {
    transactionDetails(id) {
      this.$router.push(`/transaction-details/${id}`);
    },
    transactionAttempts(id) {
      this.$router.push(`/transaction-attempts/${id}`);
    },
    async getFilteredData() {
      await this.$store.dispatch("fetchTransactions", {});
    },
  },
  created() {
    this.resetFilters();
    this.getFilteredData();
  },
};
</script>
