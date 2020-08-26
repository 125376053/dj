<template>
    <div style="height: 100px;background: #ccc;">
        头部
        <h1 v-if="!$store.getters.token" @click="$router.push('/login')">登录页</h1>
        <h1 v-if="$store.getters.token" @click="$router.push('/home')">系统内部</h1>
    </div>
</template>
<script>
    export default{
        components: {},
        data(){
            return {}
        },
        methods: {}
    }
</script>
