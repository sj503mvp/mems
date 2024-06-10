import $http from '@/resource';

const $api = {};

/**
 * 新增备品备件
 */
$api.saveSpareParts = async(data) => {
    const url = '/saveSpareParts';
    return await $http.post(url, data);
}

/**
 * 修改备品备件数量
 */
$api.changeSpareParts = async(data) => {
    const url = '/changeSpareParts';
    return await $http.post(url, data)
}

/**
 * 获得全部备品备件
 */
$api.getSpareParts = async(params) => {
    const url = '/getSpareParts';
    return await $http.get(url, { params: params })
}

export default $api