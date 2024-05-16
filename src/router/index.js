import login from './login/login.js'
import home from './home/home.js'
import device from './device/device.js'
import process from './process/process.js'
import notify from './notify/notify.js'
import permission from './permission/permission.js'
import userInfo from './user/user.js'

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
        notify,
        userInfo,
        permission,
        process
    ],
};

export const routers = [
    loginRouter,
    appRouter,
];