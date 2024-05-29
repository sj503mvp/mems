import $http from '@/resource';

const $api = {};

/**
 * 获得登录日志
 */
$api.getLoginData = async(params) => {
    const url = '/getLoginData';
    return await $http.get(url, {params: params})
}


export default $api;