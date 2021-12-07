<template>
  <div class="card">
    <div class="page-content page-container" id="page-content">
      <div class="padding">
        <div class="row">
            <h4>Transaction Attempts</h4>
            <div class="timeline p-4 block mb-4">
              <div class="tl-item active">
                <h5>Transaction#</h5>
                <p class="ml-3">{{ transactionAttempts.payment_token }}</p>
              </div>
              <div class="tl-item active">
                <div class="tl-dot">
                  <span class="w-32 avatar circle gd-warning">
                    <img
                      src="https://img.icons8.com/office/80/000000/high-connection.png"
                  /></span>
                </div>
                <div class="tl-content">
                  <div class="">
                    <h6 class="mb-3">
                      Step 1: {{ transactionAttempts.message }}
                    </h6>
                    <p>Ip Address: {{ transactionAttempts.ip }}</p>
                    <p>
                      Payment Token: {{ transactionAttempts.payment_token }}
                    </p>
                  </div>
                  <div class="tl-date text-muted mt-1">
                    {{ transactionAttempts.created_at }}
                  </div>
                </div>
              </div>
              <div
                class="tl-item"
                v-for="(transactionAttempt, index) in transactionAttempts.logs"
                :key="index"
              >
                <div class="tl-dot">
                  <!-- <a class="tl-author" href="#" data-abc="true" -->
                  <span class="w-32 avatar circle gd-warning">
                    <img
                      src="https://img.icons8.com/office/80/000000/checked--v1.png"
                    />
                  </span>
                  <!-- </a> -->
                </div>
                <div class="tl-content">
                  <div class="">
                    <h6 class="mb-3">
                      Step {{ index + 2 }}: {{ transactionAttempt.message }}
                    </h6>
                    <p>Ip Address: {{ transactionAttempt.ip }}</p>
                    <!-- <p v-if="transactionAttempt.payment_token">
                      Payment Token: {{ transactionAttempt.payment_token }}
                    </p> -->
                    <p v-if="transactionAttempt.transaction_uuid">
                      Payment uuid: {{ transactionAttempt.transaction_uuid }}
                    </p>
                  </div>
                  <div class="tl-date text-muted mt-1">
                    {{ transactionAttempt.created_at }}
                  </div>
                </div>
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
    return {
      transactionAttempts: null,
    };
  },
  created() {
    this.getTransactionAttempts();
  },
  methods: {
    getTransactionAttempts() {
      this.$store
        .dispatch("getTransactionAttempts", {
          transactionId: this.$route.params.uuid,
        })
        .then((res) => {
          this.transactionAttempts = this.$store.getters.getTransactionAttempts;
          console.log("this.transactionAttempts:", this.transactionAttempts);
        })
        .catch((error) => {});
    },
  },
};
</script>
<style scoped>
body {
  background-color: #f9f9fa;
}

a {
  text-decoration: none;
}

@media (min-width: 992px) {
  .page-container {
    max-width: 1140px;
    margin: 0 auto;
  }

  .page-sidenav {
    display: block !important;
  }
}

.padding {
  padding: 2rem;
}

.w-32 {
  width: 32px !important;
  height: 32px !important;
  font-size: 0.85em;
}

.tl-item .avatar {
  z-index: 2;
}

.circle {
  border-radius: 500px;
}

.gd-warning {
  color: #fff;
  border: none;
  /* background: #f4c414 linear-gradient(45deg, #f4c414, #f45414); */
}

.timeline {
  position: relative;
  border-color: rgba(160, 175, 185, 0.15);
  padding: 0;
  margin: 0;
}

.p-4 {
  padding: 1.5rem !important;
}

.block,
.card {
  background: #fff;
  border-width: 0;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
}

.mb-4,
.my-4 {
  margin-bottom: 1.5rem !important;
}

.tl-item {
  border-radius: 3px;
  position: relative;
  display: -ms-flexbox;
  display: flex;
}

.tl-item > * {
  padding: 10px;
}

.tl-item .avatar {
  z-index: 2;
}

.tl-item:last-child .tl-dot:after {
  display: none;
}

.tl-item.active .tl-dot:before {
  border-color: #448bff;
  box-shadow: 0 0 0 4px rgba(68, 139, 255, 0.2);
}

.tl-item:last-child .tl-dot:after {
  display: none;
}

.tl-item.active .tl-dot:before {
  border-color: #448bff;
  box-shadow: 0 0 0 4px rgba(68, 139, 255, 0.2);
}

.tl-dot {
  position: relative;
  border-color: rgba(160, 175, 185, 0.15);
}

.tl-dot:after,
.tl-dot:before {
  content: "";
  position: absolute;
  border-color: inherit;
  border-width: 2px;
  border-style: solid;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
}

.tl-dot:after {
  width: 0;
  height: auto;
  top: 25px;
  bottom: -15px;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 0;
  border-radius: 0;
}

tl-item.active .tl-dot:before {
  border-color: #448bff;
  box-shadow: 0 0 0 4px rgba(68, 139, 255, 0.2);
}

.tl-dot {
  position: relative;
  border-color: rgba(160, 175, 185, 0.15);
}

.tl-dot:after,
.tl-dot:before {
  content: "";
  position: absolute;
  border-color: inherit;
  border-width: 2px;
  border-style: solid;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
}

.tl-dot:after {
  width: 0;
  height: auto;
  top: 25px;
  bottom: -15px;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 0;
  border-radius: 0;
}

.tl-content p:last-child {
  margin-bottom: 0;
}

.tl-date {
  font-size: 0.85em;
  margin-top: 2px;
  min-width: 100px;
  max-width: 100px;
}

.avatar {
  position: relative;
  line-height: 1;
  border-radius: 500px;
  white-space: nowrap;
  font-weight: 700;
  border-radius: 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  border-radius: 500px;
  box-shadow: 0 5px 10px 0 rgba(50, 50, 50, 0.15);
}
</style>