<template>
    <div class="tinymce-box">
        <button id="btn1">获取html</button>
        <button id="btn2">获取text</button>

        <div id="editor"></div>

        <div class="showEditor" v-html="html"></div>
    </div>
</template>

<script>
    import wangeditor from "../../../public/static/wangEditor/wangEditor"
    export default{
        data(){
            return {
                html: ''
            }
        },
        mounted(){
            // 创建编辑器
            var editor = new wangeditor('#editor')

            // 自定义菜单配置
            editor.customConfig.menus = [
                'head',  // 标题
                'bold',  // 粗体
                'fontSize',  // 字号
                'fontName',  // 字体
                'italic',  // 斜体
                'underline',  // 下划线
                'strikeThrough',  // 删除线
                'foreColor',  // 文字颜色
                'backColor',  // 背景颜色
                'link',  // 插入链接
                'list',  // 列表
                'justify',  // 对齐方式
                'quote',  // 引用
                'emoticon',  // 表情
                'image',  // 插入图片
                'table',  // 表格
                'video',  // 插入视频
                'code',  // 插入代码
                'undo',  // 撤销
                'redo'  // 重复
            ]

            // 自定义配置颜色（字体颜色、背景色）
            editor.customConfig.colors = [
                '#000000',
                '#eeece0',
                '#1c487f',
                '#4d80bf',
                '#c24f4a',
                '#8baa4a',
                '#7b5ba1',
                '#46acc8',
                '#f9963b',
                '#ffffff'
            ]

            //配置属性名称，绑定请求的图片数据  controller会用到，可以随便设置，但是一定要与controller一致
            editor.customConfig.uploadFileName = 'file';
            editor.customConfig.withCredentials = true

            // 配置服务器端地址,也就是controller的请求路径，不带项目路径，前面没有/  http://192.168.101.83/haike/common/upload/wangEditImg
            editor.customConfig.uploadImgServer = '/cimuser/service/v2/toolbox/upload'

            // 本地图片上传：重写方法
            /*editor.customConfig.customUploadImg = function (files, insert) {
             // 逐个上传
             files.forEach(item => {
             upload.image({
             url: '${application.imageServerUrl}/upload/cors/single/图片上传接口',
             file: item,
             success: (res) => {
             if (res.status === 200) {
             // 塞进去
             insert(res.data.图片Url);
             }
             },
             error: () => (that.$message.error('上传失败'))
             });
             });
             };*/
            editor.customConfig.showLinkImg = false
            editor.customConfig.uploadImgTimeout = 50000;
            editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024;

            editor.customConfig.uploadImgHooks = {
                customInsert: function (insertImg, result, editor) {
                    console.log(insertImg, result, editor);
                    // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                    // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
                    // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                    //var url = '/'+result.data;
                    //console.log(url);

                    var result = {
                        code: 0,
                        data: [
                            {
                                url: require('../../../public/static/DV.png')
                            },
                            {
                                url: require('../../../public/static/EV.png')
                            },
                            {
                                url: require('../../../public/static/OV.png')
                            }
                        ]
                    }
                    result.data.forEach((value, index) => {
                        insertImg(value.url);
                    })
                }
            }

            // 视频上传
            editor.customConfig.showLinkVideo = false
            editor.customConfig.uploadVideoServer = '/cimuser/service/v2/toolbox/upload'; // 上传接口
            editor.customConfig.uploadVideoHooks = { // 上传完成处理方法
                customInsert: function (insertVideo, result) {
                    var result = {
                        code: 0,
                        data: [
                            {
                                url: require('../../../public/static/banner.mp4')
                            },
                            {
                                url: require('../../../public/static/movie.mp4')
                            }
                        ]
                    }
                    //if (result.code === 0) {
                    result.data.forEach((value, index) => {
                        insertVideo(value.url);
                    })
                    //} else {
                    //alert('上传失败');
                    //}
                }
            };

            editor.create()

            // 设置内容
            editor.txt.html('<p>用 JS 设置的内容</p>')
            editor.txt.append('<p>追加的内容</p>')

            // editor.txt.clear()

            document.getElementById('btn1').addEventListener('click', () => {
                // 读取 html
                this.html = editor.txt.html()
            }, false)

            document.getElementById('btn2').addEventListener('click', () => {
                // 读取 text
                this.html = editor.txt.text()
            }, false)
        }
    }
</script>
<style>
    #editor{
        background: #fff;
    }
</style>
