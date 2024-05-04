const notifyApproval = {
    path: 'notify_approval',
    name: 'notify_approval',
    meta: {
        title: '审批通知',
    },
    component: () => import('@/pages/notify/notify_list/notify_approval/NotifyApproval.vue'),
}

const notifyAll = {
    path: 'notify_all',
    name: 'notify_all',
    meta: {
        title: '全部通告',
    },
    component: () => import('@/pages/notify/notify_list/notify_all/NotifyAll.vue'),
}

const notifyUnread = {
    path: 'notify_unread',
    name: 'notify_unread',
    meta: {
        title: '审批通知',
    },
    component: () => import('@/pages/notify/notify_list/notify_unread/NotifyUnread.vue'),
}

export const notifyApprovalRouter = notifyApproval;
export const notifyAllRouter = notifyAll;
export const notifyUnreadRouter = notifyUnread;