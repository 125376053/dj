<template>
    <!--wrapClass 给滚动条 增加class-->
    <div class="leftNav2" style="width: 230px;">

        <a ref="downUpIcon" href="javascript:;" :style="{left:!collapse?'230px':'0'}" class="downUpIcon" @click="changeCollapse">
            <i class="iconfont" style="color:#fff;margin-top:43px;" :class="!collapse?'icon-tubiao-gongjuxiang-55':'icon-tubiao-gongjuxiang-56'"></i>
        </a>

        <el-scrollbar wrapClass="scrollbar-wrapper" style="height: 100%;">
            <el-menu
                mode="vertical"
                :show-timeout="0"
                class="leftNavMenu"
                ref="leftNavMenu"
                :collapse-transition="false"
                :unique-opened="true"
                :default-active="currentRoute"
                :collapse="collapse"
                background-color=""
                text-color="#333"
                active-text-color=""
            >
                <sidebar-item :routes="permission_routers"></sidebar-item>
            </el-menu>
        </el-scrollbar>

    </div>
</template>

<script>
    import SidebarItem from "./SidebarItem";
    export default {
        data () {
            return {
                effectiveRouteArr: [],
                collapse: false //水平浮动子菜单true  下拉子菜单false
            };
        },
        components: {
            SidebarItem
        },
        computed: {
            permission_routers(){
                //console.log(this.$router.options.routes);
                //console.log(this.$store.getters.permission_routers);
                return this.$store.getters.permission_routers
                //return this.$router.options.routes
            },
            // 点击进入这个路由高亮定位
            currentRoute() {
                const matchedRouteArr = this.$route.matched

                for (let i = matchedRouteArr.length - 1; i >= 0; i--) {
                    const matchedRoutePath = this.effectiveRouteArr.filter(el => el === this.$route.path)[0]

                    if (matchedRouteArr[i].meta.sidebarPointer && !this.$route.query.serverPointer) {
                        return matchedRouteArr[i].meta.sidebarPointer
                    } else if (matchedRoutePath) {
                        return matchedRoutePath
                    } else{
                        return this.$route.query.serverPointer
                    }
                }

            }
        },
        mounted () {
            this.effectiveRouteArr = this.initRouteArr()
        },
        methods: {
            changeCollapse(){
                this.collapse=!this.collapse
                this.$nextTick(()=>{
                    var icon = document.querySelectorAll('.leftNavMenu .el-icon-arrow-right')
                    for(var i=0;i<icon.length;i++){
                        icon[i].style.display="none"
                    }
                    var leftNav = document.querySelector('.leftNav2')
                    var contentMain =document.querySelector('.contentMain')
                    if(this.collapse){
                        leftNav.style.width="0"
                        contentMain.style.left="0"
                    }else{
                        leftNav.style.width="230px"
                        contentMain.style.left="230px"
                    }
                })
            },
            // 刷新是这个路由定位
            initRouteArr() {
                const routerArr = []
                for (const route of this.$router.options.routes) {
                    if (route.hidden === true) {
                        continue
                    } else if (route.children && route.children.length > 0) {
                        route.children.forEach(child => {
                           if(child.children && child.children.length > 0){
                               child.children.forEach(child2 => {
                                   child2.hidden ? null : routerArr.push(`${child.path}/${child2.path}`)
                               })
                           }else{
                               child.hidden ? null : routerArr.push(`${route.path}/${child.path}`)
                           }
                        })
                    }
                }

                return routerArr
            }
        }
    };
</script>
<style scoped="" lang="scss">
    .hleft {
        width: 230px;
        height: 70px;
        line-height: 70px;
        background: #000;
        text-align: center;
        img {
            padding-left: 18px;
            float: left;
            margin-top: 20px;
            padding-right: 10px;
        }
        span {
            float: left;
            font-size: 16px;
            color: #fff;
        }
    }
    .downUpIcon{
        width:12px;
        height: 100px;
        background:url("./updownIcon.png");
        position:absolute;
        top:50%;
        left:230px;
        margin-top: -50px;
        z-index: 9;
    }
    .downUpIcon i{
        position: absolute;
        top:0px;
        right:0;
    }
</style>
