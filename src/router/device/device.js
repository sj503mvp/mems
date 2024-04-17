import {
    pendingDeviceRouter,
    allDeviceRouter,
    myDeviceRouter,
    recycleDeviceRouter,
    reportDeviceRouter,
} from "./device_list";

const device = {
    path: 'device',
    name: 'device',
    meta: {
        title: '设备',
    },
    redirect: {
        name: 'pending_device' 
    },
    component: () => import('@/pages/device/Device.vue'),
    children: [
        pendingDeviceRouter,
        allDeviceRouter,
        myDeviceRouter,
        recycleDeviceRouter,
        reportDeviceRouter,
    ]
};

export default device;