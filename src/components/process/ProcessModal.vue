<template>
    <tis-modal class="process-modal" v-model="processModal" :mask-closeable="false" width="450" footer-hide :closable="false">
        <div class="process-body">
            <div class="process-body-top">
                <div class="top-word">{{ title }}</div>
            </div>
            <div class="process-body-middle">
                <p style="text-align: center;">{{ process.title }}</p>
                <p><span class="info-before">申请人</span>： {{ process.proposer }}</p>
                <p><span class="info-before">申请时间</span>： {{ process.time }}</p>
                <p><span class="info-before">申请类型</span>： 
                    <span v-if="process.approvalType=='1'">购入申请</span>
                    <span v-if="process.approvalType=='2'">报废申请</span>
                </p>
                <p v-if="process.approvalType == '1'"><span class="info-before">生产厂家</span>：{{ process.productor }}</p>
                <p v-if="process.approvalType == '1'"><span class="info-before">设备名称</span>：{{ process.deviceName }}</p>
                <p v-if="process.approvalType == '1'"><span class="info-before">设备数量</span>：{{ process.buyCount }}</p>
                <p v-if="process.approvalType == '1'"><span class="info-before">设备单价</span>：{{ process.buyMoney }}
                    <span v-if="process.unitId == '1'">元</span>
                    <span v-if="process.unitId == '2'">美元</span>
                    <span v-if="process.unitId == '3'">日元</span>
                    <span v-if="process.unitId == '4'">法郎</span>
                </p>
                <p v-if="process.approvalType == '1'"><span class="info-before">设备种类</span>：
                    <span v-if="process.deviceType == '1'">冶炼设备</span>
                    <span v-if="process.deviceType == '2'">连铸设备</span>
                    <span v-if="process.deviceType == '3'">轧制设备</span>
                    <span v-if="process.deviceType == '4'">后步精整设备</span>
                    <span v-if="process.deviceType == '5'">辅助设备</span>
                </p>
                <p v-if="process.approvalType == '2'"><span class="info-before">报废设备</span>：[{{ process.scrapDevice }}] - {{ deviceName }}</p>
            </div>
            <div class="process-body-footer">
                <template v-if="$route.name == 'process_approval'">
                    <tis-button type="primary" @click="handleSubmit('yes')" style="margin-right: 8px;">审批通过</tis-button>
                    <tis-button type="error" @click="handleSubmit('no')" style="margin-right: 8px;">审批不通过</tis-button>
                    <tis-button type="default" @click="handleCancel">取消审批</tis-button>
                </template>
                <template v-else>
                    <tis-button type="primary" @click="handleCancel">关闭</tis-button>
                </template>
            </div>
        </div>
    </tis-modal>
</template>
<script>
import Cookies from 'js-cookie';
import $api from '@/api/process/index.js'
import $deviceApi from '@/api/device/index.js'
export default {
    data() {
        return {
            processModal: false,
            process: {},
            deviceName: '',
        }
    },
    computed: {
        title() {
            if(this.$route.name == 'process_approval') {
                return '审批公告'
            }else {
                return '查看公告'
            }
        }
    },
    methods: {
        /**
         * 获得设备名字
         */
        async getDeviceName() {
            let params = {
                deviceId: this.process.scrapDevice
            }
            let res = await $deviceApi.getDeviceName(params);
            if(res.code == 200) {
                this.deviceName = res.data;
            }
        },
        show(item) {
            this.deviceName = '';
            this.process = item;
            if(this.process.scrapDevice) {
                this.getDeviceName();
            }
            this.processModal = true;
        },
        handleCancel() {
            this.process = {};
            this.processModal = false;
        },
        async handleSubmit(type) {
            if(type) {
                let data;
                if(this.process.approvalType == '2') {
                    data = {
                        uid: Cookies.get('uid'),
                        id: this.process.id,
                        type: '1',
                        deviceId: this.process.scrapDevice,
                    }
                }else {
                    data = {
                        uid: Cookies.get('uid'),
                        id: this.process.id,
                        type: '1'
                    }
                }
                let res = await $api.approvalProcess(data);
                if(res.code == 200) {
                    this.$TisMessage.success(res.msg);
                    this.$emit('reload-page');
                }else {
                    this.$TisMessage.error('审批失败')
                }
                this.processModal = false;
            }else {
                let data = {
                    uid: Cookies.get('uid'),
                    id: this.process.id,
                    type: '2'
                }
                let res = await $api.approvalProcess(data);
                if(res.code == 200) {
                    this.$TisMessage.success(res.msg);
                    this.$emit('reload-page');
                }else {
                    this.$TisMessage.error('审批失败')
                }
                this.processModal = false;
            }
        }
    }
}
</script>
<style lang="less">
@import './processModal.less';
</style>