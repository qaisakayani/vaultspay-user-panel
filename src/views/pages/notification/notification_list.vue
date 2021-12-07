<template>
  <!-- main-content-area -->
  <div class="main_content">
    <div class="inner_block">
      <BreadCrumb
        :pageHeader="{
          baseTitle: 'Dashboard',
          baseURl: '/',
          pageTitle: 'Notifications',
        }"
      />

      <div class="main_table_block">
        <div v-if="this.$store.getters.getNotifications">
          <div id="completed" class="tabcontent active">
            <div class="table_block">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Type</th>
                    <th scope="col">Message</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in this.$store.getters.getNotificationsList?.data"
                    :key="item.id"
                  >
                    <td>
                      <div class="note-title d-flex align-items-center">
                        <div class="noti-img">
                          <span
                            ><img src="assets/img/not-icon-1.svg" alt=""
                          /></span>
                        </div>
                        <p>{{ item.type }}</p>
                      </div>
                    </td>
                    <td>{{ item.message }}</td>
                    <td>{{vpDate(item.date,'D-MMM-Y h:m:s')}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Pagination
            :pagination="this.$store.getters.getNotificationsList?.paginationData"
            fetchAction="fetchNotifications"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    // this.getNotificationss();
    // $(".notification-items").removeClass("active");
  },
  data() {
    return {
      notifications: "",
    };
  },
  methods: {
    getNotificationss() {
      this.$store.dispatch("fetchNotifications").then((value) => {
        this.notifications = value;
      });
    },
  },
};
</script>
