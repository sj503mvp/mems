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
 * 获得待处理列表数据
 */
$api.getPendingDevice = async(params) => {
    const url = '/getPendingDevice';
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
export default $api