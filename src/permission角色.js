// 默认路由
import router from './router'
// 权限路由
// import {notLoginRouter} from "./router/notLogin"
// import {adminRouter} from "./router/admin"
import {frontRouter} from "./router/front"

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

NProgress.configure({
    showSpinner: false
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (store.getters.token) {
        if (notLoginRoute(to.path)) {
            next({path: '/index'})
        } else {
            if (store.getters.isLogin == false) {
                routerArray()
                store.commit('isLogin', true)
                next(to.fullPath)
            } else {
                next()
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

router.afterEach(() => {
    NProgress.done()
})

/*
* 根据角色生成权限路由做法
* 1 直接利用addRoutes剔除没有权限的路由 实现菜单隐藏和页面不让进
* 2 具体 routerArray() filterArr() hasPermission() 这三个函数搞定
* */

// 不需要登录的路由
function notLoginRoute(curPath) {
    var notRouter = [
        '/login'
    ]
    var v = notRouter.find(value => {
        return curPath == value
    });
    return v
}

// 动态路由
function routerArray() {
    var arr = []
    var rulos = ['admin']
    // 生成动态路由前先重置路由
    router.options.routes= []
    if(rulos.includes('admin')){
        arr = frontRouter
    }else{
        arr = filterArr(rulos,frontRouter)
    }
    router.options.routes = [...router.options.routes, ...arr]
    router.addRoutes(arr)
}

// 根据角色对路由进行过滤
function filterArr(rulos,frontRouter){
    var re = []
    for (const route of frontRouter) {
        if(hasPermission(rulos,route)){
            if(route.children){
                route.children= filterArr(rulos,route.children)
            }
            re.push(route)
        }
    }
    return re
}

// 检测角色是否拥有路由权限
function hasPermission(roles, route) {
    if (route.meta && route.meta.auth) {
        return roles.some(role => route.meta.auth.includes(role))
    } else {
        return true
    }
}
