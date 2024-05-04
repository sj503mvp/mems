import { notifyAddRouter } from './notify_add';
import {
    notifyApprovalRouter,
    notifyAllRouter,
    notifyUnreadRouter
} from './notify_list';

const notify = {
    path: 'notify',
    name: 'notify',
    meta: {
        title: '公告',
        openName: 'notify',
    },
    redirect: {
        name: 'notify_all'
    },
    component: () => import('@/pages/notify/Notify.vue'),
    children: [
        notifyAddRouter,
        notifyApprovalRouter,
        notifyAllRouter,
        notifyUnreadRouter
    ]
};

export default notify;