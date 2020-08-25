<template>
    <div>
        <el-button v-auth="{name:'userList',code:'a0'}" type="primary">按钮</el-button>
        <button>不授权限控制室</button>
        <el-button v-auth="{name:'userList',code:'a1',fn:openPage}" type="primary">按钮</el-button>
        <br><br>
        <button>不授权限控制室</button>
        <el-button v-auth="{name:'userList',code:'a8'}" type="primary">按钮</el-button>
        <!--:to="{path:'/user/userDetail'}" 这种跳转 要改成回调执行-->
        <a v-auth="{name:'userList',code:'a2',fn:goDetail}">详情</a>
        <br><br>
        <a v-auth="{name:'userList',code:'a3',fn:baidu}">百度</a>
        <br><br>
        <!--@click="look" 本来的事件不要了,在指令中执行fn=look-->
        <div v-auth="{name:'userList',code:'a4',fn:look}">查看</div>

    </div>
</template>
<script>
    export default{
        components: {},
        data(){
            return {

            }
        },
        methods: {
            look(){
                alert(123)
            },
            baidu(){
                window.location.href='https://www.baidu.com'
            },
            openPage(){
                window.open('#/home')
            },
            goDetail(){
                this.$router.push({
                    path:'/user/userDetail'
                })
            }
        }
    }
</script>
