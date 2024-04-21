import $http from '@/resource';

const $api = {};

/**
 * 登录
 */
$api.login = async(data) => {
    console.log(data);
    // const url = '';
    // return await $http.post(url, data);
    return {
        code: 200,
        data: {
            uid: '921882',
            password: '123456',
            username: '狗头苏丹',
            token: 'asdizndiahisd'
        }
    }
}


/**
 * 注册
 */

$api.register = async(data) => {
    console.log(data,'qwe');
    // const url = '';
    // return await $http.post(url, data);
    return {
        code: 500,
        data: {
            msg: '用户名已存在'
        }
    }
}

export default $api