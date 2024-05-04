const permission = {
    path: 'permission',
    name: 'permission',
    meta: {
        title: '权限',
        openName: 'permission'
    },
    redirect: 'user',
    component: () => import('@/pages/permission/Permission.vue'),
    children: [
        {
            path: 'user',
            name: 'user',
            meta: {
                title: '用户管理'
            },
            component: () => import('@/pages/permission/Permission.vue'),
        },
        {
            path: 'manager',
            name: 'manager',
            meta: {
                title: '管理员管理'
            },
            component: () => import('@/pages/permission/Permission.vue'),
        },
    ]
}

export default permission;
