<template>
    <div>
        <tis-form @keyup.13.native="handleSearch">
            <div class="device-search">
                <div class="search-left">
                    <tis-row :gutter="12">
                        <tis-col span="6">
                            <tis-input placeholder="设备ID 设备名称" clearable :max-length="20" v-model="searchData.keyword"></tis-input>
                        </tis-col>
                        <tis-col span="6">
                            <tis-select placeholder="设备类型" clearable v-model="searchData.type">
                                <tis-option v-for="(item,index) in deviceTypeList" :key="index" :value="item.id + ''">{{ item.name }}</tis-option>
                            </tis-select>
                        </tis-col>
                        <tis-col span="6">
                            <tis-select scroll-id="scrollId" placeholder="所属厂区" clearable multiple filterable v-model="searchData.factory">
                                <tis-option v-for="(item,index) in deviceFactoryList" :key="index" :value="item.id" :label="item.name"></tis-option>
                            </tis-select>
                        </tis-col>
                        <tis-col span="6">
                            <tis-select placeholder="设备状态" clearable v-model="searchData.status">
                                <tis-option v-for="(item,index) in deviceStatusList" :key="index" :value="item.id + ''">{{ item.name }}</tis-option>
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
            deviceFactoryList: [
                {
                    id: '1',
                    name: '华东冶炼一厂',
                },
                {
                    id: '2',
                    name: '华南轧制二厂',
                },
                {
                    id: '3',
                    name: '华东连铸三厂',
                },
                {
                    id: '4',
                    name: '华北冶炼四厂',
                },
                {
                    id: '5',
                    name: '华南冶炼五厂',
                },
            ],
            deviceStatusList: [
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
                    name: '报废',
                },
            ],
            resetStatus: false,
            searchData: {

            }
        }
    },
    methods: {
        handleSearch() {
            console.log('触发搜索');
            console.log(this.searchData,'qwe');
        },
        handleReset() {
            console.log('重置');
        }
    }
}
</script>
<style lang="less">
@import './searchOption.less';
</style>