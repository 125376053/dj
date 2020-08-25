<template>
    <el-container>

        <el-header class="headerTop">
            <HeaderTop></HeaderTop>
        </el-header>

        <el-aside class="leftNav">
            <Slidebar></Slidebar>
        </el-aside>

        <el-main class="contentMain">
            <appMain></appMain>
        </el-main>

    </el-container>
</template>
<script>
    import HeaderTop  from "./Header/index.vue"
    import Slidebar  from "./Sidebar/index.vue"
    import appMain from "./appMain/index.vue"
    export default{
        data() {
            return {}
        },
        components: {
            HeaderTop,
            Slidebar,
            appMain
        }
    }
</script>
