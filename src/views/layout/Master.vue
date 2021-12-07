<template>
    <div class="page-wrapper">
            <Header />
        <div class="inner_container">
            

            <div class="main_container">

                <Sidebar />

                <router-view></router-view>

            </div>

            <Footer />
        </div>
    </div>
</template>


<script>

// Import Layout
import Header from './common/Header';
import Footer from './common/Footer';
import Sidebar from './common/Sidebar';

export default {

    components: {
        Header,
        Footer,
        Sidebar
    },
    data() {
        return {
        };
    },
    mounted() {
        console.log( "main app" );
    },
};
</script>