<template>
    <div class="device-header-content">
        <div class="device-header">
            <tis-bubble trigger="hover" content="点击编辑" placement="bottom" v-if="!isEdit" width="300px">
                <tis-button type="text" @click="isEditTitle(true)"><span class="header-title">{{ deviceData.name }}</span></tis-button>
            </tis-bubble>
            <div class="edit-title" v-if="isEdit">
                <tis-input v-model="deviceData.name" maxlength="20" show-word-limit style="width: 300px; margin-right: 16px;"></tis-input>
                <tis-button type="primary" @click="quickEditTitle" style="margin-right: 16px;">确认</tis-button>
                <tis-button @click="isEditTitle(false)">取消</tis-button>
            </div>
            <div class="device-right">
                <div class="device-right-field">
                    <template v-if="!isFocus">
                        <div @click="toFocus(true)">
                            <i class="iconfont iconstar iconClass">关注</i>
                        </div>
                    </template>
                    <template v-else>
                        <div @click="toFocus(false)">
                            <i class="iconfont iconstar-fill iconClass">取消关注</i>
                        </div>
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
import Cookies from 'js-cookie';
import $api from '@/api/device/index.js'
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
            isFocus: false,
            newDeviceData: {},
        }
    },
    watch: {
        deviceData: {
            handler(newVal, oldVal) {
                if(newVal && newVal.id) {
                    this.getIsFocus();
                }
            },
            immediate: false, 
            deep: true
        }
    },
    methods: {
        isEditTitle(boolean) {
            this.isEdit = boolean;
            this.$emit('reload-detail')
        },
        async quickEditTitle() {
            let data = {
                id: this.deviceData.id,
                name: this.deviceData.name
            };
            let res = await $api.quickSave(data);
            if(res.code == 200) {
                this.$TisMessage.success(res.msg)
            }else {
                this.$TisMessage.error(res.msg)
            }
            this.isEditTitle(false)
        },
        toEditDetail() {
            window.open(this.$router.resolve({
                name: 'device_edit',
                params: {
                    device_id: this.deviceData.id,
                }
            }).href, '_blank')
        },
        /**
         * 获得是否关注
         */
        async getIsFocus() {
            let params = {
                userId: Cookies.get('uid'),
                deviceId: this.deviceData.id
            }
            let res = await $api.isFocus(params);
            if(res.code == 200) {
                this.isFocus = res.isFocus;
            }
        },
        /**
         * 关注设备
         */
        async toFocus(type) {
            let data = {
                userId: Cookies.get('uid'),
                deviceId: this.deviceData.id,
                type: type
            }
            let res = await $api.toFocus(data);
            if(res.code == 200) {
                this.$TisMessage.success(res.msg);
            }else {
                this.$TisMessage.error('出现错误，请稍后再试')
            }
            this.getIsFocus();
        }
    }
}
</script>
<style lang="less">
@import './deviceHeader.less';
</style>