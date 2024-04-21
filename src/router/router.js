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

router.beforeEach(async(to, from, next) => {
    if(routePass(to)) {
        next();
    }else {
        let uid = Cookies.get('uid');
        let token = Cookies.get('token');
        if(uid && token) {
            next();
        }else {
            next({replace: true, name: '登录'})
        }
    }
})

/**
 * 定义一些可以直接通行的路由
 * @return {boolean}
 */
const routePass = (to) => {
    const routesName = [
        '登录',
        'error-404',
        'error-403',
        'error-500',
    ];
    return routesName.indexOf(to.name) >= 0;
}

export default router