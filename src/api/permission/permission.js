import $http from '@/resource';

const $api = {};

/**
 * 获取所有用户信息
 */
$api.getAllUserInfo = async(params) => {
    const url = '/getAllUserInfo';
    return await $http.get(url, {params: params})
}

/**
 * 获取所有管理员信息
 */
$api.getAllManagerInfo = async(params) => {
    const url = '/getAllManagerInfo';
    return await $http.get(url, {params: params})
}

/**
 * 编辑权限
 */
$api.changeUserPower = async(data) => {
    const url = '/changePowerData';
    return await $http.post(url, data);
}

/**
 * 获得所有非管理员的人员名称
 */
$api.getUnrootList = async() => {
    const url = '/getUnrootUser';
    return await $http.post(url);
}

/**
 * 修改权限的权限
 */
$api.changePermission = async(data) => {
    const url = '/changePermission';
    return await $http.post(url, data)
}
export default $api