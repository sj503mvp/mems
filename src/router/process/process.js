import {
    processApprovalRouter,
    processApprovedRouter,
    processCreatedRouter,
}from './process_list';
import {
    processAddRouter
}from './process_add';

const process = {
    path: 'process',
    name: 'process',
    meta: {
        title: '流程',
        openName: 'process',
    },
    redirect: {
        name: 'process_created'
    },
    component: () => import('@/pages/process/Process.vue'),
    children: [
        processAddRouter,
        processApprovalRouter,
        processApprovedRouter,
        processCreatedRouter,
    ]
};

export default process

