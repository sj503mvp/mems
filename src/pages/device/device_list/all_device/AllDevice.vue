<template>
    <div class="all-device">
        <div class="all-device-top">
            <div class="tabs-bg">
                <tis-tabs tabIdName="test-tab" :tabsList="allDeviceList" type="second" :value="startTab" @on-click="changeTab" :secondFontBold="true" :secondMarginLeft="24"></tis-tabs>
            </div>
            <search-option :reset-status="resetStatus" @on-search="onSearch" @on-clear="onClear" :search-data="searchData"></search-option>
        </div>
        <all-device-list :have-tab="haveTab" :reset-status="resetStatus" :search-data="searchData" :loading="loading" :back-data="backData" :data-list="dataList" @handle-page="handlePage"></all-device-list>
    </div>
</template>
<script>
import Cookies from 'js-cookie';
import {debounce} from "lodash";
import commonMixin from '@/mixins/common.js';
import SearchOption from '../business/SearchOption.vue'
import AllDeviceList from '../business/List.vue'
import $api from '@/api/device/index.js'
export default {
    mixins: [commonMixin],
    components: {
        SearchOption,
        AllDeviceList
    },
    data() {
        return {
            searchData: {
                page: 1,
                pageSize: 10,
                keyword: '',
                typeId: '',
                ownFactoryId: '',
            },
            loading: true,
            backData: {},
            dataList: [],
            resetStatus: false,
            // tab列表
            allDeviceList: [
                {
                    id: 'all_device',
                    label: '全部设备',
                },
                {
                    id: 'all_device_follow',
                    label: '跟进中',
                }
            ],
            startTab: '全部设备',
            haveTab: true,
        }
    },
    watch: {
        '$route.name':{
            handler(newVal,oldVal){
                // 切换tab从白页加载
                this.backData = {};
                this.dataList = [];
                this.loading = true;
                if(newVal != oldVal) {
                    this.searchData = {};
                }
                this.searchData.page = 1;
                this.searchData.pageSize = 10;
                this.checkStartTab();
                this.pushRouteParams();
            }
        },
    },
    mounted() {
        this.checkStartTab();
        this.initData();
        this.takeRouteParams();
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
            if(this.$route.name === 'all_device_all') {
                this.startTab = '全部设备';
            } else {
                this.startTab = '跟进中';
            }
        },
        onSearch(searchData) {
            this.searchData = searchData;
            this.searchData.page = 1;
            this.pushRouteParams();
        },
        onClear() {
            this.loading = true;
            this.resetStatus = false;
            this.searchData = {
                page: 1,
                pageSize: this.searchData.pageSize,
            }
            this.pushRouteParams();
        },
        getAllDevice: debounce(async function(params) {
            this.loading = true;
            this.dealPageOrPageSize(params);
            this.$nextTick(() => {
                this.resetJuged();
                this.toPageTop();
            })
        }, 500),
        initData() {
            if(Object.keys(this.$route.query).length == 0) {
                this.pushRouteParams();
            }else {
                let params = JSON.parse(JSON.stringify(this.$route.query));
                this.getAllDevice(params);
            }
        },
        /**
         * 请求接口并存路由
         */
         async pushRouteParams() {
            for(let i in this.searchData) {
                if(!this.searchData[i]) {
                    delete this.searchData[i]
                }
            }
            // 存路由
            let params = JSON.parse(JSON.stringify(this.searchData));
            this.$router.push({
                name: this.$route.name,
                query: params
            })
            this.getAllDevice(params);
        },
        /**
         * 在url中直接修改页码和页面大小的时候处理方法
         */
         async dealPageOrPageSize(params) {
            if(params.pageSize > 40) {
                params.pageSize = 40;
            }
            if(params.pageSize < 10) {
                params.pageSize = 10;
            }
            let newPageSize = Math.round(params.pageSize / 10) * 10;
            if(params.pageSize % 10 != 0) {
                params.pageSize = newPageSize;
            }
            let res;
            params.userId = Cookies.get('uid');
            res = await this.chooseInterface(params);
            let newPage = parseInt(res.data.count / params.pageSize);
            if(res.data.count % params.pageSize != 0) {
                newPage = newPage + 1;
            }
            if(params.page > newPage && res.data.count != 0) {
                params.page = newPage;
                res = await this.chooseInterface(params);
            }
            if(res.code == 200) {
                this.backData = res.data;
                this.dataList = res.data.list;
            }
            this.loading = false;
            this.$router.push({
                name: this.$route.name,
                query: params
            })
            setTimeout(() => {
                this.takeRouteParams();
            }, 500)
        },
        /**
         * 判断选择请求哪个接口
         */
         async chooseInterface(params) {
            let res;
            if(this.$route.name == 'all_device_all') {
                res = await $api.getAllDevice(params);
            }
            if(this.$route.name == 'all_device_follow') {
                res = await $api.getAllFollowDevice(params);
            }
            return res;
        },
        /**
         * 取出路由参数
         */
        takeRouteParams() {
            if (this.$route.query) {
                let params = JSON.parse(JSON.stringify(this.$route.query))
                for (let i in params) {
                    if (params[i] && i in this.searchData) {
                        this.searchData[i] = params[i];
                    }
                }
            }
        },
        /**
         * 改变页码、页面大小、排序方式触发搜索
         */
        handlePage(page, pageSize) {
            let params = JSON.parse(JSON.stringify(this.$route.query))
            params.page = page;
            params.pageSize = pageSize;
            this.$router.push ({
                name: this.$route.name,
                query: params
            })
            // 直接赋值，循环params和this.searchData中有的属性会没有导致回显有问题
            this.searchData.page = params.page;
            this.searchData.pageSize = params.pageSize;
            this.searchData.keyword = params.keyword;
            this.searchData.typeId = params.typeId;
            this.searchData.ownFactoryId = params.ownFactoryId;
            this.getAllDevice(params);
        },
    }
}
</script>
<style lang="less">
@import './allDevice.less';
</style>