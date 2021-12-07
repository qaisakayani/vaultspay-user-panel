<template>
<div class="table_block">
  <table v-if="this.$store.getters.getmyRequest">
    <tbody>
      <tr>
        <th>Date</th>
        <th>Requested to(Email/Phone)</th>
        <th>Withdraw Amount</th>
        <th>Status</th>
        <th>Action</th>
      </tr>

      <tr v-for=" item in this.$store.getters.getmyRequest.data" :key="item.id">
        <td><span class="date_time">{{this.vpDate(item.created_at,'D-MMM-Y h:m:s')}}</span></td>
        <td>
           <div class="activity req_email_phone">
                <div class="icon"> <img src="assets/images/Account.png" alt=""> </div>
                <div class="name"> <span>
                  <!-- <strong class="from">Send to</strong> -->
                 <b>{{item.email?item.email:item.phone_number}}</b></span> 
                  <p class="note" v-if="item.notes"> Note:{{_vstr_limit(item.notes,20)}}</p>
                 </div>
              </div>
          
        </td>
        <td class="total-amount"><span class="amount">{{item.user_account.currency.code}} {{this.vpNum(item.amount)}}</span></td>
        <td>
          <div class="status-btn">
            <span class="btn " :class="checkstatus(item.status)" >{{item.statusStr}}</span>
          </div>
        </td>

        <td>
          <div class="action-btn">
            <button class="btn cancel" @click="showModel(item.id)" v-if="item.status==0"><b>Cancel requests</b></button>
          </div>
        </td>
      </tr>
      

    </tbody>
    
  </table>
</div>
<Pagination 
:pagination=this.$store.getters.getmyRequest.paginationData
fetchAction="fetchmyRequest"
                        />
<!-- model  -->
<div id="myModal" class="modal">
								<!-- Modal content -->
								<div class="modal-content ">
									<div class="txt_center">
									<div class="close_icon">
										<a href="#" class="close"><img src="assets/images/close-icon.png" alt=""></a>
									</div>
									<div class="title"> Are you sure?</div>
									<div class="pargraph">
										<p>You can issue a full or partial refund to your customer by choosing the option below</p>
									</div>
									
									
									<div class="footer">
										<div class="btn_block">
											<div class="cancel-btn">
												<button class="btn close">Cancel</button>
											</div>
											<div class="create-btn ">
												<button class="btn" @click="cancelRequest()">Accept</button>
											</div>
										</div>
									</div>
										</div>
								</div>
							</div>
</template>
<script>

export default {
   async created() {
        
        await this.fetchmyRequest()
        
    }, 
    data() {
      return {
        form:{id:null}
      }
    }, 
    methods: {
        fetchmyRequest()
        {
            this.$store.dispatch('fetchmyRequest')
            
        },
        checkstatus:(status)=>
        {   
            if(status==0)
            {
                return 'processing'
            }else if(status==1)
            {
                return 'complete'
            }else if(status==2)
                
            {
                return 'cancel'
            }else
            {
                return ' '
            }
        },
        showModel(id)
        {	
          this.form.id=id
          $("#myModal").show()
        },
         cancelRequest()
        {
          this.$store.dispatch('cancelRequest',{requestId:this.form.id})
          $("#myModal").hide()
          this.$store.dispatch('fetchmyRequest')
        }
    }, 
}
</script>
