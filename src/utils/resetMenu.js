
import {loginRouter} from "../router/loginRouter"
import Vue from "vue"

export function resetMenu(){
    function frontRouterFlag2(loginRouter) {
        for (const route of loginRouter) {
            if (route.children) {
                frontRouterFlag2(route.children)
            }
            // 还原路由 拦截处设置了 !route.meta.isAuth =false 也就是 存在的为true 隐藏了 现在取反 排除掉 isOriginHidden
            if ( route.meta && route.meta.isAuth || route.meta && !route.meta.isOriginHidden ) {
                Vue.set(route, 'hidden', false)
            } else {
               // Vue.set(route, 'hidden', true)
            }
        }
    }
    frontRouterFlag2(loginRouter)
}
