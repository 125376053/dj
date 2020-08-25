<template>
    <el-tree
        show-checkbox
        :data="data"
        default-expand-all
        :default-checked-keys="keys"
        @check="check"
        ref="tree"
        node-key="name"
    >
    </el-tree>
</template>

<script>
    export default {
        data() {
            return {
                data:[
                    {
                        name:'user',
                        label:'用户管理',
                        children:[
                            {name:'userList',label:'用户列表'},
                            {name:'userDetail',label:'用户详情'}
                        ]
                    },
                    {
                        name:'news',
                        label:'新闻管理',
                        children:[
                            {name:'newsList',label:'新闻列表'},
                            {name:'newsDetail',label:'新闻详情'}
                        ]
                    }
                ],
                keys:[]
            };
        },
        mounted(){
            // 权限勾选回显
            if(window.localStorage.getItem('defaultList')){
                this.keys = [...JSON.parse(window.localStorage.getItem('defaultList'))]
            }else{
                this.keys = []
            }
        },
        methods: {
            // 设置 半选(路由拼装) 和 选中(回显keys)
            check(){
                var checked = this.$refs.tree.getCheckedKeys()
                var half = this.$refs.tree.getHalfCheckedKeys()
                window.localStorage.setItem('defaultList',JSON.stringify([...checked]))
                window.localStorage.setItem('userAuth',JSON.stringify([...checked,...half]))
            }
        }
    };
</script>
