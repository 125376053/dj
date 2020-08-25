<template>
    <!--
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.5)"
    -->
    <!--app-main 100%必须要加-->
    <section
        class="app-main"
        v-loading="$store.state.global.loadingStatus"
        element-loading-background="rgba(255, 255, 255, 0)"
        style="height:100%;"
    >
        <NavBar></NavBar>

        <h1 id="zhangchaojie">
            <tags-view></tags-view>
        </h1>

        <div class="contentView">
            <!--100%也必须要加-->
            <el-scrollbar id="elscrollbar" ref="elscrollbar" style="height: 100%;">

                <div class="content">
                    <keep-alive :include="needPage">
                        <!--一定不能再组件中有v-if 会刷新导致缓存失效-->
                        <!--每个组件都要带name 不然include也无效-->
                        <!--
                            :key="$route.fullPath" 解决相同组件缓存路由问题
                        -->
                        <router-view class="page" :key="$route.fullPath"></router-view>
                    </keep-alive>
                </div>
            </el-scrollbar>
        </div>

    </section>
</template>
<script>
    import TagsView from './TagsView.vue'
    import NavBar from "./Navbar.vue"
    export default{
        components: {
            NavBar,
            TagsView
        },
        watch:{
            $route(){
                var div = this.$refs['elscrollbar'].$refs['wrap'];
                //console.log(2222);
                //console.log(div);
                this.$nextTick(() => {
                    div.scrollTop = 0
                })
            }
        },
        // 可以访问和修改数据 不会触发死循环
//        beforeUpdate(){
//            var div = this.$refs['elscrollbar'].$refs['wrap'];
//            console.log(2222);
//            console.log(div);
//            this.$nextTick(() => {
//                div.scrollTop = 0
//            })
//        },
        // 只有数据进行渲染后才会触发 不能修改数据(死循环) 可以操作dom
        updated(){},
        computed:{
            needPage(){
                return this.$store.getters.needPage
            }
        }
    }
</script>

<style scoped="">

    /* 主要是为了显示出 嫖亮的滚动条 不用默认的滚动条 */
    .contentView{
        height: calc(100% - 81px);
    }
    .content{
        /* 防止缩小出问题 */
        min-width: 520px;
        overflow: hidden;

        /* min-height 完美解决右侧内容铺不满时 背景要全部显示至少显示一屏的白色背景 */
        /* 70px 是头 76是面包屑+页签 40是margin上下间距 */
        min-height: calc(100vh - 70px - 81px - 40px);
        margin: 20px;
        background: #fff;
        padding: 20px;
        box-sizing: border-box;
    }
</style>
