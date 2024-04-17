import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store'

import iview from 'iview'
// iview样式
import 'iview/dist/styles/iview.css'
//font-awesome图标库
import 'font-awesome/less/font-awesome.less';
import './assets/common/iconfont/iconfont.css'
import "./my_theme/front_standard.less"

import TanikawaTis from "tanikawa-tis";
import 'tanikawa-tis/dist/styles/tis.css'

Vue.config.productionTip = false

Vue.use(iview);
Vue.use(TanikawaTis);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
