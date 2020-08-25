import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global' //全局数据
import login from './modules/login' //登录的数据
import tagsViews from "./modules/tagsView"
import getters from './getters'
Vue.use(Vuex)

// vuex 持久化
//import createPersistedState from "vuex-persistedstate"
const store = new Vuex.Store({
    // plugins: [
    //     createPersistedState(
    //         {
    //             key:'step',
    //             storage: window.localStorage,
    //             reducer(val) {
    //                 return {
    //                     step: val.step  // 只储存step
    //                 }
    //             }
    //         }
    //     )
    // ],
    modules: {
        global,
        login,
        tagsViews
    },
    getters
})

export default store
