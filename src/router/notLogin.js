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

            {
                path:'news',
                name:'news',
                meta:{title:'时政要闻'},
                component: () => import ("@/pages/front/news.vue"),
            },

            {
                path:'message',
                name:'message',
                meta:{title:'通知公告'},
                component: () => import ("@/pages/front/message.vue"),
            },

            {
                path:'build',
                name:'build',
                meta:{title:'党政建设'},
                component: () => import ("@/pages/front/build.vue"),
            },

            {
                path:'active',
                name:'active',
                meta:{title:'基层动态'},
                component: () => import ("@/pages/front/active.vue"),
            },

            {
                path:'active',
                name:'active',
                meta:{title:'基层动态'},
                component: () => import ("@/pages/front/active.vue"),
            },

            {
                path:'lineStudy',
                name:'lineStudy',
                meta:{title:'在线学习'},
                component: () => import ("@/pages/front/lineStudy.vue"),
            },
            {
                path:'lineStudy1',
                name:'lineStudy1',
                meta:{title:'党建学习'},
                component: () => import ("@/pages/front/lineStudyChild/lineStudy1.vue"),
            },
            {
                path:'lineStudy2',
                name:'lineStudy2',
                meta:{title:'视频课件'},
                component: () => import ("@/pages/front/lineStudyChild/lineStudy2.vue"),
            },
            {
                path:'lineStudy3',
                name:'lineStudy3',
                meta:{title:'党章学习'},
                component: () => import ("@/pages/front/lineStudyChild/lineStudy3.vue"),
            },
        ]
    },
    {
        path: '/login',
        component: () => import ("@/pages/login/login.vue"),
        name:'login'
    },
/*    {
        path: '/',
        redirect:'/front',
    },*/
    {
        path: '*',
        redirect:'/front',
    },
]
