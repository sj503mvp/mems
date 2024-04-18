import home from './home/home.js'
import device from './device/device.js'
const page403 = {
    path: '403',
    meta: {
        title: '403-权限不足',
        hideMenu: true
    },
    name: 'error-403',
    component: () => import('@/components/common/error_page/new_403.vue')
};

export const appRouter = {
    path: '/Mems/',
    name: 'home_index',
    redirect: {
        name: 'home'
    },
    component: () => import('@/pages/layout/Layout.vue'),
    children: [
        home,
        device,
        page403,
    ],
};

export const routers = [
    appRouter,
];