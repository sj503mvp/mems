<template>
    <div class="permission-bg">
        <p class="permission-title">{{ title }}</p>
        <tis-form @keyup.13.native="handleSearch">
            <div class="search">
                <template v-if="$route.name == 'user'">
                    <div class="search-left">
                        <tis-row :gutter="12">
                            <tis-col span="8">
                                <tis-input placeholder="员工姓名" clearable v-model="searchData.keyword" :maxlength="20"></tis-input>
                                <!-- 加一个隐藏的input 不然回车不会去触发搜索，而是去刷新页面了 -->
                                <tis-input style="display: none;"></tis-input>
                            </tis-col>
                            <tis-col span="8">
                                <tis-select ref="ownFactory" placeholder="所属厂区" clearable v-model="searchData.factoryId">
                                    <tis-option v-for="item in factoryList" :value="item.id" :key="item.id" :label="item.name"></tis-option>
                                </tis-select>
                            </tis-col>
                            <tis-col span="8">
                                <tis-select ref="ownPosition" placeholder="所属职位" clearable v-model="searchData.positionId">
                                    <tis-option v-for="item in positionList" :value="item.id" :key="item.id" :label="item.name"></tis-option>
                                </tis-select>
                            </tis-col>
                        </tis-row>
                    </div>
                    <div class="search-right">
                        <tis-button class="search-button" type="primary" @click="handleSearch" style="margin-right: 8px;">搜索</tis-button>
                        <tis-button class="search-button" v-show="resetStatus" @click="handleReset">重置</tis-button>
                    </div>
                </template>
                <template v-if="$route.name == 'manager'">
                    <div class="search-left">
                        <tis-row :gutter="12">
                            <tis-col span="6">
                                <tis-input placeholder="管理员姓名" clearable v-model="searchData.keyword" :maxlength="20"></tis-input>
                                <!-- 加一个隐藏的input 不然回车不会去触发搜索，而是去刷新页面了 -->
                                <tis-input style="display: none;"></tis-input>
                            </tis-col>
                            <tis-col span="6">
                                <tis-button class="search-button" type="primary" @click="handleSearch" style="margin-right: 8px;">搜索</tis-button>
                                <tis-button class="search-button" v-show="resetStatus" @click="handleReset">重置</tis-button>
                            </tis-col>
                            <tis-col span="6">
                                <tis-button class="search-button" type="primary" @click="addManager">新增管理员</tis-button>
                            </tis-col>
                        </tis-row>
                    </div>
                </template>
            </div>
        </tis-form>
        <div :style="{'min-height': `calc(100vh - 259px)`}" style="position: relative;" :key="$route.name">
            <tis-spin v-if="loading" fix></tis-spin>
            <div :style="backData.count>10? {'min-height' : 'calc(100vh - 291px)'}: {'min-height' : ''}">
                <tis-table class="permission-list-table" :midTdWidth="listWidth" :theadHeight="40">
                    <tr slot="table-head">
                        <th>工号</th>
                        <th>姓名</th>
                        <th>所在厂区</th>
                        <th>职位</th>
                        <th>操作</th>
                    </tr>
                    <tr slot="table-body" v-for="item in dataList" :key="item.uid">
                        <td>{{ item.uid }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.factory }}</td>
                        <td>{{ item.position }}</td>
                        <td>
                            <template v-if="$route.name == 'user'">
                                <tis-button type="text" color="blue" class="first-button" @click="changeDetail(item)">查看</tis-button>
                            </template>
                            <template v-if="$route.name == 'manager'">
                                <tis-button type="text" color="blue" class="first-button" @click="deleteManager(item)">移除</tis-button>
                            </template>
                        </td>
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
        <change-modal ref="changeModal"></change-modal>
        <add-modal ref="addModal"></add-modal>
    </div>
</template>
<script>
import {debounce} from "lodash";
import commonMixin from '@/mixins/common.js';
import changeModal from './business/ChangeUserModal.vue';
import addModal from './business/AddModal.vue';
import $api from '@/api/permission/index.js';
import EmptyView from '@/components/common/empty_view/EmptyView.vue';
export default {
    mixins: [commonMixin],
    components: {
        changeModal,
        addModal,
        EmptyView,
    },
    data() {
        return {
            loading: true,
            searchData: {
                page: 1,
                pageSize: 10,
            },
            backData: {},
            dataList: [],
            resetStatus: false,
            title: "用户管理",
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
            positionList: [
                {
                    id: '1',
                    name: '设备管理员'
                },
                {
                    id: '2',
                    name: '维修人员'
                }
            ],
            statusList: [
                {
                    id: '1',
                    name: '在职'
                },
                {
                    id: '2',
                    name: '离职'
                },
            ],
            listWidth: [20, 20, 20, 20, 20],
        }
    },
    watch: {
        '$route.name'(newVal, oldVal) {
            if(newVal == 'user') {
                this.title = '员工管理'
            }else {
                this.title = '管理员管理'
            }
            this.resetStatus = false;
            this.loading = true;
            this.searchData = {
                page: 1,
                pageSize: 10,
            };
            this.initData();
        }
    },
    mounted() {
        this.initData();
        this.takeRouteParams();
    },
    methods: {
        handleSearch() {
            this.$nextTick(() => {
                this.clearSelectQuery();
            })
            this.searchData.page = 1;
            this.pushRouteParams();
        },
        /**
         * 收起筛选项下拉框
        */
        clearSelectQuery() {
            if (this.$refs.ownFactory && this.$refs.ownFactory.$refs.head) {
                this.$refs.ownFactory.visible = false
            }
            if (this.$refs.ownPosition && this.$refs.ownPosition.$refs.head) {
                this.$refs.ownPosition.visible = false
            }
        },
        initData() {
            if(Object.keys(this.$route.query).length == 0) {
                this.pushRouteParams();
            }else {
                let params = JSON.parse(JSON.stringify(this.$route.query));
                this.getListData(params);
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
            this.getListData(params);
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
         * 搜索数据
         */
        getListData: debounce(async function(params){
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
            if(this.$route.name == 'user') {
                res = await $api.getAllUserInfo(params);
            }else {
                res = await $api.getAllManagerInfo(params);
            }
            let newPage = parseInt(res.data.count / params.pageSize);
            if(res.data.count % params.pageSize != 0) {
                newPage = newPage + 1;
            }
            if(params.page > newPage && res.data.count != 0) {
                params.page = newPage;
                if(this.$route.name == 'user') {
                    res = await $api.getAllUserInfo(params);
                }else {
                    res = await $api.getAllManagerInfo(params);
                }
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
        handleReset() {
            this.loading = true;
            this.resetStatus = false;
            this.searchData = {
                page: 1,
                pageSize: this.searchData.pageSize,
            }
            this.pushRouteParams();
        },
        /**
         * 改变页码、页面大小触发搜索
        */
        handlePage(page) {
            let params = JSON.parse(JSON.stringify(this.$route.query))
            params.page = page;
            this.$router.push ({
                name: this.$route.name,
                query: params
            })
            this.searchData.page = params.page;
            this.searchData.pageSize = params.pageSize;
            this.searchData.keyword = params.keyword;
            this.searchData.factoryId = params.factoryId;
            this.searchData.positionId = params.positionId;
            this.getListData(params);
        },
        /**
         * 处理分页最大显示条数派发事件
         * @param {Number} pageSize 当前显示条数
        */
        handlePageSize(pageSize) {
            let params = JSON.parse(JSON.stringify(this.$route.query));
            params.pageSize = pageSize;
            this.$router.push ({
                name: this.$route.name,
                query: params
            })
            this.searchData.page = params.page;
            this.searchData.pageSize = params.pageSize;
            this.searchData.keyword = params.keyword;
            this.searchData.factoryId = params.factoryId;
            this.searchData.positionId = params.positionId;
            this.getListData(params);
        },
        changeDetail(item) {
            // 调一个接口去请求权限,传入
            this.$refs.changeModal.show();
        },
        deleteManager() {
            this.$TisModal.warning({
                    title: '移除管理员',
                    content: '<p>此操作将会移除该管理员，操作不可逆</p>',
                    maskClosable: true,
                    okText: '删除',
                    showCancel: true,
                    okError: true,
                    onOk: async () => {
                    },
                    onCancel: () => {
                    }
                });
        },
        addManager() {
            this.$refs.addModal.show();
        },
    }
}
</script>
<style lang="less">
@import './permission.less';
</style>