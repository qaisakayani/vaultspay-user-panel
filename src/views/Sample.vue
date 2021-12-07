<template>
    <div class="main_content">
        <div class="inner_block">
            
            <BreadCrumb
                :link1="{ title: 'Dashboard', url: '/' }"
                :link2="{ title: 'Desposit' }"
            />
            
            <div class="title_block">
                <div class="title-heading">
                <img src="assets/images/transactions-icon.png" alt="" /><span> Desposit </span>
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
                        <label class="label">Status</label>
                        <select
                            class="select-field downicon"
                            @change="setFilter('status', $event.target.value, action)"
                        >
                            <option>Select Status</option>
                            <option
                            v-for="(statusItem, id) in this.vpTransactionStatus()"
                            :key="id"
                            :selected="statusItem.id == this.$store.getters.getFilters.status"
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

            <!-- Main Table Block -->
            
        </div>
    </div>
</template>


<script>

export default 
{

    data() {
        return {
            
        };
    },
    mounted() {
        
    },
};
</script>