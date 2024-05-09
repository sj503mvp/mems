import $http from '@/resource';

const $api = {};


/**
 * 获取侧边栏权限
 */
$api.getPowerData = async(params) => {
    const url = '/getPowerData';
    let res = await $http.get(url, {params: params})
    if(res.code == 200) {
        return res.data
    }
}

export default $api;