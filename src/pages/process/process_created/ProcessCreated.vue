<template>
    <div class="created-process">
        <search-option :reset-status="resetStatus" @on-search="onSearch" @on-clear="onClear" :search-data="searchData"></search-option>
        <process-list :reset-status="resetStatus" :search-data="searchData" :loading="loading" :back-data="backData" :data-list="dataList" @handle-page="handlePage"></process-list>
    </div>
</template>
<script>
import Cookies from 'js-cookie';
import {debounce} from "lodash";
import commonMixin from '@/mixins/common.js';
import SearchOption from '../business/SearchOption.vue';
import ProcessList from '../business/List.vue'
import $api from '@/api/process/index.js'
export default {
    mixins: [commonMixin],
    components: {
        SearchOption,
        ProcessList
    },
    data() {
        return {
            searchData: {
                page: 1,
                pageSize: 10,
                keyword: '',
                processTime: [],
                processType: '',
            },
            loading: true,
            backData: {},
            dataList: [],
            resetStatus: false,
        }
    },
    mounted() {
        this.initData();
        this.takeRouteParams();
    },
    methods: {
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
        getProcessCreated: debounce(async function(params) {
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
                this.getProcessCreated(params);
            }
        },
        /**
         * 请求接口并存路由
         */
         async pushRouteParams() {
            let arrType = ['processTime']
            for(let i in this.searchData) {
                if(!this.searchData[i]) {
                    delete this.searchData[i]
                }else if(Array.isArray(this.searchData[i])) {
                    if(arrType.indexOf(i) != -1 && !this.searchData[i][0]) {
                        delete this.searchData[i]
                    }
                }
            }
            // 存路由
            let params = JSON.parse(JSON.stringify(this.searchData));
            this.$router.push({
                name: this.$route.name,
                query: params
            })
            this.getProcessCreated(params);
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
            res = await $api.getProcessCreated(JSON.stringify(params));
            let newPage = parseInt(res.data.count / params.pageSize);
            if(res.data.count % params.pageSize != 0) {
                newPage = newPage + 1;
            }
            if(params.page > newPage && res.data.count != 0) {
                params.page = newPage;
                res = await $api.getProcessCreated(JSON.stringify(params));
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
            this.searchData.processTime = params.processTime;
            this.searchData.processType = params.processType;
            this.getProcessCreated(params);
        },
    }
}
</script>
<style lang="less">
@import './processCreated.less';
</style>