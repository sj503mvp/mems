import Vue from 'vue'
import Vuex from 'vuex'

// 登录uid
import userUid_actions from './user/actions'
import userUid_getters from './user/getters'
import userUid_state from './user/state'
import userUid_mutations from './user/mutations'

Vue.use(Vuex)


const userUid = {
    namespaced: true,
    state: userUid_state,
    mutations: userUid_mutations,
    getters: userUid_getters,
    actions: userUid_actions,
}

export default new Vuex.Store({
    modules: {
        userUid,
    }
})