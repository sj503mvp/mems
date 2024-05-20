<template>
    <div class="device-detail" :style="{'min-height': 'calc(100vh - 117px)'}">
        <div class="device-card">
            <div class="device-header">
                <device-header :device-data="deviceData" @reload-detail="reloadData"></device-header>
            </div>
        </div>
        <div class="device-info">
            <div class="device-info-top">设备概况</div>
            <div class="device-info-box">
                <div class="device-info-hang">
                    <span class="device-detail-title">设备种类：</span>
                    <tis-tag v-if="deviceData.typeId == '1'">冶炼设备</tis-tag>
                    <tis-tag v-if="deviceData.typeId == '2'">连铸设备</tis-tag>
                    <tis-tag v-if="deviceData.typeId == '3'">轧制设备</tis-tag>
                    <tis-tag v-if="deviceData.typeId == '4'">后步精整设备</tis-tag>
                    <tis-tag v-if="deviceData.typeId == '5'">辅助设备</tis-tag>
                </div>
                <div class="device-info-hang">
                    <span class="device-detail-title">设备状态：</span>
                    <tis-tag v-if="deviceData.status == '1'" color="green">正常</tis-tag>
                    <tis-tag v-if="deviceData.status == '2'" color="red">异常</tis-tag>
                    <tis-tag v-if="deviceData.status == '3'" color="blue">维修中</tis-tag>
                    <tis-tag v-if="deviceData.status == '4'" color="yellow">待确认</tis-tag>
                    <tis-tag v-if="deviceData.status == '5'" color="grey">报废</tis-tag>
                </div>
                <div class="device-info-hang">
                    <span class="device-detail-title">所属厂区：</span>
                    <span class="device-detail-content">{{ this.deviceData.ownFactory }}</span>
                </div>
                <div class="device-info-hang">
                    <span class="device-detail-title">生产厂家：</span>
                    <span class="device-detail-content">{{ this.deviceData.productor ? this.deviceData.productor: '未填写' }}</span>
                </div>
                <div class="device-info-hang">
                    <span class="device-detail-title">购入时间：</span>
                    <span class="device-detail-content">{{ this.deviceData.buyTime }}</span>
                </div>
                <div class="device-info-hang">
                    <span class="device-detail-title">购入金额：</span>
                    <span class="device-detail-content">{{ this.deviceData.buyMoney}}&nbsp;{{this.deviceData.unit}}</span>
                </div>
                <div class="device-info-hang">
                    <span class="device-detail-title">最后一次维修时间：</span>
                    <span class="device-detail-content">{{ this.deviceData.lastFitTime ? this.deviceData.lastFitTime : '暂无' }}</span>
                </div>
                <div class="device-info-hang">
                    <span class="device-detail-title">介绍：</span>
                    <span class="device-detail-content">{{ this.deviceData.introduce ? this.deviceData.introduce : '暂无' }}</span>
                </div>
            </div>
        </div>
        <div class="device-chart">
            <div ref="deviceFitReason" style="width: 100%; height: 100%"></div>
        </div>
    </div>
</template>
<script>
import * as echarts from 'echarts';
import DeviceHeader from './business/device_header/DeviceHeader.vue'
import $api from '@/api/device/index.js'
export default {
    components: {
        DeviceHeader,
    },
    data() {
        return {
            deviceId: '',
            deviceData: {},
            option: {},
        }
    },
    mounted() {
        this.deviceId = this.$route.path.split('/')[4];
        this.getPieData(this.deviceId);
        this.getDeviceData();
        this.initEcharts();
    },
    methods: {
        initEcharts() {
            var option = this.option;
            const deviceFitReason = echarts.init(this.$refs.deviceFitReason);
            deviceFitReason.setOption(option);
        },
        async getPieData(id) {
            let params = {
                id: id
            }
            let res = await $api.getFitReason(params);
            if(res.code == 200) {
                this.option = res.data
            }
            this.initEcharts();
        },
        reloadData() {
            this.getDeviceData();
        },
        async getDeviceData() {
            let params = {
                deviceId: this.deviceId
            }
            let res = await $api.getDeviceInfo(params);
            if(res.code == 200) {
                this.deviceData = res.data
            }
        }
    }
}
</script>
<style lang="less">
@import './deviceDetail.less';
</style>