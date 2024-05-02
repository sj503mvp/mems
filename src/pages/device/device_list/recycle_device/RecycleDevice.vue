<template>
    <div class="recycle-device">
        <search-option></search-option>
        <recycle-device-list :loading="loading" :back-data="backData" :data-list="dataList" :style="backData.count>10?{'min-height':'calc(100vh - 261px)'}:{'min-height':`calc(100vh - 205px)`}"></recycle-device-list>
    </div>
</template>
<script>
import SearchOption from '../business/SearchOption.vue'
import RecycleDeviceList from '../business/List.vue'
export default {
    components: {
        SearchOption,
        RecycleDeviceList
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
                        type: '冶炼设备',
                        lastFitTime: '2023-04-12',
                        },
                        {
                        deviceNumber: 'YL-2',
                        deviceId: '2',
                        title: '冶炼设备一号',
                        status: '待确认',
                        buyTime: '2021-03-26',
                        ownFactory: '华东冶炼一厂',
                        type: '冶炼设备',
                        lastFitTime: '2023-04-12',
                        },
                        {
                        deviceNumber: 'YL-3',
                        deviceId: '3',
                        title: '冶炼设备一号',
                        status: '异常',
                        buyTime: '2021-03-26',
                        ownFactory: '华东冶炼一厂',
                        type: '冶炼设备',
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
                   status: '报废',
                   buyTime: '2021-03-26',
                   ownFactory: '华东冶炼一厂',
                   type: '冶炼设备',
                   lastFitTime: '2023-04-12',
                },
                {
                   deviceNumber: 'YL-2',
                   deviceId: '2',
                   title: '冶炼设备一号',
                   status: '报废',
                   buyTime: '2021-03-26',
                   ownFactory: '华东冶炼一厂',
                   type: '冶炼设备',
                   lastFitTime: '2023-04-12',
                },
                {
                   deviceNumber: 'YL-3',
                   deviceId: '3',
                   title: '冶炼设备一号',
                   status: '报废',
                   buyTime: '2021-03-26',
                   ownFactory: '华东冶炼一厂',
                   type: '冶炼设备',
                   lastFitTime: '2023-04-12',
                },
            ],
        }
    }
}
</script>
<style lang="less">
@import './recycleDevice.less';
</style>