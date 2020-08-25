import Vue from 'vue'
import router from './router/index'
import store from "./store"
import ElementUI from 'element-ui'
//import locale from 'element-ui/lib/locale/lang/en'
//import 'element-ui/lib/theme-chalk/index.css'

import "./permission"
import "./interceptors"
// import 'element-ui/lib/theme-chalk/display.css';// 响应式样式
import "../theme/index.css"// 命令行主题色 默认根目录 theme主题

// axios 挂载
import axios from "axios"
Vue.prototype.$axios = axios

import App from './App'

// 重写message
import messageOnce from './utils/messageOnce';
Vue.use(ElementUI);
Vue.prototype.$message = new messageOnce(); //重写message提示框  一定要放在Vue.use(ElementUI)之后

Vue.config.productionTip = false

// 样式入口
import "@/style/index.css"

// 全局工具函数 只导入index.js文件
// 其他文件在页面上单独导入 import {checkStrong} from '../utils/checkpassStrong.js';
import * as utils from './utils';
Object.keys(utils).forEach(key => {
    Vue.prototype[key] = utils[key]
});

//全局过滤器
import * as custom from './filter';
Object.keys(custom).forEach(key => {
    Vue.filter(key, custom[key])
});

//全局指令
import * as direct from './directive';
Object.keys(direct).forEach(key => {
    Vue.directive(key,direct[key])
});

//全局插件
import * as plugin from "./plugin";
Vue.use(plugin);

window.bus = new Vue()

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})

