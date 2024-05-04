import {
    pendingDeviceRouter,
    allDeviceRouter,
    myDeviceRouter,
    recycleDeviceRouter,
    deviceDetailRouter
} from "./device_list";
import {
    deviceOneRouter,
    deviceTwoRouter,
    deviceThreeRouter,
    deviceFourRouter,
    deviceFiveRouter
} from "./device_add";
import {
    deviceEditRouter,
} from "./device_edit";

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
        deviceDetailRouter,
        deviceOneRouter,
        deviceTwoRouter,
        deviceThreeRouter,
        deviceFourRouter,
        deviceFiveRouter,
        deviceEditRouter,
    ]
};

export default device;