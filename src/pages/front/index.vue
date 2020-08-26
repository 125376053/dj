<template>
    <div>
        <frontHeader></frontHeader>
        <div>
            <frontLeft></frontLeft>
            <div class="frontContent">
                首页
            </div>
        </div>
        <frontFooter></frontFooter>
    </div>
</template>
<script>
    import frontHeader from './components/header.vue'
    import frontFooter from './components/footer.vue'
    import frontLeft from './components/left.vue'
    export default{
        components: {
            frontHeader,
            frontFooter,
            frontLeft
        },
        data(){
            return {}
        },
        methods: {}
    }
</script>
