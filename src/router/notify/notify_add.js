const notifyAdd = {
    path: 'notify_add',
    name: 'notify_add',
    meta: {
        title: '发布公告'
    },
    component: () => import('@/pages/notify/notify_add/NotifyAdd.vue')
}

export const notifyAddRouter = notifyAdd;