<template>
    <div>
        <baidu-map :center="center" :zoom="zoom" @ready="handler" style="width:100%;height:calc(100vh - 222px)" @click="getClickInfo"
                   :scroll-wheel-zoom='true'>
        </baidu-map>
    </div>
</template>
<script>
    import Vue from "vue"
    import BaiduMap from 'vue-baidu-map'
    Vue.use(BaiduMap, {
        ak: 'luSj6MUEG85cfUL7mFMzZEHQ'
    })
    export default {
        name: 'TestBaiDu',
        data () {
            return {
                // 不要在这里设置
                center: {lng: '', lat: ''},
                zoom: 0
            }
        },
        mounted(){

        },
        methods: {
            handler ({BMap, map}) {
                // 百度地图API功能
                var point = new BMap.Point(116.404, 39.915);
                map.centerAndZoom(point, 15);
                // map.enableScrollWheelZoom(true);

                //var marker = new BMap.Marker(new BMap.Point(116.404, 39.915)); // 创建点
                //map.addOverlay(marker);            //增加点
                //marker.addEventListener("click", this.overlay_style);

                var polyline = new BMap.Polyline([
                    new BMap.Point(116.383752, 39.91334),
                    new BMap.Point(116.38792, 39.920866),
                    new BMap.Point(116.390867, 39.906532),

                    new BMap.Point(116.400867, 39.906532),
                    new BMap.Point(116.410867, 39.906532),
                    new BMap.Point(116.420867, 39.906532)
                ], {strokeColor: "red", strokeWeight: 5, strokeOpacity: 1});   //创建折线
                map.addOverlay(polyline);          //增加折线
                polyline.addEventListener("click", this.overlay_style);

                // 设置文字便签
                this.manyText(point,BMap, map)
                this.manyImg(BMap, map)
            },
            getClickInfo (e) {
                console.log(e.point.lng)
                console.log(e.point.lat)
                this.center.lng = e.point.lng
                this.center.lat = e.point.lat
            },
            //获取marker的属性
            overlay_style(e){
                var p = e.target;
                if (p instanceof BMap.Marker) {
                    alert("该覆盖物是点，点的坐标是：" + p.getPosition().lng + "," + p.getPosition().lat);
                } else if (p instanceof BMap.Circle) {
                    alert("该覆盖物是圆，圆的半径是：" + p.getRadius() + "，圆的中心点坐标是：" + p.getCenter().lng + "," + p.getCenter().lat);
                } else if (p instanceof BMap.Polyline) {
                    alert("该覆盖物是折线，所画点的个数是：" + p.getPath().length);
                } else {
                    alert("无法获知该覆盖物类型");
                }
            },
            manyText(point,BMap, map){
                var marker = new BMap.Marker(point);  // 创建标注
                map.addOverlay(marker);              // 将标注添加到地图中

                var label = new BMap.Label("我是文字标注哦",{offset:new BMap.Size(20,-10)});
                marker.setLabel(label);

                marker.addEventListener("click", function(e){
                    alert(1111)
                });
            },
            manyImg(BMap, map){
                var points = [
                    {lng:116.383752,lat: 39.91334, text:'上地1', info:'11111111111',icon:require('../../assets/img/logo.png')},
                    {lng:116.38792, lat:39.920866, text:'上地2', info:'222222222222',icon:require('../../assets/img/logo.png')},
                    {lng:116.390867,lat: 39.906532, text:'上地3', info:'33333333333',icon:require('../../assets/img/logo.png')},
                    {lng:116.400867,lat: 39.906532, text:'上地4', info:'444444444',icon:require('../../assets/img/logo.png')},
                    {lng:116.410867,lat: 39.906532, text:'上地5', info:'5555555',icon:require('../../assets/img/logo.png')},
                    {lng:116.420867,lat: 39.906532, text:'上地6', info:'666666666666',icon:require('../../assets/img/logo.png')}
                ]
                points.forEach((item,index)=>{
                    var myIcon = new BMap.Icon(item.icon, new BMap.Size(50,25),{
                        //anchor: new BMap.Size(10, 25) // 想的point位置的偏移
                    });
                    // 设置图片大小
                    myIcon.setImageSize(new BMap.Size(50,25))


                    var marker = new BMap.Marker(new BMap.Point(item.lng,item.lat),{icon:myIcon});  // 创建标注
                    map.addOverlay(marker);              // 将标注添加到地图中
                    // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                    var label = new BMap.Label(item.text,{offset:new BMap.Size(20,-10)}); //创建文字
                    marker.setLabel(label); // 文字添加到地图中

                    // 创建信息窗口对象
                    var opts = {
                        width : 50,     // 信息窗口宽度
                        height: 50,     // 信息窗口高度
                        title : item.info , // 信息窗口标题
                        //enableMessage:true,//设置允许信息窗发送短息
                        //message:"亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
                    }
                    var infoWindow = new BMap.InfoWindow(item.info,opts);  // 创建信息窗口对象
                    marker.addEventListener("click", function(e){
                        map.openInfoWindow(infoWindow,new BMap.Point(item.lng,item.lat)); //开启信息窗口
                    });
                })
            }
        }
    }
</script>
