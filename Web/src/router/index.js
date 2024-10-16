import Vue from 'vue'
import Router from 'vue-router'
import yangUtils from '@/utils/yangUtils'

Vue.use(Router)
const router = new Router({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            component: () => import('@/views/Login.vue')
        }, {
            path: '/register',
            component: () => import('@/views/Register.vue')
        },{
            path: '/404',
            component: () => import('@/views/404.vue')
        }, {
            path: '/',
            component: () => import('@/views/Main.vue'),
            redirect: "/home",
            children: [
                {
                    path: '/home',
                    icon: 'el-icon-s-home',
                    name: '首页',
                    component: () => import('@/views/Index.vue'),
                    meta: { title: '首页', role: 'admin', icon: 'el-icon-s-home' }
                }, {
                    name: '文件夹',
                    path: '/folder',
                    component: () => import('@/views/folder/Folder.vue')
                }, {
                    name: '文件',
                    path: '/file',
                    component: () => import('@/views/folder/File.vue')
                }, {
                    name: '公共图库',
                    path: '/publicFile',
                    component: () => import('@/views/folder/PublicFile.vue')
                }, {
                    name: '订单管理',
                    path: '/trade',
                    component: () => import('@/views/trade/Trade.vue')
                }, {
                    name: '管理账号',
                    path: '/account',
                    component: () => import('@/views/setting/Account.vue')
                }
            ]
        }
    ]
})

// 添加全局路由守卫
router.beforeEach((to, from, next) => {

    // 判断当前路由是否需要登录验证
    if (to.path !== '/login' && to.path !== '/404' && to.path !== '/userSave') {
        //     // 判断用户是否已登录
        if (yangUtils.getToken()) {
            // 未登录，跳转到登录页面
            next('/login')
        } else {
            // 已登录，继续导航
            next()
        }
    } else {
        // 不需要登录验证的页面，继续导航
        next()
    }
    console.log(router.options)
})

export default router;
// 路由重复点击
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}