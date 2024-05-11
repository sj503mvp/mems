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


export default $api