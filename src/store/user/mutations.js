import types from './mutation-types';

const mutations = {
    [types.UID](state, uid) {
        state.uid = uid
    }
}

export default mutations