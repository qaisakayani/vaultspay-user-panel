<template lang="">
  <div class="main_content">
    <div class="inner_block">
      <BreadCrumb
        :pageHeader="{
          baseTitle: 'Dashboard',
          baseURl: '/',
          pageTitle: 'Request Money',
        }"
      />
      
      <div class="title_block pd-lft-0">
        <div class="left_block">
          <div class="title-heading">
            <img
              src="assets/images/req_payment-icon.png"
              alt=""
              class="send_money-icon"
            /><span>Request Money </span>
          </div>
          <div class="create_new-link">
            <router-link  :to="{name:'send-request'}"  class="link"
              ><img src="assets/images/send_money.png" alt="" />Send Request</router-link>
          </div>
        </div>
      </div>

      <div class="tabs_block">
        <div class="tab">
          <button class="tablinks active" onclick="tab_btn(event, 'completed')">
            My Requests <span class="resp_hide"></span>
          </button>
          <button class="tablinks" onclick="tab_btn(event, 'pending')">
            Received<span class="resp_hide"> Requests</span>
          </button>
        </div>
      </div>

      <div class="main_table_block">
        <div id="completed" class="tabcontent" style="display: block">
          
              <Myrequest/>
        </div>
        <!-- second 	 -->
        <div id="pending" class="tabcontent">
         
              <Userrequest/>
         
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Myrequest from './MyrequestList.vue'
import Userrequest from './UserRequestList.vue'
export default {
    components:
    {
        Myrequest,
        Userrequest
    }

};
</script>
