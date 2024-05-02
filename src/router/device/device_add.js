const deviceOne = {
    path: 'device_one',
    meta: {
        title: '冶炼设备录入页'
    },
    name: 'device_one',
    component: () => import('@/pages/device/device_add/DeviceAdd.vue')
}

const deviceTwo = {
    path: 'device_two',
    meta: {
        title: '连铸设备录入页'
    },
    name: 'device_two',
    component: () => import('@/pages/device/device_add/DeviceAdd.vue')
}

const deviceThree = {
    path: 'device_three',
    meta: {
        title: '轧制设备录入页'
    },
    name: 'device_three',
    component: () => import('@/pages/device/device_add/DeviceAdd.vue')
}

const deviceFour = {
    path: 'device_four',
    meta: {
        title: '后步精整设备录入页'
    },
    name: 'device_four',
    component: () => import('@/pages/device/device_add/DeviceAdd.vue')
}

const deviceFive = {
    path: 'device_five',
    meta: {
        title: '辅助设备录入页'
    },
    name: 'device_five',
    component: () => import('@/pages/device/device_add/DeviceAdd.vue')
}

export const deviceOneRouter = deviceOne;
export const deviceTwoRouter = deviceTwo;
export const deviceThreeRouter = deviceThree;
export const deviceFourRouter = deviceFour;
export const deviceFiveRouter = deviceFive;