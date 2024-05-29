<template>
    <div class="record-bg">
        <div class="record-search">
            <tis-form @keyup.13.native="handleSearch">
                <div class="search">
                    <tis-row :gutter="12">
                        <tis-col span="8">
                            <tis-input placeholder="登录人姓名" clearable v-model="searchData.keyword" :max-length="20"></tis-input>
                        </tis-col>
                        <tis-col span="8">
                            <tis-date-picker ref="recordPicker" type="daterange" placeholder="登录时间" :value="searchData.loginTime" @on-change="dateChange"></tis-date-picker>
                        </tis-col>
                        <tis-col span="8">
                            <tis-button class="search-button" type="primary" @click="handleSearch" style="margin-right: 8px">搜索</tis-button>
                            <tis-button class="search-button" v-show="resetStatus" @click="handleReset">重置</tis-button>
                        </tis-col>
                    </tis-row>
                </div>
            </tis-form>
        </div>
        <div class="record-list" :style="{'min-height': `calc(100vh - 205px)`}">
            <tis-spin v-if="loading" fix></tis-spin>
            <div :style="backData.count>10? {'min-height':'calc(100vh - 261px)'}: {'min-height' : ''}">
                <tis-table class="record-list-table" :midTdWidth="listWidth" :theadHeight="40">
                    <tr slot="table-head">
                        <th>编号</th>
                        <th>登录人</th>
                        <th>登录时间</th>
                        <th>浏览器</th>
                        <th>IP地址</th>
                    </tr>
                    <tr slot="table-body" v-for="item in dataList" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.username }}</td>
                        <td>{{ item.loginTime }}</td>
                        <td>{{ item.loginBrower }}浏览器</td>
                        <td>{{ item.loginIp }}</td>
                    </tr>
                </tis-table>
            </div>
            <div v-if="backData.count <= 10 && backData.count > 0" class="list-bottom-less" :key="$route.name">
                <div></div>
                <p class="bottom-info-less">共 {{ backData.count }} 条</p>
            </div>
            <div v-if="backData.count > 10" class="list-bottom" id="pageBottom" ref="pageBottom" :key="$route.name">
                <div class="bottom-line-page"></div>
                <div class="bottom-page">
                    <div></div>
                    <tis-page class="bottom-right"
                        :total="parseInt(backData.count)"
                        :current="parseInt(searchData.page)"
                        :page-size="parseInt(searchData.pageSize)"
                        :page-size-opts="[10, 20, 30, 40]"
                        show-elevator
                        show-total
                        show-sizer
                        @on-change="handlePage"
                        @on-page-size-change="handlePageSize"
                    />
                </div>
            </div>
            <empty-view
                v-if="(backData.count == 0 || backData.count == null) && !loading && !resetStatus"
                :style="{'height': `calc(100vh - 301px)`, 'min-height': '250px'}"
                :empty-img-url="'/common/no_message@2x.png'"
                :title="'暂无数据'"
                :title-style="{'font-size': '14px', 'font-weight': '400'}"
                :new-list="true"
            ></empty-view>
            <empty-view
                v-if="(backData.count==0 || backData.count ==null )&& !loading && resetStatus"
                :style="{'height': `calc(100vh - 301px)`, 'min-height': '250px'}"
                :empty-img-url="'/common/no_search_result@2x.png'"
                :title="'搜索无结果'"
                :title-style="{'font-size': '14px', 'font-weight': '400'}"
                :new-list="true">
            </empty-view>
            </div>
    </div>
</template>
<script>
import {debounce} from "lodash";
import commonMixin from '@/mixins/common.js';
import EmptyView from '@/components/common/empty_view/EmptyView.vue';
import $api from '@/api/loginRecord/index.js'
export default {
    mixins: [commonMixin],
    components: {
        EmptyView,
    },
    data() {
        return {
            searchData: {
                page: 1,
                pageSize: 10,
                keyword: '',
                loginTime: [],
            },
            loading: true,
            backData: {},
            dataList: [],
            resetStatus: false,
            listWidth: [20, 20, 20, 20, 20],
        }
    },
    mounted() {
        this.initData();
        this.takeRouteParams();
    },
    methods: {
        initData() {
            if(Object.keys(this.$route.query).length == 0) {
                this.pushRouteParams();
            }else {
                let params = JSON.parse(JSON.stringify(this.$route.query));
                this.getLoginData(params);
            }
        },
        /**
         * 请求接口并存路由
         */
         async pushRouteParams() {
            let arrType = ['loginTime']
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
            this.getLoginData(params);
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
        getLoginData: debounce(async function(params) {
            this.loading = true;
            this.dealPageOrPageSize(params);
            this.$nextTick(() => {
                this.resetJuged();
                this.toPageTop();
            })
        }, 500),
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
            res = await $api.getLoginData(JSON.stringify(params));
            let newPage = parseInt(res.data.count / params.pageSize);
            if(res.data.count % params.pageSize != 0) {
                newPage = newPage + 1;
            }
            if(params.page > newPage && res.data.count != 0) {
                params.page = newPage;
                res = await $api.getLoginData(JSON.stringify(params));
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
        handleSearch() {
            this.searchData.page = 1;
            this.pushRouteParams();
        },
        handleReset() {
            this.loading = true;
            this.resetStatus = false;
            this.searchData = {
                page: 1,
                pageSize: this.searchData.pageSize,
            }
            this.pushRouteParams();
        },
        dateChange(date) {
            this.searchData.loginTime = date;
        },
        handlePage(page) {
            let params = JSON.parse(JSON.stringify(this.$route.query));
            params.page = page;
            this.$router.push ({
                name: this.$route.name,
                query: params
            })
            this.searchData.page = params.page;
            this.searchData.pageSize = params.pageSize;
            this.searchData.keyword = params.keyword;
            this.searchData.loginTime = params.loginTime;
            this.getLoginData(params);
        },
        handlePageSize(pageSize) {
            let params = JSON.parse(JSON.stringify(this.$route.query));
            params.page = 1;
            params.pageSize = pageSize;
            this.$router.push ({
                name: this.$route.name,
                query: params
            })
            this.searchData.page = params.page;
            this.searchData.pageSize = params.pageSize;
            this.searchData.keyword = params.keyword;
            this.searchData.loginTime = params.loginTime;
            this.getLoginData(params);
        },
        toDetail() {},
    }
}
</script>
<style lang="less">
@import './record.less';
</style>