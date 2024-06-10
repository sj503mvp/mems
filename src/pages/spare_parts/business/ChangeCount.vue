<template>
    <tis-modal class="add-modal" v-model="addModal" :mask-closable="false" width="500" footer-hide :closable="false">
        <p class="modal-title">{{ type }}备品备件</p>
        <tis-form ref="baseInfo" :model="baseInfo" :rules="baseInfoRule" :label-width="140" class="base-info">
            <tis-form-item label="备品备件数量" prop="count">
                <tis-input v-model="baseInfo.count" placeholder="备品备件数量" style="width: 300px;" clearable></tis-input>
            </tis-form-item>
        </tis-form>
        <tis-button type="primary" class="create-btn btn-sub" @click="submit">确定</tis-button>
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
                count: '',
            },
            baseInfoRule: {
                count: [
                    { required: true, message: '请输入数量', trigger: 'blur' }
                ]
            },
            type: '添加',
            itemId: '',
        }
    },
    methods: {
        show(item, type) {
            this.baseInfo = {
                count: '',
            };
            if(type == 'add') {
                this.type = '添加'
            }else {
                this.type = '使用'
            }
            this.itemId = item.id,
            this.$refs.baseInfo.resetFields();
            this.addModal = true;
        },
        async submit() {
            let validate = await this.$refs.baseInfo.validate();
            if(!validate) {
                this.$TisMessage.error('请输入数量');
                return false;
            }else {
                let data = {
                    id: this.itemId,
                    count: this.baseInfo.count,
                    type: this.type,
                }
                let res = await $api.changeSpareParts(data);
                if(res.code == 200) {
                    this.$TisMessage.success(res.msg);
                }else {
                    this.$TisMessage.error(res.msg);
                }
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
@import './changeCount.less';
</style>