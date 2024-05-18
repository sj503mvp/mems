import $http from '@/resource';

const $api = {};

/**
 * 获取所有用户
 */
$api.getAllUserList = async() => {
    const url = '/getAllUserList';
    return await $http.get(url);
}

/**
 * 保存设备信息
 */
$api.saveDeviceInfo = async(data) => {
    const url = '/saveDeviceInfo';
    return await $http.post(url, data)
}

/**
 * 更新设备信息
 */
$api.editDeviceInfo = async(data) => {
    const url = '/editDeviceInfo';
    return await $http.post(url, data)
}

/**
 * 快速编辑
 */
$api.quickSave = async(data) => {
    const url = 'quickSave';
    return await $http.post(url, data)
}

/**
 * 关注
 */
$api.toFocus = async(data) => {
    const url = '/toFocus';
    return await $http.post(url, data)
}
/**
 * 获得待处理列表数据
 */
$api.getPendingDevice = async(params) => {
    const url = '/getPendingDevice';
    return await $http.get(url, { params: params })
}
/**
 * 获得回收站列表数据
 */
$api.getRecycleDevice = async(params) => {
    const url = '/getRecycleDevice';
    return await $http.get(url, { params: params })
}
/**
 * 获得全部设备
 */
$api.getAllDevice = async(params) => {
    const url = '/getAllDevice';
    return await $http.get(url, { params: params })
}
/**
 * 获得全部设备—跟进中的
 */
$api.getAllFollowDevice = async(params) => {
    const url = '/getAllFollowDevice';
    return await $http.get(url, { params: params })
}

/**
 * 获得我的设备—我录入的
 */
$api.getMyInputDevice = async(params) => {
    const url = '/getMyInputDevice';
    return await $http.get(url, { params: params })
}

/**
 * 获得我的设备—跟进中的
 */
$api.getmyFollowDevice = async(params) => {
    const url = '/getmyFollowDevice';
    return await $http.get(url, { params: params })
}

/**
 * 获得我的设备—关注中的
 */
$api.getMyCollectionDevice = async(params) => {
    const url = '/getMyCollectionDevice';
    return await $http.get(url, { params: params })
}

/**
 * 设备详细信息
 */
$api.getDeviceInfo = async(params) => {
    const url = '/getDeviceInfo';
    return await $http.get(url, { params: params })
}

/**
 * 获得设备是否关注
 */
$api.isFocus = async(params) => {
    const url = '/isFocus';
    return await $http.get(url, { params: params })
}

/**
 * 获得推送人员列表
 */
$api.getPushList = async() => {
    const url = '/getPushList';
    return await $http.get(url)
}

/**
 * 推送设备
 */
$api.pushItem = async(data) => {
    const url = '/pushItem';
    return await $http.post(url, data)
}
/**
 * 推送设备
 */
$api.pushItemConfrim = async(data) => {
    const url = 'pushItemConfrim';
    return await $http.post(url, data);
}

/**
 * 确认状态
 */
$api.confrimDevice = async(data) => {
    const url = 'confrimDevice';
    return await $http.post(url, data)
}

export default $api