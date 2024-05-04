<template>
    <tis-modal class="add-modal" v-model="addModal" :mask-closable="false" width="450" footer-hide :closable="false">
        <div class="add-body">
            <div class="add-body-top">
                <tis-icon type="ios-alert" size="24" class="add-modal-icon"/>
                <div class="top-word">新增管理员</div>
            </div>
            <div class="add-body-middle">
                <tis-select v-model="userId">
                    <tis-option v-for="item in userList" :key="item.id" :value="item.id" :label="item.name"></tis-option>
                </tis-select>
            </div>
            <div class="add-body-footer">
                <tis-button type="default" @click="handleCancel">取消</tis-button>
                <tis-button type="primary" style="margin-left: 8px;" @click="handleSubmit()">确定</tis-button>
            </div>
        </div>
    </tis-modal>
</template>
<script>
export default {
    data() {
        return {
            addModal: false,
            userId: '',
            userList: [
                {
                    id: '1',
                    name: '狗头苏丹',
                },
                {
                    id: '2',
                    name: '狗头苏丹2',
                },
                {
                    id: '3',
                    name: '狗头苏丹3',
                },
            ]
        }
    },
    methods: {
        show() {
            this.addModal = true;
        },
        async handleSubmit() {
        },
        handleCancel() {
            this.addModal = false;
        }
    }
}
</script>
<style lang="less">
@import './addModal.less';
</style>