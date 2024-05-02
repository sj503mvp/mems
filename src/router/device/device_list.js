const pendingDevice = {
    path: 'pending_device',
    name: 'pending_device',
    meta: {
        title: '待处理设备',
    },
    component: () => import('@/pages/device/device_list/pending_device/PendingDevice.vue'),
}

const allDevice = {
    path: 'all_device',
    name: 'all_device',
    meta: {
        title: '全部设备',
    },
    redirect: {
        name: 'all_device_all'
    },
    component: () => import('@/pages/device/device_list/all_device/AllDevice.vue'),
    children: [
        {
            path: 'all_device_all',
            name: 'all_device_all',
            meta: {
                title: '全部设备',
            },
            component: () => import('@/pages/device/device_list/all_device/AllDevice.vue'), 
        },
        {
            path: 'all_device_follow',
            name: 'all_device_follow',
            meta: {
                title: '跟进中-全部设备',
            },
            component: () => import('@/pages/device/device_list/all_device/AllDevice.vue'), 
        }
    ]
}

const myDevice = {
    path: 'my_device',
    name: 'my_device',
    meta: {
        title: '我的设备',
    },
    redirect: {
        name: 'my_device_my_input'
    },
    component: () => import('@/pages/device/device_list/my_device/MyDevice.vue'),
    children: [
        {
            path: 'my_device_my_input',
            name: 'my_device_my_input',
            meta: {
                title: '我录入的-我的设备',
            },
            component: () => import('@/pages/device/device_list/my_device/MyDevice.vue'),
        },
        {
            path: 'my_device_follow',
            name: 'my_device_follow',
            meta: {
                title: '跟进中-我的设备',
            },
            component: () => import('@/pages/device/device_list/my_device/MyDevice.vue'),
        },
        {
            path: 'my_device_collection',
            name: 'my_device_collection',
            meta: {
                title: '我关注的-我的设备',
            },
            component: () => import('@/pages/device/device_list/my_device/MyDevice.vue'),
        }
    ]
}

const recycleDevice = {
    path: 'recycle_device',
    name: 'recycle_device',
    meta: {
        title: '回收站',
    },
    component: () => import('@/pages/device/device_list/recycle_device/RecycleDevice.vue'),
}

const reportDevice = {
    path: 'report_device',
    name: 'report_device',
    meta: {
        title: '设备报表',
    },
    component: () => import('@/pages/device/device_list/report_device/ReportDevice.vue'),
}

export const pendingDeviceRouter = pendingDevice;
export const allDeviceRouter = allDevice;
export const myDeviceRouter = myDevice;
export const recycleDeviceRouter = recycleDevice;
export const reportDeviceRouter = reportDevice;