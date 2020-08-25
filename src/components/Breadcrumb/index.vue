<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path" v-if="item.meta.title">
                <span v-if="index==levelList.length-1" class="no-redirect">
                    {{item.meta.title}}
                </span>
            <router-link v-else :to="item.redirect||item.path">
                {{item.meta.title}}
                </router-link>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
    export default {
        created() {
            this.getBreadcrumb()
        },
        data() {
            return {
                levelList: null
            }
        },
        watch: {
            $route() {
                this.getBreadcrumb()
            }
        },
        methods: {
//            getBreadcrumb() {
//                let matched = this.$route.matched.filter(item => {
//                    return item.name
//                })
//                this.levelList = matched
//            }
            getBreadcrumb() {
                let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
                const first = matched[0]
                //console.log(first);
                if (!this.isDashboard(first)) {
                    matched = [{path: '/home/homePage', meta: {title: '我的桌面'}}].concat(matched)
                }

                this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
                //console.log(this.levelList);
            },
            isDashboard(route) {
                const name = route && route.name
                //console.log(name);
                if (!name) {
                    return false
                }
                // 如果是 dashboard自己 就返回true 否则false
                return name.trim().toLocaleLowerCase() === 'homePage'.toLocaleLowerCase()
            },
        }
    }
</script>

<style rel="stylesheet/scss" scoped>
    .app-breadcrumb.el-breadcrumb {
        display: inline-block;
        font-size: 14px;
        /*margin-left: 10px;*/
    }
    .no-redirect {
        color: #97a8be;
        cursor: text;
    }
</style>
