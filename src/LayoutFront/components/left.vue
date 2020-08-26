<template>
    <div class="leftWrap">
        <div class="title">在线学习</div>
        <ul class="xuexiList">
            <li @click="goPage('')"><i class="el-icon-caret-right"></i><span>党建学习</span></li>
            <li @click="goPage('')"><i class="el-icon-caret-right"></i><span>视频课件</span></li>
            <li @click="goPage('')"><i class="el-icon-caret-right"></i><span>最新课程</span></li>
            <li @click="goPage('')"><i class="el-icon-caret-right"></i><span>热门课程</span></li>
            <li @click="goPage('')"><i class="el-icon-caret-right"></i><span>党章学习</span></li>
        </ul>
        <div class="message">
            <div class="title2">
                <p>通知公告</p>
                <a href="javascript:;">更多》</a>
            </div>
            <ul class="newsList">
                <li v-for="(item,index) in newsList">
                    <p @click="goPage2(item)">
                        <span>{{item.title}}</span>
                        <time>{{item.time}}</time>
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default{
        components: {},
        data(){
            return {
                newsList:[
                    {
                        title:'李克强李克强李克强李克强李克强李克强',
                        time:'2019-01-24'
                    },
                    {
                        title:'李克强李克强李克强李克强李克强李克强',
                        time:'2019-01-24'
                    },
                    {
                        title:'李克强李克强李克强李克强李克强李克强',
                        time:'2019-01-24'
                    },
                    {
                        title:'李克强李克强李克强李克强李克强李克强',
                        time:'2019-01-24'
                    },
                    {
                        title:'李克强李克强李克强李克强李克强李克强',
                        time:'2019-01-24'
                    }
                ]
            }
        },
        methods: {
            goPage(url){
                this.$router.push({
                    name:url
                })
            },
            goPage2(url){
                this.$router.push({
                    name:url
                })
            }
        }
    }
</script>
<style scoped lang="scss">
    .title{
        height: 37px;
        line-height: 37px;
        background: url("../../assets/front/back.jpg") repeat-x;
        color:#d60500;
        font-size: 16px;
        padding-left: 20px;
    }
    .xuexiList{
        margin: 0 10px;
        li{
            height: 37px;
            line-height: 37px;
            background: #f3f3f3;
            color:#333;
            margin-top: 20px;
            padding-left: 20px;
            font-size: 16px;
            i{
                color:#d60500;
            }
            span{
                margin-left: 50px;
            }
        }
        li:hover{
            background: #d60500;
            color:#fff;
            i{
                color:#fff;
            }
        }
    }
    .message{
        margin-top: 20px;
        .title2{
            height: 34px;
            line-height: 34px;
            border-bottom: 1px solid #ccc;
            p{
                width: 98px;
                height: 41px;
                float:left;
                color:#fff;
                text-align: center;
                font-size: 14px;
                background: url("../../assets/front/backg.png") no-repeat;
            }
            a{
                float:right;
                color:#333;
            }
        }
        .newsList{
            li{
                height: 40px;
                line-height: 40px;
                border-bottom: 1px dashed #ccc;
                font-size: 14px;
                color:#333;
                span{
                    float:left;
                    width: 190px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                time{
                    float:right;
                    color:#999;
                }
            }
            li:last-child{
                border-bottom: 0;
            }
        }
    }

</style>
