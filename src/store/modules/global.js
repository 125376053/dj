import router from "../../router"
import Vue from "vue"
const global = {
    state: {
        loadingStatus: false,
        permission_routers:[],
        needPage:[],
    },
    mutations: {
        changeLoadingStatus(state, flag) {
            state.loadingStatus = flag;
        },
        permission_routers(state,data){
            state.permission_routers = data
        },
        fillterMenu(state,data){
            // 先让路由初始化
            state.permission_routers = router.options.routes
            if(data == 'home'){
                return
            }
            // 在筛选
            var v = state.permission_routers.filter(item=>{
                if(item.meta && item.meta.filterName){
                    return item.meta.filterName == data
                }else{
                    return item.name == data
                }
            })
            state.permission_routers = v
        },
        needPageNull(state){
            state.needPage = [];
        },
    },
    actions: {
        changeLoadingStatus({ commit }, flag) {
            commit("changeLoadingStatus", flag);
        }
    },
    getters:{
        permission_routers:state=>state.permission_routers,
        needPage:state=>state.needPage,
    }
}

export default global
