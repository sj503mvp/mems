<template>
    <div class="device-header-content">
        <div class="device-header">
            <tis-bubble trigger="hover" content="点击编辑" placement="bottom" v-if="!isEdit" width="300px">
                <tis-button type="text" @click="isEditTitle(true)"><span class="header-title">{{ deviceData.title }}</span></tis-button>
            </tis-bubble>
            <div class="edit-title" v-if="isEdit">
                <tis-input v-model="editTitle" maxlength="20" show-word-limit style="width: 300px; margin-right: 16px;"></tis-input>
                <tis-button type="primary" @click="quickEditTitle" style="margin-right: 16px;">确认</tis-button>
                <tis-button @click="isEditTitle(false)">取消</tis-button>
            </div>
            <div class="device-right">
                <div class="device-right-field">
                    <template v-if="!deviceData.isFocus">
                        <i class="iconfont iconstar iconClass">关注</i>
                    </template>
                    <template v-else>
                        <i class="iconfont iconstar-fill iconClass">取消关注</i>
                    </template>
                </div>
                <div class="device-right-field" @click="toEditDetail">
                    <i class="iconfont iconedit iconClass">编辑</i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        deviceData: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            isEdit: false,
            editTitle: '',
        }
    },
    methods: {
        isEditTitle(boolean) {
            this.isEdit = boolean;
        },
        quickEditTitle() {},
        toEditDetail() {
            window.open(this.$router.resolve({
                name: 'device_edit',
                params: {
                    device_id: this.deviceData.deviceId,
                }
            }).href, '_blank')
        }
    }
}
</script>
<style lang="less">
@import './deviceHeader.less';
</style>