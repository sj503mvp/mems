<template>
    <tis-modal class="add-modal" v-model="addModal" :mask-closable="false" width="500" footer-hide :closable="false">
        <p class="modal-title">备品备件信息录入</p>
        <tis-form ref="baseInfo" :model="baseInfo" :rules="baseInfoRule" :label-width="140" class="base-info">
            <tis-form-item label="备品备件名称" prop="name">
                <tis-input v-model="baseInfo.name" placeholder="备品备件名称" style="width: 300px;" clearable></tis-input>
            </tis-form-item>
            <tis-form-item label="备品备件数量">
                <tis-input v-model="baseInfo.count" placeholder="备品备件数量" style="width: 300px;" clearable></tis-input>
            </tis-form-item>
        </tis-form>
        <tis-button type="primary" class="create-btn btn-sub" @click="submit" :loading="submitLoading">保存</tis-button>
        <tis-button type="default" class="create-btn btn-sub" @click="cancel">取消</tis-button>
    </tis-modal>
</template>
<script>
import $api from '@/api/spareParts/index.js'
export default {
    data() {
        return {
            addModal: false,
            baseInfo: {
                name: '',
                count: '',
            },
            baseInfoRule: {
                name: [
                    { required: true, message: '请输入备品备件名称', trigger: 'blur' }
                ]
            },
            submitLoading: false,
        }
    },
    methods: {
        show() {
            this.baseInfo = {
                name: '',
                count: '',
            },
            this.$refs.baseInfo.resetFields();
            this.addModal = true;
        },
        async submit() {
            this.submitLoading = true;
            let validate = await this.$refs.baseInfo.validate();
            if(!validate) {
                this.$TisMessage.error('请完善信息');
                this.submitLoading = false;
                return false;
            }else {
                let data = this.baseInfo;
                let res = await $api.saveSpareParts(data);
                if(res.code == 200) {
                    this.$TisMessage.success(res.msg);
                }else {
                    this.$TisMessage.error(res.msg);
                }
                this.submitLoading = false;
                this.cancel();
                this.$emit('reload')
            }
        },
        cancel() {
            this.addModal = false;
        },
    }
}

</script>
<style lang="less">
@import './addSpareParts.less';
</style>