import {
    pendingDeviceRouter,
    allDeviceRouter,
    myDeviceRouter,
    recycleDeviceRouter,
    reportDeviceRouter,
} from "./device_list";
import {
    deviceOneRouter,
    deviceTwoRouter,
    deviceThreeRouter,
    deviceFourRouter,
    deviceFiveRouter
} from "./device_add";


const device = {
    path: 'device',
    name: 'device',
    meta: {
        title: '设备',
        openName: 'device',
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
        deviceOneRouter,
        deviceTwoRouter,
        deviceThreeRouter,
        deviceFourRouter,
        deviceFiveRouter
    ]
};

export default device;