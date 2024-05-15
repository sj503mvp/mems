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
    const url = '/saveNotify';
    return await $http.post(url, data);
}

/**
 * 获得全部通知信息
 */
$api.getNotifyAll = async(params) => {
    const url = '/getNotifyAll';
    return await $http.get(url, { params: params });
}

/**
 * 获得未审批通知信息
 */
$api.getNotifyApproval = async(params) => {
    const url = '/getNotifyApproval';
    return await $http.get(url, { params: params });
}

/**
 * 审批通过/审批未通过
 */
$api.approvalNotify = async(data) => {
    const url = '/approvalNotify';
    return await $http.post(url, data)
}

/**
 * 查看通知
 */
$api.checkNotify = async(data) => {
    const url = '/checkNotify';
    return await $http.post(url, data)
}

/**
 * 获得未查看通知
 */
$api.getNotifyUnread = async(params) => {
    const url = '/getNotifyUnread';
    return await $http.get(url, { params: params })
}
export default $api