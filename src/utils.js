import { Message } from 'iview';

let utils = {};

utils.notice = (content, action = 'warning', duration = 2) => {
    let config = {};
    config.duration = duration;
    config.content = content;
    switch (action) {
        case 'info':
            return Message.info(config);
        case 'success':
            return Message.success(config);
        case 'error':
            return Message.error(config);
        case 'loading':
            return Message.loading(config);
        default:
            return Message.warning(config);
    }
}

/**
 * 判断某个人是否拥有某个权限
 */
utils.codeStatus = (authList, oneAuth) => {
    let status = false;
    if (!oneAuth && !authList) return;
    if (oneAuth == '') {
        status = true;
    }
    if (authList.indexOf(oneAuth, 0) >= 0) {
        status = true;
    }
    if (oneAuth && oneAuth.indexOf(',') > -1) {
        let arr = oneAuth.split(',');
        for (let i in authList) {
            if (arr.indexOf(authList[i]) > -1) {
                status = true;
            }
        }
    }
    return status;
}

export default utils