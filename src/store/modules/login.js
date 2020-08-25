import axios from "axios"
import router from "@/router"
import {resetRouter} from "../../router"
import { resetMenu } from "../../utils/resetMenu"
const login = {
    state: {
        userInfo: {},
        token: '',
        accno: '',
        userType: '', // 角色
        userId: '',
        isLogin:false
    },
    mutations: {
        setLogin: (state, info) => {
            state.userInfo = info  // 登录的具体对象
            state.token = info.token
            state.accno = info.accno
            state.userType = info.userType
            state.userId = info.userId
            state.accountType = info.accountType

            localStorage.setItem("token", info.token);
            localStorage.setItem("accno", info.accno);
            localStorage.setItem("userType", info.userType);
            localStorage.setItem("userId", info.userId);
            localStorage.setItem("accountType", info.accountType);
        },
        // token过期设置token
        setToken(state){
            state.token = null
            localStorage.clear()
            router.push('/')
            state.isLogin = false
            resetRouter()
            //window.location.reload()
        },
        logOut(state){
            axios.post(`/cimuser/service/v2/out/loginOut`).then(res => {
                if (res.data.code == 0) {
                    state.token = null
                    localStorage.clear()
                    router.push('/login')
                    state.isLogin = false
                    resetRouter()
                    resetMenu()
                    //window.location.reload()
                }
            })
        },

        // 设置是否登录开关
        isLogin(state,flag){
            state.isLogin = flag
        },
    },
    actions: {
        getLoginUser({commit}, params) {
            return new Promise((resolve, reject) => {
                // 新的
                axios({
                    method: 'post',
                    url: params.url,
                }).then((res) => {
                    if (res.data.code === 2) {
                        commit("setLogin", res.data);
                        resolve()
                    } else {
                        reject(res.data)
                    }
                })
            })
        }
    },
    getters: {
        userInfo: state => state.userInfo || window.localStorage.getItem('userInfo'),
        token: state => state.token || window.localStorage.getItem('token'),
        accno: state => state.accno || window.localStorage.getItem('accno'),
        userType: state => state.userType || window.localStorage.getItem('userType'),
        userId: state => state.userId || window.localStorage.getItem('userId'),
        accountType: state => state.accountType || window.localStorage.getItem('accountType'),
        isLogin:state => state.isLogin
    }
}

export default login
