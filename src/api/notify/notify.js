import $http from '@/resource';

const $api = {};

/**
 * 获取所有用户
 */
$api.getAllUser = async() => {
    const url = '/getAllUser';
    return await $http.get(url);
}

/**
 * 保存公告
 */
$api.saveNotify = async(data) => {
    // const url = '/saveNotify';
    // return await $http.post(url, data);
    return {
        code: 200,
        msg: '提交成功'
    }
}

export default $api