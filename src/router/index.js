import Vue from 'vue'
import VueRouter from 'vue-router'
import { notLoginRouter } from "./notLogin"
Vue.use(VueRouter)

const createRouter = () => new VueRouter({
    scrollBehavior: () => ({
        y: 0
    }),
    routes: notLoginRouter
})

const router = createRouter()

export function resetRouter () {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

export default router
