<template>
    <div>
        <frontHeader></frontHeader>
        <div class="frontContent">
            <frontLeft></frontLeft>
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
