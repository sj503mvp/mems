import Vue from 'vue';
import Router from 'vue-router';
import Cookies from 'js-cookie';
import {routers} from './index'; 

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: routers
}

Vue.use(Router);


const router = new Router(RouterConfig);
/**
 * 定义一些可以直接通行的路由
 * @return {boolean}
 */
const routePass = (to) => {
    const routesName = [
        'error-404',
        'error-403',
        'error-500',
    ];
    return routesName.indexOf(to.name) >= 0;
}

export default router