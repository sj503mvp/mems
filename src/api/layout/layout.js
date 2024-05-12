import $http from '@/resource';

const $api = {};


/**
 * 获取权限
 */
$api.getPowerData = async(params) => {
    const url = '/getPowerData';
    let res = await $http.get(url, {params: params})
    if(res.code == 200) {
        return res.data
    }
}

/**
 * 获得登录用户信息
 */
$api.getUserInfo = async(params) => {
    const url = '/getUserInfo';
    let res = await $http.get(url, {params: params})
    if(res.code == 200) {
        return res.data
    }
}

export default $api;