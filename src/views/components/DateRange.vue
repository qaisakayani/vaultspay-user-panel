<template>

    <li class="w-3 marg-right">
        <div class="fields">
            <div class="field">
                <label class="label">Date Range</label>
                <input
                    placeholder="10/06/2022, 05:59PM"
                    class="input-field calendar-field"
                />
            </div>
            
            <div class="middle">to</div>

            <div class="field">
                <div class="clear"><a href="javascript:void(0)">Clear</a></div>
                <input
                    placeholder="10/06/2022, 05:59PM"
                    class="input-field calendar-field"
                />
            </div>
        </div>
    </li>

</template>

<script>

export default 
{
    props: [
        "action",
    ],
    data() {
        return {
           
        };
    },
    watch: {
        // pagination: function() 
        // {
        //     this.setButtons();
        // }
    },
    methods:
    {
        
    },
    mounted() {
        // console.log( "Slot mounted" );
    },
};
</script>