import login from './login/login.js'
import home from './home/home.js'
import device from './device/device.js'

import notify from './notify/notify.js'
import permission from './permission/permission.js'
import userInfo from './user/user.js'

const page403 = {
    path: '403',
    meta: {
        title: '403-权限不足',
        hideMenu: true
    },
    name: 'error-403',
    component: () => import('@/components/common/error_page/new_403.vue')
};

// 登录和注册
export const loginRouter = {
    path: '/',
    name: 'login_index',
    component: () => import('@/pages/login/Login.vue'),
    redirect: '/Mems/login',
    children: [
        login
    ]
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
        page403,
        notify,
        userInfo,
        permission,
    ],
};

export const routers = [
    loginRouter,
    appRouter,
];