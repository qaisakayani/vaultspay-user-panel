<template>
  <nav class="left_menu">
      
    <div class="side_menu_detail" data-pushbar-id="side-menu" data-pushbar-direction="left">

        <div class="cross">
        <a href="#"
            ><img src="assets/images/close-icon.png" alt="" data-pushbar-close=""
        /></a>
        </div>

        <ul>
           
        <li class="link-item active">
            <router-link to="/" class="child"
            ><div class="icon">
                <img src="assets/images/dashboard-icon-new.png" alt="" />
            </div>
            Dashboard</router-link
            >
            <ul class="sub-menu" >
                        

             </ul>
              
           
        </li>
        <li v-for="(dashboardFeature, index) in dashboardFeatures" :key="index" :class="subLinkClass(getUrl(dashboardFeature.slug))">
                    
                    <router-link :to="getUrl(dashboardFeature.slug)" class="child">
                        <div class="icon">
                            <img :src="getIcon(dashboardFeature.code)" alt="" />
                        </div>
                        {{ dashboardFeature.name }}
                    </router-link>
        </li>


        
        <li class="link-item">
            <a href="#" class="child"
            ><div class="icon">
                <img src="assets/images/setting-icon-new.png" alt="" />
            </div>
            Settings</a
            >
        </li>
        </ul>   
        

    </div>
  </nav>
</template>

<script>
import 'vue-skeletor/dist/vue-skeletor.css';
import { Skeletor } from 'vue-skeletor';
export default {
     components: { Skeletor },
    data() 
    {
        return {
            dashboardFeatures: false,
            activeFeature: {}
        };
    },
    methods:
    {
        getIcon(code)
        {
            var icon = "assets/images/";

            if(code == "0001")
                return icon + "settlement-icon.png";
            else if(code == "0010")
                return icon + "settlement-icon.png";
            else if(code == "003")
                return icon + "transaction-icon.png";
            else if(code == "0012")
                return icon + "transactions-icon-new.png";
            else if(code == "009")
                return icon + "staff-icon.png";
            else if(code == "0011")
                return icon + "staff-icon.png";

        },
        getUrl(slug)
        {
            var url = "/";

            if(slug == "dashboard-overview")
                return url;
            else if(slug == "send-money")
                return url + "send-money";
            else if(slug == "deposit-money")
                return url + "deposit";

            else if(slug == "with-drawal")
                return url + "withdraw";
            else if(slug == "exchange")
                return url + "currency-exchange";
            else if(slug == "transactions")
                return url + "transactions";

            else if(slug == "request-money")
                return url + "request";
            

            else
                return url;
        },
        featureMenuClass(dashboardFeatures)
        {   
            
            if(dashboardFeatures.id == this.activeFeature?.id)
                return "link-item active";
            else
                return "link-item";
        },
        subLinkClass(url)
        {
            if(url == this.$route.path)
                return "link-item active";
            else
                return "link-item";
        },
        setActiveLink()
        {
            for (const [key, dashboardFeature] of Object.entries(this.dashboardFeatures)) 
            {
                // for (const [index, feature] of Object.entries(dashboardFeature.features)) 
                // {
                    if( this.$route.path == this.getUrl(dashboardFeature.slug) )
                    {
                        this.activeFeature = dashboardFeature;
                    }
                // }
            }
        },
    },
    async mounted()
    {
        await this.$store.dispatch("fetchDashboardFeatures");
        this.dashboardFeatures = this.$store.getters.getDashboardFeatures;
        this.setActiveLink();
    },
    updated()
    {
        this.setActiveLink();
    }
};
</script>
