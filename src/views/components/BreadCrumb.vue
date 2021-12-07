<template>
  <div class="breadcrum pd-lft-0">
    <ul>
      <li @if="pageHeader.baseTitle">
        <router-link :to="pageHeader.baseURl ? pageHeader.baseURl : '/'">
          {{ pageHeader.baseTitle }}</router-link
        >
      </li>
      <li><img src="assets/images/breadcrum_arrow.png" alt="" /></li>

      <li @if="pageHeader.pageTitle">
        <span>{{ pageHeader.pageTitle }}</span>
      </li>
    </ul>
  </div>
  <div class="title_block pd-lft-0">
    <div class="title-heading">
      <img
        @if="pageHeader.icon"
        :src="pageHeader.icon"
        alt=""
        class="send_money-icon"
      /><span @if="pageHeader.pageHeading">{{ pageHeader.pageHeading }}</span>
    </div>
  </div>
  <div class="pargraph" @if="pageHeader.pageDescription">
    <p>{{ pageHeader.pageDescription }}</p>
  </div>
</template>

<script>
export default {
  props: {
    pageHeader: { type: Object },
  },
  data() {
    return {};
  },
  watch: {
    // pagination: function()
    // {
    //     this.setButtons();
    // }
  },
  methods: {},
  mounted() {
    // console.log( "Crum", this.link1 );
  },
};
</script>
