import types from './mutation-types';
import Cookies from 'js-cookie'

const actions = {
    async getUserUid({state, commit}) {
        let uid = Cookies.get('uid');
        commit(types.UID, uid);
    }
}

export default actions