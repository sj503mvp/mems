const home = {
    path: 'home',
    name: '首页',
    meta: {
        title: '首页',
        openName: "home",
    },
    component: () => import('@/pages/home/Home.vue'),
}

export default home;
