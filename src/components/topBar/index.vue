<template>
    <nav>
        <!--1级-->
        <el-button
            type="text"
            @click="returnToFromPage"
            style="color:#409EFF;font-size: 16px;"
        >
            123
        </el-button>
        <el-button
            type="text"
           style="margin-left: 0px;color:#666;font-size: 16px;"
           icon="el-icon-arrow-right"
        ></el-button>
        <!--2级-->
        <el-button type="text" style="margin-left: 0;color:#666;font-size: 16px;">
            456
        </el-button>
    </nav>
</template>
<script>
    export default{
        data(){
            return {
                parentTitle:'',
                selfTitle:'',
                parentPath:''
            }
        },
        methods: {
            returnToFromPage() {
                this.$router.push({path: '/auth/authIndex'})
            },
            /*getTitle(){
                console.log(111111111)
                let matched = this.$route.matched
                console.log(matched);
                console.log(matched[1].meta.title)
                this.title=matched[1].meta.title
            }*/
        },
        watch: {
            $route() {
               // this.getTitle()
            }
        },
        mounted(){
           // this.getTitle()
        }
    }
</script>

<style type="text/scss" scoped>
    nav {
        width: 100%;
        height: 50px;
        overflow: hidden;
    }

    .el-button--text {
        color: #666;
    }

    .title {
        display: inline-block;
        font-size: 16px;
    }

    .el-button {
        font-size: 18px;
    }
</style>

