<template>
    <div class="header" style="position: relative;box-shadow: none;">
        <div class="hright">
            <div class="leftWrap">
                <img src="../../assets/img/logo.png" alt="">
                <span>青海航源信息科技有限公司云党建平台管理中心</span>
            </div>
            <div class="rightWrap">
                <div class="topNav">
                    <span @click="filterNav('user')">首页</span>
                    <span @click="filterNav('news')">党务</span>
                    <span @click="filterNav('admin')">学习</span>
                    <span @click="filterNav('home')">宣传</span>
                    <span @click="filterNav('user')">活动</span>
                    <span @click="filterNav('news')">民生</span>
                    <span @click="filterNav('admin')">监督</span>
                    <span @click="filterNav('home')">办公</span>
                </div>
                <div class="hrightList" style="">
                    <span v-if="!accno" id="loginName">登录</span>

                    <el-dropdown v-if="accno" trigger="click" @command="itemClick">
                        <span class="el-dropdown-link">
                            {{accno}}
                            <i class="el-icon-arrow-down" style="float:none;"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="loginOut">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

                    <i class="iconfont icon-tubiao-gongjuxiang-66 xiaoxi" title="消息"></i>
                    <!--<span title="换肤" class="huanfu">换肤</span>-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from "vue"
    import router from '../../router'
    export default{
        data(){
            return {
                accno: this.$store.getters.accno || '',
            }
        },
        methods: {
            itemClick(command){
                if (command == 'loginOut') {
                    this.tuichu()
                }
            },
            tuichu(){
                this.$store.commit('logOut')
            },
            filterNav(name){
                //this.$store.commit('fillterMenu',name)
                // 记录现在选择的是哪个菜单下的路由
                //window.localStorage.setItem('filterRouterName',name)
                this.$router.push('/home')
            }
        }
    }
</script>
<style scoped lang="scss">
    .header {
        height: 75px;
        width: 100%;
        overflow: hidden;
        /*background:rgba(255,255,255,1);*/
        box-shadow:0px 1px 2px 0px rgba(196,207,217,1);
        border-bottom: 1px solid #ccc;
        .hright {
            height: 75px;
            color: #fff;
            .leftWrap{
                float:left;
                img{
                    width: 60px;
                    height: 60px;
                    float:left;
                }
                span{
                    float:left;
                    font-size: 22px;
                    margin-left: 10px;
                }
            }
            .rightWrap{
                float:right;
                margin-right: 210px;
            }
            .topNav{
                float: left;
                span{
                    font-size: 22px;
                    cursor: pointer;
                    margin-left:10px;
                }
            }
            .hrightList{
                cursor: pointer;
                float:left;

                /* 不换行 */
                position: absolute;
                right:0;
                top:0;
                height: 75px;

                padding-left: 15px;
                font-size: 14px;
                i{
                    font-size: 16px;
                }
                span{
                    margin-left: 3px;
                }
            }
            .xiaoxi{
                margin: 0 15px;
                cursor: pointer;
            }
            .huanfu{
                cursor: pointer;
            }
        }
        .el-dropdown {
            cursor: pointer;
            color: #fff;
        }
        .el-dropdown-menu {
            top: 30px !important;
        }
    }
</style>
