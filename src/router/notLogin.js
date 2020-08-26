import frontLayout from "../LayoutFront/index"
export const notLoginRouter = [
    {
        path: '/front',
        name:'front',
        component: frontLayout,
        redirect:'/front/index',
        children:[
            {
                path:'index',
                name:'index',
                meta:{title:'首页'},
                component: () => import ("@/pages/front/index.vue"),
            },
            {
                path:'platform',
                name:'platform',
                meta:{title:'党建云宣传平台'},
                component: () => import ("@/pages/front/platform.vue"),
            },
            {
                path:'platform1',
                name:'platform1',
                meta:{title:'党建先锋'},
                component: () => import ("@/pages/front/platformChild/platform1.vue"),
            },
            {
                path:'platform2',
                name:'platform2',
                meta:{title:'党建咨询'},
                component: () => import ("@/pages/front/platformChild/platform2.vue"),
            },
            {
                path:'platform3',
                name:'platform3',
                meta:{title:'党建工作状态'},
                component: () => import ("@/pages/front/platformChild/platform3.vue"),
            },
            {
                path:'platform4',
                name:'platform4',
                meta:{title:'党建宣传管理'},
                component: () => import ("@/pages/front/platformChild/platform4.vue"),
            },
        ]
    },
    {
        path: '/login',
        component: () => import ("@/pages/login/login.vue"),
        name:'login'
    },
    {
        path: '/',
        redirect:'/front',
    },
    {
        path: '*',
        redirect:'/front',
    },
]
