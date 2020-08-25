<template>
    <div>
        <div>
            <tinymce-editor :init="init"></tinymce-editor>
        </div>
    </div>
</template>
<script>
    // npm i @tinymce/tinymce-vue -S
    // npm i tinymce -S
    import tinymce from "tinymce/tinymce";
    import Editor from "@tinymce/tinymce-vue";
    import "tinymce/themes/silver/theme";
    import "tinymce/plugins/image";
    import "tinymce/plugins/media";
    import "tinymce/plugins/table";
    import "tinymce/plugins/lists";
    import "tinymce/plugins/contextmenu";
    import "tinymce/plugins/wordcount";
    import "tinymce/plugins/colorpicker";
    import "tinymce/plugins/textcolor";
    import "../../../public/static/tinymce/plugins/media"
    import "../../../public/static/tinymce/plugins/example/plugin"
    var shipin = require('../../../public/static/movie.mp4')
    var tupian = require('../../../public/static/DV.png')

    export default{
        components: {"tinymce-editor": Editor},
        data(){
            return {
                init: {
                    language_url: "/static/tinymce/langs/zh_CN.js",
                    language: "zh_CN",
                    height: 430,
                    //width: 800,
                    plugins: "link lists image code table colorpicker textcolor wordcount contextmenu media bdmap example",
                    toolbar: "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify|bullist numlist |outdent indent blockquote | undo redo | link unlink image code | removeformat media | bdmap example",
                    branding: false, // 隐藏右下角技术支持
                    elementpath:false,
                    statusbar:false,
                    // theme:'mobile',
                    // skin_url:'',
                    base_url: '/static/tinymce',
                    //icons_url: '/icons/christmas/icons.js', // load icon pack
                    //icons: 'christmas',
                    media_live_embeds: true,
                    images_upload_url: '/cimuser/service/v2/toolbox/upload', // 上传图片接口地址
                    //images_upload_base_path: '/demo', // 上传图片基础地址
                    //images_upload_credentials:true,
                    // base64
//                    images_upload_handler:(blobInfo, success,failure)=> {
//                        success('data:image/jpeg;base64,' + blobInfo.base64())
//                    },
                    // 上传前验证 自定义上传图片
//                    images_upload_handler: async (blobInfo, success, failure) => {
//                        var file = blobInfo.blob()
//                        console.log(file);
//                        if (file.size > 1024*1024*5) {
//                            failure("图片请不要大于 5MB");
//                        } else {
//                            var xhr, formData;
//                            xhr = new XMLHttpRequest()
//                            xhr.withCredentials = true
//                            xhr.open('POST', '/cimuser/service/v2/toolbox/upload');
//                            xhr.onload = function () {
//                                var json;
//                                json = JSON.parse(xhr.responseText);
//                                if (json.code == 0) {
//                                    success(tupian)
//                                }else{
//                                    failure(tupian)
//                                }
//                            };
//                            formData = new FormData();
//                            formData.append('file', file, file.name);//此处与源文档不一样
//                            xhr.send(formData);
//                        }
//                    },

                    //想要哪一个图标提供本地文件选择功能，参数可为media(媒体)、image(图片)、file(文件)
                    // 写上 image 则上传图片就显示一个按钮
                    file_picker_types: 'media',

                    // 文件上传
                    file_picker_callback: function (cb, value, meta) {
                        //当点击meidia图标上传时,判断meta.filetype == 'media'有必要，因为file_picker_callback是media(媒体)、image(图片)、file(文件)的共同入口
                        if (meta.filetype == 'media') {
                            //创建一个隐藏的type=file的文件选择input
                            let input = document.createElement('input');
                            input.setAttribute('type', 'file');
                            input.onchange = function () {
                                let file = this.files[0];//只选取第一个文件。如果要选取全部，后面注意做修改
                                let xhr, formData;
                                xhr = new XMLHttpRequest();
                                xhr.open('POST', '/cimuser/service/v2/toolbox/upload');
                                xhr.withCredentials = true
                                xhr.upload.onprogress = function (e) {
                                    // 进度(e.loaded / e.total * 100)
                                };
                                xhr.onerror = function () {
                                    //根据自己的需要添加代码
                                    console.log(xhr.status);
                                    return;
                                };
                                xhr.onload = function () {
                                    let json;
                                    if (xhr.status < 200 || xhr.status >= 300) {
                                        console.log('HTTP 错误: ' + xhr.status);
                                        return;
                                    }
                                    json = JSON.parse(xhr.responseText);
                                    console.log(json);
                                    //假设接口返回JSON数据为{status: 0, msg: "上传成功", data: {location: "/localImgs/1546434503854.mp4"}}
                                    if (json.code == 0) {
                                        //接口返回的文件保存地址
                                        let mediaLocation = json.data;
                                        //cb()回调函数，将mediaLocation显示在弹框输入框中
                                        cb(mediaLocation, {title: file.name});
                                    } else {
                                        console.log(json.msg);
                                        return;
                                    }

                                };
                                formData = new FormData();
                                //假设接口接收参数为file,值为选中的文件
                                formData.append('file', file);
                                //正式使用将下面被注释的内容恢复
                                xhr.send(formData);
                            }
                            //触发点击
                            input.click();
                        }
                    },

                    // 视频上传成功的回调函数
                    video_template_callback: (data) => {
                        console.log(data);
                        tinyMCE.activeEditor.setContent(
                            `<p>
                                <span contenteditable="false" data-mce-object="video" data-mce-p-allowfullscreen="allowfullscreen" data-mce-p-frameborder="no" data-mce-p-scrolling="no" data-mce-p-src=${shipin} data-mce-html="%20">
                                <video src=${shipin} width="100%" controls="controls"></video>
                                </span>
                            </p>`
                        )
                    }
                },
            }
        },
        mounted(){

        },
        methods: {}
    }
</script>
