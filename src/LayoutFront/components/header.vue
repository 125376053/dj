<template>
    <div class="frontTop">
        <div class="infoWrap">
            <div class="info">
                <div class="left">
                    <i class="el-icon-date"></i>
                    <span>{{localDate}}</span>
                </div>
                <div class="right">
                    <span>欢迎访问智慧云党建平台！</span>
                    <span v-if="!$store.getters.token" class="loginBtn" @click="$router.push('/login')">登录</span>
                    <span v-if="$store.getters.token" class="loginBtn" @click="$router.push('/home')">张三</span>
                </div>
            </div>
        </div>
        <div class="banner">
            <div class="bannerContent">
                <img src="../../assets/front/bannerLogo.png" alt="">
                <span>智慧云党建平台</span>
            </div>
        </div>

        <nav class="topNav">
            <ul class="firstUl">
                <li class="lif" :class="{curName:navName==item.url}" v-for="(item,index) in navList"
                    @mouseenter="overFirst(item,index)"
                    @mouseleave="outFirst(item,index)"
                    @click.stop="firstGoPage(item,index)">
                    <span>{{item.name}}</span>
                    <i v-if="index!=navList.length-1 && navName!=item.url" class="line">丨</i>
                    <ul class="twoUl" v-if="item.children && navIndex==index">
                        <li class="lit" v-for="(item2,index2) in item.children"
                            @click.stop="twoGoPage(item,item2,index2)">
                            <span>{{item2.name}}</span>
                        </li>
                    </ul>
                </li>

            </ul>
        </nav>

    </div>
</template>
<script>
    export default{
        components: {},
        mounted(){

        },
        data(){
            return {
                navIndex: -1,
                navName: this.$route.query.navName || 'index',
                navList: [
                    {name: '首页', url: 'index'},
                    {
                        name: '党建云宣传平台',
                        url: 'platform',
                        children: [
                            {
                                name: '党建先锋',
                                url: 'platform1',
                            },
                            {
                                name: '党建咨询',
                                url: 'platform2',
                            },
                            {
                                name: '党建工作状态',
                                url: 'platform3',
                            },
                            {
                                name: '党建宣传管理',
                                url: 'platform4',
                            }
                        ]
                    },
                    {name: '时政要闻', url: 'news'},
                    {name: '通知公告', url: 'message'},
                    {name: '党政建设', url: 'build'},
                    {name: '基层动态', url: 'active'},
                    {
                        name: '在线学习',
                        url: 'lineStudy',
                        children: [
                            {
                                name: '党建学习',
                                url: 'lineStudy1',
                            },
                            {
                                name: '视频课件',
                                url: 'lineStudy2',
                            },
                            {
                                name: '党章学习',
                                url: 'lineStudy3',
                            }
                        ]
                    },
                    {name: 'APP下载', url: ''},
                ]
            }
        },
        computed: {
            localDate(){
                var year = this.getLocalDate().year
                var month = this.getLocalDate().month
                var date = this.getLocalDate().date
                var week = this.getLocalDate().week
                return year + '年' + month + '月' + date + '日 ' + week
            }
        },
        methods: {
            overFirst(item, index){
                this.navIndex = index
                this.navName = item.url
            },
            outFirst(item, index){
                this.navIndex = -1
                this.navName = this.$route.query.navName || 'index'
            },
            firstGoPage(item, index){
                this.navName = item.url
                this.$router.push({name: item.url, query: {navName: item.url}})
            },
            twoGoPage(item, item2, index2){
                this.navName = item.url
                this.$router.push({name: item2.url, query: {navName: item.url}})
            }
        }
    }
</script>
<style scoped lang="scss">
    .frontTop {
        font-size: 14px;
        color: #555;
        .infoWrap {
            background: #efefef;
        }
        .info {
            height: 33px;
            width: 1200px;
            margin: 0 auto;
            line-height: 33px;
            .left {
                float: left;
            }
            .right {
                float: right;
                .loginBtn {
                    color: #b8152b;
                    cursor: pointer;
                }
            }
        }
        .banner {
            height: 320px;
            background: url("../../assets/front/banner.jpg") no-repeat center top;
            .bannerContent {
                width: 1200px;
                margin: 0 auto;
                line-height: 320px;
                img {
                    margin-right: 80px;
                    float: left;
                    margin-top: 110px;
                }
                span {
                    font-size: 56px;
                    font-family: 宋体;
                    font-weight: 900;
                    color: #fbe818;
                    float: left;
                }
            }
        }
        .topNav {
            width: 1200px;
            height: 48px;
            margin: 0 auto;
            .firstUl {
                background: #b8152b;
                height: 48px;
                padding: 0 20px;
            }
            .twoUl {
                overflow: hidden;
                background: #000;
                border-top: 1px solid #ccc;
                box-shadow: 0 0 5px #ccc;
                position: relative;
                z-index: 99;
            }
            li {
                float: left;
                height: 48px;
                line-height: 48px;
                text-align: center;
                width: 134px;
                background: #b8152b;
                color: #fff;
                .line {
                    float: right;
                    font-style: normal;
                    color: #000;
                    height: 30px;
                    background: #666;
                    width: 1px;
                    margin-top: 10px;
                }
            }
            li:hover {
                background: #fff;
                color: #666;
            }
            li.curName {
                background: #fff;
                color: #666;
            }
        }
    }
</style>
