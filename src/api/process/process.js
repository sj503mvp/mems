import $http from '@/resource';

const $api = {};

/**
 * 保存流程
 */
$api.saveProcess = async(data) => {
    const url = '/saveProcess';
    return await $http.post(url, data);
}

/**
 * 获得我发起的流程
 */
$api.getProcessCreated = async(params) => {
    const url = '/getProcessCreated';
    return await $http.get(url, { params: params })
}

/**
 * 获得未审批流程
 */
$api.getProcessApproval = async(params) => {
    const url = '/getProcessApproval';
    return await $http.get(url, { params: params })
}

/**
 * 获得我审批的流程
 */
$api.getProcessApproved = async(params) => {
    const url = '/getProcessApproved';
    return await $http.get(url, { params: params })
}

/**
 * 审批流程
 */
$api.approvalProcess = async(data) => {
    const url = '/approvalProcess';
    return await $http.post(url, data)
}
export default $api