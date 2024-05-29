import $http from '@/resource';

const $api = {};

/**
 * 登录
 */
$api.login = async(data) => {
    const url = '/login';
    return await $http.post(url, data);
}


/**
 * 注册
 */

$api.register = async(data) => {
    const url = '/register';
    return await $http.post(url, data);
}


/**
 * 获得username
 */
$api.getUserName = async(params) => {
    const url = '/getUserName';
    return await $http.get(url, { params: params })
}

/**
 * 登录日志
 */
$api.saveLoginData = async(data) => {
    const url = '/saveLoginData';
    return await $http.post(url, data);
}
export default $api