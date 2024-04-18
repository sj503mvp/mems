let utils = {};

utils.notice = (content, action = 'warning', duration = 2) => {
    let config = {};
    config.duration = duration;
    config.content = content;
    switch (action) {
        case 'info':
            return TisMessage.info(config);
        case 'success':
            return TisMessage.success(config);
        case 'error':
            return TisMessage.error(config);
        case 'loading':
            return TisMessage.loading(config);
        default:
            return TisMessage.warning(config);
    }
}

export default utils