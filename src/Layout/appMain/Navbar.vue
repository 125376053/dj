<template>
    <el-menu class="navbar" mode="horizontal">
        <div class="zzzzzz">
            <breadcrumb></breadcrumb>
            <!--<topBar></topBar>-->
        </div>
    </el-menu>
</template>

<script>
    import Breadcrumb from '@/components/Breadcrumb'
    //import topBar from '@/components/topBar'
    export default {
        components: {
            //topBar,
            Breadcrumb,
        }
    }
</script>

<style scoped>
    .navbar {
        padding: 0 20px;
        height: 40px;
        line-height: 40px;
        border-radius: 0px !important;
    }
    .zzzzzz:focus{
        outline: none!important;
    }
</style>
