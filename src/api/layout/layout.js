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

/**
 * 头部公告信息
 */
$api.getNoticeInfo = async(params) => {
    const url = '/getNoticeInfo';
    return await $http.get(url, { params: params })
}

/**
 * 获得侧边栏徽标数
 */
$api.getSidebarNumber = async(params) => {
    const url = '/getSidebarNumber';
    let res = await $http.get(url, { params: params })
    if(res.code == 200) {
        return res.data
    }
}

export default $api;