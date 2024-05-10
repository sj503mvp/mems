import axios from 'axios'
import Cookies from 'js-cookie';
import qs from 'qs';
import Configs from '@/config.js'
import utils from './utils';

var $http = axios.create({
    baseURL: `${Configs.apiUrl}`,
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

$http.interceptors.response.use(
    response => {
        switch (response.data.code) {
            case '200':
                return response.data;
            case '401':
                Cookies.set('uid', '');
                Cookies.set('token', '');
                return response.data;
            case '500': 
                Cookies.set('uid', '');
                Cookies.set('token', '');
                return response.data;
            default: 
                return response.data;
        }
    },
    error => {//这是异常
        if (error.response) {
            utils.notice("出现异常，请稍后再试", 'error');
        }
        return Promise.reject(error)
    }
);

export default $http;
