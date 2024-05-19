import Vue from 'vue'
import Vuex from 'vuex'

// 登录uid
import userUid_actions from './user/actions'
import userUid_getters from './user/getters'
import userUid_state from './user/state'
import userUid_mutations from './user/mutations'

// 侧边栏徽标数
import sidebarNum_actions from './sidebar_menu/actions'
import sidebarNum_getters from './sidebar_menu/getters'
import sidebarNum_state from './sidebar_menu/state'
import sidebarNum_mutations from './sidebar_menu/mutations'

Vue.use(Vuex)


const userUid = {
    namespaced: true,
    state: userUid_state,
    mutations: userUid_mutations,
    getters: userUid_getters,
    actions: userUid_actions,
}
const sidebarNum = {
    namespaced: true,
    state: sidebarNum_state,
    mutations: sidebarNum_mutations,
    getters: sidebarNum_getters,
    actions: sidebarNum_actions,
}

export default new Vuex.Store({
    modules: {
        userUid,
        sidebarNum,
    }
})