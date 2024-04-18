import axios from 'axios'
import Cookies from 'js-cookie';
import qs from 'qs';

var $http = axios.create({
    // 接口的基础url
    // baseURL: '',
    timeout: 55000,
    transformRequest: [function(data) {
        return qs.stringify(data)
    }]
});

$http.interceptors.request.use(
    config => {
        if (Cookies.get('token')) {
            config.headers['Token'] = Cookies.get('token');
        }
        return config;
    }
)

// 错误提示，只弹一次标识
var errorTips = false;
$http.interceptors.response.use(
    response => {
        switch (response.data.code) {
            case 200:
                return response.data;
            // case 401:
            // case 403:
            //     if( window.location.pathname == '/Spa/403' ) { //未登录
            //         Cookies.set('uid', '');
            //         Cookies.set('token', '');
            //         location.href = Configs.loginUrl;
            //     } else {
            //         location.href = '/Spa/403';
            //     }
            //     break;
            // case 402:
            //     Cookies.set('uid', '');
            //     Cookies.set('token', '');
            //     if(errorTips == false) {
            //         utils.notice("登录过期，正在重新登录...");
            //         errorTips = true;
            //     }
            //     setTimeout(() => {
            //         location.reload();
            //     }, 1000);
            //     setTimeout(() => {
            //         errorTips = false;
            //     }, 2000)
            //     break;
            // case 501:
            //     location.href = '/Spa/403';
            //     return false;
            // default :
            //     return response.data;
        }
    },
    error => {//这是异常
        if (error.response) {
            // const code = error.response.status;
            // if (code == 401) {
            //     Cookies.set('token', '');
            //     utils.notice("认证失败，请重新登录", 'error');
            // }
            // if (code == 500) {
            //     utils.notice("接口错误，请联系管理员", 'error');
            // }
            // if (code == 404) {
            //     utils.notice("404 NOT FOUND", 'error');
            // }
            // if (code == 422) {
            //     for (var name in error.response.data) {
            //         let msg = (error.response.data[name][0]);
            //         utils.notice(`数据验证未通过 -- ${msg}`, 'error');
            //         break;
            //     }
            // }
        }
        return Promise.reject(error)
    }
);

export default $http;
