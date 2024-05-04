<template>
    <tis-modal class="change-modal" v-model="changeModal" :mask-closable="false" width="450" footer-hide :closable="false">
        <div class="change-body">
            <div class="change-body-top">
                <tis-icon type="ios-alert" size="24" class="change-modal-icon"/>
                <div class="top-word">修改权限</div>
            </div>
            <div class="change-body-middle">
                <tis-checkbox label="permission" v-model="permission">
                    <span>权限</span>
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
export default {
    props: {
        permission: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            changeModal: false,
            // permission: false,
        }
    },
    methods: {
        show() {
            this.changeModal = true;
        },
        async handleSubmit() {
        },
        handleCancel() {
            this.changeModal = false;
        }
    }
}
</script>
<style lang="less">
@import './changeUserModal.less';
</style>