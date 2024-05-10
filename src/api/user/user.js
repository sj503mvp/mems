import $http from '@/resource';

const $api = {};

/**
 * 编辑用户信息
 */
$api.editUserInfo = async(data) => {
    const url = '/editUserInfo';
    return await $http.post(url, data);
} 

export default $api