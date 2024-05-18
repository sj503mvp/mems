<template>
    <div>
        <tis-form @keyup.13.native="handleSearch">
            <div class="device-search">
                <div class="search-left">
                    <tis-row :gutter="12">
                        <tis-col span="6">
                            <tis-input placeholder="设备名称" clearable :max-length="20" v-model="searchData.keyword"></tis-input>
                        </tis-col>
                        <tis-col span="6">
                            <tis-select ref="ownDeviceType" placeholder="设备类型" clearable v-model="searchData.typeId">
                                <tis-option v-for="(item,index) in deviceTypeList" :key="index" :value="item.id + ''">{{ item.name }}</tis-option>
                            </tis-select>
                        </tis-col>
                        <tis-col span="6">
                            <tis-select ref="ownFactory" scroll-id="scrollId" placeholder="所属厂区" clearable v-model="searchData.ownFactoryId">
                                <tis-option v-for="(item,index) in factoryList" :key="index" :value="item.id" :label="item.name"></tis-option>
                            </tis-select>
                        </tis-col>
                        <tis-col span="6" v-if="$route.name !== 'pending_device' && $route.name !== 'recycle_device' && $route.name !== 'all_device_follow' && $route.name !== 'my_device_follow'">
                            <tis-select ref="ownDeviceStatus" placeholder="设备状态" clearable v-model="searchData.status">
                                <tis-option v-for="(item,index) in statusList" :key="index" :value="item.id + ''">{{ item.name }}</tis-option>
                            </tis-select>
                        </tis-col>
                    </tis-row>
                </div>
                <div class="search-right">
                    <tis-row :gutter="8">
                        <tis-col span="12">
                            <tis-button class="search-button" type="primary" @click="handleSearch">搜索</tis-button>
                        </tis-col>
                        <tis-col span="12">
                            <tis-button class="search-button" v-show="resetStatus" @click="handleReset">重置</tis-button>
                        </tis-col>
                    </tis-row>
                </div>
            </div>
        </tis-form>
    </div>
</template>
<script>
export default {
    props: {
        resetStatus: {
            type: Boolean,
            default: false,
        },
        searchData: {
            type: Object,
            default: {},
        }
    },
    data() {
        return {
            deviceTypeList: [
                {
                    id: '1',
                    name: '冶炼设备',
                },
                {
                    id: '2',
                    name: '连铸设备',
                },
                {
                    id: '3',
                    name: '轧制（压延）设备',
                },
                {
                    id: '4',
                    name: '后步精整设备',
                },
                {
                    id: '5',
                    name: '辅助设备',
                },
            ],
            factoryList: [
                {
                    id: '1',
                    name: '总部'
                },
                {
                    id: '2',
                    name: '华东冶炼一厂'
                },
                {
                    id: '3',
                    name: '华南轧制二厂'
                },
                {
                    id: '4',
                    name: '华东连铸三厂'
                },
                {
                    id: '5',
                    name: '华北冶炼四厂'
                },
                {
                    id: '6',
                    name: '华南冶炼五厂'
                },
            ],
            statusList: [
                {
                    id: '1',
                    name: '正常',
                },
                {
                    id: '2',
                    name: '异常',
                },
                {
                    id: '3',
                    name: '维修中',
                },
                {
                    id: '4',
                    name: '待确认',
                },
                {
                    id: '5',
                    name: '报废',
                },
            ],
        }
    },
    methods: {
        handleSearch() {
            this.$nextTick(() => {
                this.clearSelectQuery();
            })
            this.$emit('on-search', this.searchData)
        },
        /**
         * 收起筛选项下拉框
        */
        clearSelectQuery() {
            if (this.$refs.ownDeviceType && this.$refs.ownDeviceType.$refs.head) {
                this.$refs.ownDeviceType.visible = false
            }
            if (this.$refs.ownFactory && this.$refs.ownFactory.$refs.head) {
                this.$refs.ownFactory.visible = false
            }
            if (this.$refs.ownDeviceStatus && this.$refs.ownDeviceStatus.$refs.head) {
                this.$refs.ownDeviceStatus.visible = false
            }
        },
        handleReset() {
            this.$emit('on-clear')
        }
    }
}
</script>
<style lang="less">
@import './searchOption.less';
</style>