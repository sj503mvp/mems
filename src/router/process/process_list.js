const processApproval = {
    path: 'process_approval',
    name: 'process_approval',
    meta: {
        title: '待我审批',
    },
    component: () => import('@/pages/process/process_approval/ProcessApproval.vue')
}

const processApproved = {
    path: 'process_approved',
    name: 'process_approved',
    meta: {
        title: '我已审批',
    },
    component: () => import('@/pages/process/process_approved/ProcessApproved.vue')
}

const processCreated = {
    path: 'process_created',
    name: 'process_created',
    meta: {
        title: '我发起的',
    },
    component: () => import('@/pages/process/process_created/ProcessCreated.vue')
}

export const processApprovalRouter = processApproval;
export const processApprovedRouter = processApproved;
export const processCreatedRouter = processCreated;