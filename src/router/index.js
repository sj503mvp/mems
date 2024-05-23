import login from './login/login.js'
import home from './home/home.js'
import device from './device/device.js'
import process from './process/process.js'
import notify from './notify/notify.js'
import permission from './permission/permission.js'
import userInfo from './user/user.js'

// 登录和注册
const loginRouter = {
    path: '/',
    name: 'login_index',
    component: () => import('@/pages/login/Login.vue'),
    redirect: '/Mems/login',
    children: [
        login
    ]
}

const page403 = {
    path: '403',
    meta: {
        title: '403-权限不足',
        hideMenu: true
    },
    name: 'error-403',
    component: () => import('@/components/common/error_page/new_403.vue')
}

export const appRouter = {
    path: '/Mems',
    name: 'home_index',
    redirect: {
        name: '首页'
    },
    component: () => import('@/pages/layout/Layout.vue'),
    children: [
        home,
        device,
        notify,
        userInfo,
        permission,
        process,
        page403
    ],
};

export const routers = [
    loginRouter,
    appRouter,
];