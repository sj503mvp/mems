<template>
    <tis-modal class="change-modal" v-model="changeModal" :mask-closable="false" width="450" footer-hide :closable="false">
        <div class="change-body">
            <div class="change-body-top">
                <tis-icon type="ios-alert" size="24" class="change-modal-icon"/>
                <div class="top-word">修改权限</div>
            </div>
            <div class="change-body-middle">
                <tis-checkbox label="hasNotifyApproval" v-model="userPermission.hasNotifyApproval">
                    <span>公告</span>
                </tis-checkbox>
                <tis-checkbox label="hasProcessApproval" v-model="userPermission.hasProcessApproval">
                    <span>流程</span>
                </tis-checkbox>
            </div>
            <div class="change-body-footer">
                <tis-button type="default" @click="handleCancel">取消</tis-button>
                <tis-button type="primary" style="margin-left: 8px;" @click="handleSubmit()">确定</tis-button>
            </div>
        </div>
    </tis-modal>
</template>
<script>
import $api from '@/api/permission/index.js'
export default {
    props: {
        userPermission: {
            type: Object,
            default: {},
        }
    },
    data() {
        return {
            changeModal: false,
        }
    },
    methods: {
        show() {
            this.changeModal = true;
        },
        async handleSubmit() {
            let res = await $api.changeUserPower(this.userPermission);
            if(res.code == 200) {
                this.$TisMessage.success(res.msg);
                // location.reload();
            }else {
                this.$TisMessage.error('修改权限失败，请重试');
            }
            this.handleCancel();
        },
        handleCancel() {
            this.changeModal = false;
            this.$emit('clear-user-permission')
        }
    }
}
</script>
<style lang="less">
@import './changeUserModal.less';
</style>