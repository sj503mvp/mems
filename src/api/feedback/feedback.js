import $http from '@/resource';

const $api = {};

/**
 * 获得反馈的问题
 */
$api.getFeedbackData = async(params) => {
    const url = '/getFeedbackData';
    return await $http.get(url, {params: params})
}


export default $api;