import Layout from '@/Layout'
export const loginRouter = [
    /*  首页 */
    {
        path: '/home',
        component: Layout,
        name:'home',
        redirect:'/home/homePage',
        hidden:true,
        meta: {
            isOriginHidden:true,  // 菜单一直隐藏
            filterName:'user', // 过滤路由用的
            title: "我的桌面",
            icon: "iconfont icon-tubiao-gongjuxiang-79 iconSize",
            breadcrumb:false, // 是否显示面包导航
        },
        children: [
            {
                path: "homePage",
                component: () => import ("@/pages/home/index"),
                name: "homePage",
                meta: {
                    title: "我的桌面",
                    icon: "iconfont icon-tubiao-gongjuxiang-79 iconSize",
                    breadcrumb:false,// 是否显示面包导航
                }
            }
        ]
    },
    /* 案例参考 先预留下 */
    {
        path: '/user',
        component: Layout,
        name:'user',
        isAuth:true,// 是否受权限树控制
        redirect:{
            name:'userList'
        },
        meta: {
            filterName:'user',
            title: "用户管理",
            icon: "iconfont icon-tubiao-gongjuxiang-79 iconSize",
            isAuth:true, // 是否受权限树控制
        },
        alwaysShow:true,// 只有一层也显示父菜单
        children: [
            {
                path: "userList",
                component: () => import ("@/pages/user/list"),
                name: "userList",
                meta: {
                    title: "用户列表",
                    icon: "",
                    isAuth:true,// 是否受权限树控制
                }
            },
            {
                path: "userDetail",
                component: () => import ("@/pages/user/detail"),
                name: "userDetail",
                isAuth:true,
                meta: {
                    title: "用户详情",
                    icon: "",
                    auth:['admin'], // 角色
                    isAuth:true, // 是否受权限树控制
                }
            }
        ]
    },
    /* 案例参考 先预留下 */
    {
        path: '/auth',
        component: Layout,
        name:'auth',
        redirect:{
            name:'authList'
        },
        meta: {
            title: "权限管理",
            icon: "iconfont icon-tubiao-gongjuxiang-79 iconSize",
        },
        alwaysShow:true,
        children: [
            {
                path: "authList",
                component: () => import ("@/pages/auth/index"),
                name: "authList",
                meta: {
                    title: "权限列表",
                    icon: "",
                }
            },
            {
                path: "authDetail",
                component: () => import ("@/pages/auth/authDetail"),
                name: "authDetail",
                hidden:true,
                meta: {
                    title: "权限详情",
                    icon: "",
                    isOriginHidden:true  // 此菜单一直不让显示
                }
            }
        ]
    },
    /* 案例参考 先预留下 */
    {
        path: '/test',
        component: Layout,
        redirect: '/test/testIndex',
        name: "test",
        alwaysShow:true,
        meta: {
            title: "Demo",
            icon: "iconfont icon-tubiao-gongjuxiang-97 iconSize",
        },
        children: [
            {
                path: "testIndex",
                component: () => import ("@/pages/test/index"),
                name: "testIndex",
                meta: {
                    title: "百度地图",
                    icon: "",
                }
            },
            {
                path: "testDemo",
                component: () => import ("@/pages/test/demo"),
                name: "testDemo",
                meta: {
                    title: "wangeditor",
                    icon: "",
                }
            },
            {
                path: "testPhone",
                component: () => import ("@/pages/test/phone"),
                name: "testPhone",
                meta: {
                    title: "tinymce",
                    icon: "",
                }
            }
        ]
    },

    // 没登录拦截器跳转到系统外首页/去了 登录后输入不存在的路由跳转到系统内首页
    {
        path: '/',
        name:'/',
        component: Layout,
        redirect: '/home',
    },
    {
        path: '*',
        name:'*',
        component: Layout,
        redirect: '/home',
    }
]
