<template>
    <tis-modal class="confirm-modal" v-model="confirmModal" :mask-closeable="false" width="400" footer-hide :closable="false">
        <div class="confirm-body">
            <div class="confirm-body-top">
                <tis-icon type="ios-alert" size="24" class="confirm-modal-icon"></tis-icon>
                <div class="top-word">确认设备状态</div>
            </div>
            <div class="confirm-body-middle">
                <p style="margin-bottom: 8px;">请根据设备选择相应的状态</p>
                <tis-form :model="confirmData" ref="confirmModal" :rules="confirmRule">
                    <tis-form-item prop="status" label="状态">
                        <tis-radio-group v-model="confirmData.status">
                            <tis-radio label="1">正常</tis-radio>
                            <tis-radio label="2">异常</tis-radio>
                        </tis-radio-group>
                    </tis-form-item>
                    <tis-form-item prop="reason" label="维修原因">
                        <tis-select scroll-id="scrollId" v-model="confirmData.reason" filterable clearable multiple>
                            <tis-option v-for="item in reasonList" :key="item.id" :label="item.name" :value="item.id"></tis-option>
                        </tis-select>
                    </tis-form-item>
                </tis-form>
            </div>
            <div class="confirm-body-footer">
                <tis-button type="default" @click="handleCancel">取消</tis-button>
                <tis-button type="primary" style="margin-left: 8px;" @click="handleSubmit('confirmData')">确定</tis-button>
            </div>
        </div>
    </tis-modal>
</template>
<script>
export default {
    data() {
        return {
            confirmModal: false,
            confirmData: {
                status: '',
                reason: [],
            },
            confirmRule: {
                status: [
                    { required: true, message: '请选择状态', trigger: 'change' }
                ],
                reason: [
                    { required: true, type: 'array', min: 1,  message: '请选择原因', trigger: 'change' }
                ]
            },
            item: {},
            reasonList: [
                {
                    id: '1',
                    name: '设备年老'
                },
                {
                    id: '2',
                    name: '工作时间过长'
                },
                {
                    id: '3',
                    name: '设备不符合生产'
                },
            ]
        }
    },
    methods: {
        show(item) {
            this.confirmData.status = '';
            this.item = item;
            this.$refs.confirmModal.resetFields();
            this.confirmModal = true;
        },
        async handleSubmit() {
            let validate = await this.$refs.confirmModal.validate();
            if(validate) {
                let data = {
                    id: this.item.deviceId,
                    status: this.confirmData.status
                }
                // let res = await $api.  ();
                this.handleCancel();
                this.$emit('reload-list');
            }
        },
        handleCancel() {
            this.confirmModal = false;
            this.$refs.confirmModal.resetFields();
        }
    }
}
</script>
<style lang="less" scoped>
@import './confirmModal.less';
</style>