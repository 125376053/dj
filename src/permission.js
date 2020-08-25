import router from './router'
// 登录以后的路由
import {loginRouter} from "./router/loginRouter"

import Vue from "vue"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
import {Message} from "element-ui"

NProgress.configure({
    showSpinner: false
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (store.getters.token) {
        if (notLoginRoute(to.path)) {
            next({path: '/'})
        } else {
            if (store.getters.isLogin == false) {
                routerArray()
                store.commit('isLogin', true)
                next(to.fullPath)
            } else {
                if (window.localStorage.getItem('userAuth')) {
                    var authList = JSON.parse(window.localStorage.getItem('userAuth'))
                    if (authList.includes(to.name) || !to.meta.isAuth) {
                        next()
                    } else {
                        Message.error({
                            message: to.name + '暂无权限',
                            duration: 2000,
                            onClose(){
                                next({name: authList[0]})
                            }
                        })
                    }
                } else {
                    next()
                }
            }
        }
    } else {
        if (notLoginRoute(to.path)) {
            next()
        } else {
            next('/login')
        }
    }
    NProgress.done()
})

function notLoginRoute(curPath) {
    var notRouter = [
        '/login'
    ]
    var v = notRouter.find(value => {
        return curPath == value
    });
    return v
}

function routerArray() {
    var arr = []
    router.options.routes = []
    arr = [...loginRouter]
    router.options.routes = [...router.options.routes, ...arr]
    router.addRoutes(arr)
}

// 控制菜单是否应该显示出来 先走 afterEach 后走
if (window.localStorage.getItem('userAuth')) {
    var authList = JSON.parse(window.localStorage.getItem('userAuth'))

    function frontRouterFlag(authList, loginRouter) {
        for (const route of loginRouter) {
            if (route.children) {
                frontRouterFlag(authList, route.children)
            }

            var v = authList.find(value => {
                return route.name == value
            });
            // 找到返回string 找不到返回Undefined typeof v

            // 1 能在权限树里面找到
            // 2 路由不授权限树控制 （受权限树控制的 v里面必须有对应路由）
            // 3 不存在isOriginHidden
            if(v || (route.meta && !route.meta.isAuth && !route.meta.isOriginHidden)){
                Vue.set(route, 'hidden', false)
            }else{
                Vue.set(route, 'hidden', true)
            }

        }
    }
    frontRouterFlag(authList, loginRouter)
}

router.afterEach((to) => {
    // 路由过滤
    if(window.localStorage.getItem('filterRouterName')){
        store.commit('fillterMenu',window.localStorage.getItem('filterRouterName'))
    }else{
        // 全部路由
        store.commit('permission_routers',router.options.routes)
    }
    NProgress.done()
})
