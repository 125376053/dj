<template>
    <ul class="zhang_step">
        <li :class="{cur:active>=index}" v-for="(item,index) in stepArr" :style="{width:width}">
            <a style="display:inline-block;width: 34px;height: 34px;line-height:34px;background:#fff;border-radius:50%;text-align: center;margin-right: 20px;">
                <i style="font-size: 18px;font-weight: normal;" :class="item.icon"></i>
            </a>
            <span>{{item.title}}</span>
            <div v-if="index<stepArr.length-1" :class="active>=index?'jiaoActive':'jiao'"></div>
            <div class="baiBian"></div>
        </li>
    </ul>
</template>
<script>
    export default{
        props:{
            active:{
                default:0
            },
            stepArr:{
                default:[]
            },
            width:{
                default:'100%'
            }
        },
        watch:{
            active(a){
                if(a<=0){
                    this.$emit('update:active',0)
                    console.log('已经是最小值了'+a)
                }
                if(a>this.stepArr.length-1){
                    this.$emit('update:active',this.stepArr.length-1)
                    console.log('已经是最大值了'+a)
                }
            }
        },
        data(){
            return{

            }
        }
    }
</script>
<style scoped lang="scss">
    .zhang_step{
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0px auto;
        overflow: hidden;
        li{
            height: 50px;
            background: #D2D8DF;
            font-size: 14px;
            color:#333;
            font-weight: bold;
            text-align: center;
            line-height: 50px;
            /*width: 20%;*/
            /*flex-basis: 100%;*/
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        li.cur{
            background: #416FF0;
            color:#fff;
            font-weight: normal;
            i{
                color: #416FF0;
            }
        }
        /*三角形绘制*/
        .jiao{
            width: 0;
            height: 0;
            border-top: 25px solid transparent;/*高度一半*/
            border-left: 25px solid #D2D8DF; /*调整宽度*/
            border-bottom: 25px solid transparent;/*高度一半*/
            position: absolute;
            right:-25px;/*跟宽度保持一致*/
            top:0;
            z-index: 2;
        }
        .jiaoActive{
            width: 0;
            height: 0;
            border-top: 25px solid transparent;/*高度一半*/
            border-left: 25px solid #3272E9; /*调整宽度*/
            border-bottom: 25px solid transparent;/*高度一半*/
            position: absolute;
            right:-25px;/*跟宽度保持一致*/
            top:0;
            z-index: 2;
        }
        /*大4个px的边 33-25/2 =4 */
        .baiBian{
            width: 0;
            height: 0;
            border-top: 33px solid transparent;/*高度一半*/
            border-left: 33px solid rgba(255,255,255,.5); /*调整宽度*/
            border-bottom: 33px solid transparent;/*高度一半*/
            position: absolute;
            right:-33px;/*跟宽度保持一致*/
            top:-8px;/* 边框的2倍 4*2 */
            z-index: 1;
        }
    }
</style>
