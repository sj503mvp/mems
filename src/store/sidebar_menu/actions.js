import $api from '@/api/layout/index.js'
import types from './mutation-types';
import Cookies from 'js-cookie';

const actions = {
    async saveTabFieldTips({state, commit}) {
        let params = {
            uid: Cookies.get('uid')
        }
        let info = await $api.getSidebarNumber(params);
        commit(types.TABFIELDTIPS, info);
    }
}

export default actions;