<template>
    <div>
        <frontHeader></frontHeader>
        <div class="frontContent" v-if="$route.path!='/front/index'">
            <div class="frontLeft">
                <frontLeft></frontLeft>
            </div>
            <div class="frontRight">
                <router-view :key="$route.path"></router-view>
            </div>
        </div>
        <div class="frontContent" v-else>
            <router-view :key="$route.path"></router-view>
        </div>
        <frontFooter></frontFooter>
    </div>
</template>
<script>
    import frontHeader from "./components/header.vue"
    import frontLeft from "./components/left.vue"
    import frontFooter from "./components/footer.vue"
    export default{
        components: {
            frontHeader,
            frontLeft,
            frontFooter
        },
        data(){
            return {}
        },
        methods: {}
    }
</script>
<style scoped="" lang="scss">
    .frontContent{
        width: 1200px;
        margin: 20px auto;
        overflow: hidden;
    }
    .frontLeft{
        width: 270px;
        float:left;
    }
    .frontRight{
        width: 900px;
        float: right;
    }
</style>
