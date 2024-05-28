import $http from '@/resource';

const $api = {};

/**
 * 获取首页全部设备视图数据
 */
$api.getPieData = async(params) => {
    const url = '/getHomePieData';
    return await $http.get(url, {params: params})
}

/**
 * 获取首页设备总数数据
 */
$api.getAllDeviceInfo = async() => {
    const url = '/getAllDeviceInfo';
    return await $http.get(url);
}

export default $api;