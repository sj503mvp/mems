<template>
    <div class="my-device">
        <div class="my-device-top">
            <div class="tabs-bg">
                <tis-tabs tabIdName="test-tab" :tabsList="myDeviceList" type="second" :value="startTab" @on-click="changeTab" :secondFontBold="true" :secondMarginLeft="24"></tis-tabs>
            </div>
            <search-option></search-option>
        </div>
        <my-device-list :loading="loading" :back-data="backData" :data-list="dataList" :style="backData.count>10?{'min-height':'calc(100vh - 306px)'}:{'min-height':`calc(100vh - 251px)`}"></my-device-list>
    </div>
</template>
<script>
import SearchOption from '../business/SearchOption.vue'
import MyDeviceList from '../business/List.vue'
export default {
    components: {
        SearchOption,
        MyDeviceList
    },
    data() {
        return {
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
                        isFocus: true,
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
                        isFocus: false,
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
                        isFocus: true,
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
                   type: '冶炼设备',
                   lastFitTime: '2023-04-12',
                   isFocus: true,
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
                   isFocus: false,
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
                   isFocus: true,
                },
            ],
            // tab列表
            myDeviceList: [
                {
                    id: 'my_device_my_input',
                    label: '我录入的',
                    render: (h) => {
                        return h('div', {class: {'tis-tabs-span': true,}},
                            [h('tis-badge', {props: {count: Number(123)},style: {fontWeight: 'normal'}},
                                [h('span', {style:{fontWeight: 'bold'}},'我录入的')],)])
                    }
                },
                {
                    id: 'my_device_follow',
                    label: '跟进中',
                    render: (h) => {
                        return h('div', {class: {'tis-tabs-span': true,}},
                            [h('tis-badge', {props: {count: Number(123)},style: {fontWeight: 'normal'}},
                                [h('span', {style:{fontWeight: 'bold'}},'跟进中')],)])
                    }
                },
                {
                    id: 'my_device_collection',
                    label: '我关注的',
                    render: (h) => {
                        return h('div', {class: {'tis-tabs-span': true,}},
                            [h('tis-badge', {props: {count: Number(123)},style: {fontWeight: 'normal'}},
                                [h('span', {style:{fontWeight: 'bold'}},'我关注的')],)])
                    }
                },
            ],
            startTab: '我录入的',
        }
    },
    mounted() {
        this.checkStartTab();
    },
    methods: {
        // Tab切换跳转
        changeTab(e) {
            this.$router.push({
                name: e.id,
            })
            this.startRoute = e.id
        },
        /**
         * 刷新页面判断是哪个tab
         */
        checkStartTab() {
            if(this.$route.name === 'my_device_my_input') {
                this.startTab = '我录入的';
            }else if(this.$route.name === 'my_device_follow') {
                this.startTab = '跟进中';
            }else {
                this.startTab = '我关注的';
            }
        }
    }
}
</script>
<style lang="less">
@import './myDevice.less';
</style>