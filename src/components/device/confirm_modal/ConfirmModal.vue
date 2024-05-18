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
                            <tis-radio label="3">维修中</tis-radio>
                            <tis-radio label="5">报废</tis-radio>
                        </tis-radio-group>
                    </tis-form-item>
                    <tis-form-item label="维修原因">
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
import $api from '@/api/device/index.js'
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
            },
            item: {},
            reasonList: [
                {
                    id: '1',
                    name: '设备故障'
                },
                {
                    id: '2',
                    name: '原材料问题'
                },
                {
                    id: '3',
                    name: '设备的制造和安装质量问题'
                },
                {
                    id: '4',
                    name: '设备的过度损耗'
                }
            ]
        }
    },
    methods: {
        show(item) {
            this.confirmData = {};
            this.item = item;
            this.$refs.confirmModal.resetFields();
            this.confirmModal = true;
        },
        async handleSubmit() {
            let validate = await this.$refs.confirmModal.validate();
            if(validate) {
                let data = {
                    id: this.item.id,
                    status: this.confirmData.status,
                    reasons: this.confirmData.reason
                }
                let res = await $api.confrimDevice(data);
                if(res.code == 200) {
                    this.$TisMessage.success(res.msg)
                }
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