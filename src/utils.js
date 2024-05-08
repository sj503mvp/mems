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

export default utils