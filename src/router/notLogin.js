export const notLoginRouter = [
    {
        path: '/index',
        component: () => import ("@/pages/front/index.vue"),
        name:'index'
    },
    {
        path: '/login',
        component: () => import ("@/pages/login/login.vue"),
        name:'login'
    },
    {
        path: '/',
        redirect:'/index',
    },
    {
        path: '*',
        redirect:'/index',
    },
]
