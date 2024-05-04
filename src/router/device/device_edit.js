const deviceEdit = {
    path: 'device_edit/:device_id',
    meta: {
        title: '冶炼设备录入页'
    },
    name: 'device_edit',
    component: () => import('@/pages/device/device_edit/DeviceEdit.vue')
}


export const deviceEditRouter = deviceEdit;