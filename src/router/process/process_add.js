const processAdd = {
    path: 'process_add',
    name: 'process_add',
    meta: {
        title: '新建流程'
    },
    component: () => import('@/pages/process/process_add/ProcessAdd.vue')
}

export const processAddRouter = processAdd;