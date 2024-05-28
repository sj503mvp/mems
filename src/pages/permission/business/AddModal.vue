<template>
    <tis-modal class="add-modal" v-model="addModal" :mask-closable="false" width="450" footer-hide :closable="false">
        <div class="add-body">
            <div class="add-body-top">
                <tis-icon type="ios-alert" size="24" class="add-modal-icon"/>
                <div class="top-word">新增管理员</div>
            </div>
            <div class="add-body-middle">
                <tis-select v-model="userId">
                    <tis-option v-for="item in userList" :key="item.uid" :value="item.uid" :label="item.name"></tis-option>
                </tis-select>
            </div>
            <div class="add-body-footer">
                <tis-button type="default" @click="handleCancel">取消</tis-button>
                <tis-button type="primary" style="margin-left: 8px;" @click="handleSubmit('add')">确定</tis-button>
            </div>
        </div>
    </tis-modal>
</template>
<script>
import $api from '@/api/permission/index.js'
export default {
    data() {
        return {
            addModal: false,
            userId: '',
            userList: []
        }
    },
    methods: {
        show() {
            this.getUnrootList();
            this.addModal = true;
        },
        async getUnrootList() {
            let res = await $api.getUnrootList();
            this.userList = res.data.map(item => {
                return {
                    uid: item.uid,
                    name: item.name,
                }
            })
        },
        async handleSubmit(type) {
            let data = {
                uid: this.userId,
                type: type,
            }
            let res = await $api.changePermission(data);
            if(res.code == 200) {
                this.$TisMessage.success(res.msg)
            }else {
                this.$TisMessage.success('修改失败，请稍后再试')
            }
            this.handleCancel();

        },
        handleCancel() {
            this.userId = '';
            this.addModal = false;
        }
    }
}
</script>
<style lang="less">
@import './addModal.less';
</style>