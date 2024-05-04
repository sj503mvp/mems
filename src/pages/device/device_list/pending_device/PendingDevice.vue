<template>
    <div class="pending-device">
        <search-option></search-option>
        <device-list :loading="loading" :back-data="backData" :data-list="dataList" :style="backData.count>10?{'min-height':'calc(100vh - 261px)'}:{'min-height':`calc(100vh - 205px)`}"></device-list>
    </div>
</template>
<script>
import SearchOption from '../business/SearchOption.vue'
import DeviceList from '../business/List.vue'
export default {
    components: {
        SearchOption,
        DeviceList
    },
    data() {
        return {
            // loading: true,
            // backData: {},
            // dataList: [],
            loading: false,
            backData: {
                count: 4,
                data: {
                    list: [
                        {
                        deviceNumber: 'YL-1',
                        deviceId: '1',
                        title: '冶炼设备一号',
                        status: '异常',
                        buyTime: '2021-03-26',
                        ownFactory: '华东冶炼一厂',
                        typeName: '冶炼设备',
                        lastFitTime: '2023-04-12',
                        },
                        {
                        deviceNumber: 'YL-2',
                        deviceId: '2',
                        title: '冶炼设备一号',
                        status: '待确认',
                        buyTime: '2021-03-26',
                        ownFactory: '华东冶炼一厂',
                        typeName: '冶炼设备',
                        lastFitTime: '2023-04-12',
                        },
                        {
                        deviceNumber: 'YL-3',
                        deviceId: '3',
                        title: '冶炼设备一号',
                        status: '异常',
                        buyTime: '2021-03-26',
                        ownFactory: '华东冶炼一厂',
                        typeName: '冶炼设备',
                        lastFitTime: '2023-04-12',
                        },
                    ]
                }
            },
            dataList: [
                {
                   deviceNumber: 'YL-1',
                   deviceId: '1',
                   title: '冶炼设备一号',
                   status: '异常',
                   buyTime: '2021-03-26',
                   ownFactory: '华东冶炼一厂',
                   typeName: '冶炼设备',
                   lastFitTime: '2023-04-12',
                },
                {
                   deviceNumber: 'YL-2',
                   deviceId: '2',
                   title: '冶炼设备一号',
                   status: '待确认',
                   buyTime: '2021-03-26',
                   ownFactory: '华东冶炼一厂',
                   typeName: '冶炼设备',
                   lastFitTime: '2023-04-12',
                },
                {
                   deviceNumber: 'YL-3',
                   deviceId: '3',
                   title: '冶炼设备一号',
                   status: '异常',
                   buyTime: '2021-03-26',
                   ownFactory: '华东冶炼一厂',
                   typeName: '冶炼设备',
                   lastFitTime: '2023-04-12',
                },
            ],
        }
    }
}
</script>
<style lang="less" scoped>
@import './pendingDevice.less';
</style>