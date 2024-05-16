<template>
    <div class="process-list" :style="{'min-height': `calc(100vh - 205px)`}">
        <tis-spin v-if="loading" fix></tis-spin>
        <div :style="backData.count>10? {'min-height':'calc(100vh - 261px)'}: {'min-height' : ''}">
            <tis-table class="process-list-table" :midTdWidth="listWidth" :theadHeight="40">
                <tr slot="table-head">
                    <th>编号</th>
                    <th>申请标题</th>
                    <th>申请时间</th>
                    <th>申请人</th>
                    <th>申请种类</th>
                    <th v-if="$route.name == 'process_created'">审批状态</th>
                    <th>操作</th>
                </tr>
                <tr slot="table-body" v-for="item in dataList" :key=item.id>
                    <td>{{ item.id }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.time }}</td>
                    <td>{{ item.proposer }}</td>
                    <td>
                        <span v-if="item.approvalType == '1'">购入申请</span>
                        <span v-if="item.approvalType == '2'">报废申请</span>
                    </td>
                    <td v-if="$route.name == 'process_created'">
                        <span v-if="item.approvalStatus == '0'">待审批</span>
                        <span v-if="item.approvalStatus == '1'">审批通过</span>
                        <span v-if="item.approvalStatus == '2'">审批未通过</span>
                    </td>
                    <td>
                        <tis-button type="text" color="blue" v-if="$route.name == 'process_approval'" @click="toAppraval(item)">审批</tis-button>
                        <tis-button type="text" color="blue" v-else @click="toDetail(item)">查看</tis-button>
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
        <process-modal ref="processModal" @reload-page="reloadPage"></process-modal>
    </div>
</template>
<script>
import Cookies from 'js-cookie';
import ProcessModal from '@/components/process/ProcessModal.vue'
import EmptyView from '@/components/common/empty_view/EmptyView.vue';
import $api from '@/api/process/index.js';
export default {
    components: {
        ProcessModal,
        EmptyView
    },
    props: {
        searchData: {
            type: Object,
            default: {},
        },
        loading: {
            type: Boolean,
            default: false,
        },
        backData: {
            type: Object,
            default: {},
        },
        dataList: {
            type: Array,
            default: [],
        },
        resetStatus: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            page: 1,
            pageSize: 10,
        }
    },
    computed: {
        listWidth() {
            if(this.$route.name == 'process_created') {
                return [10, 20, 15, 15, 10, 15, 15]
            }else {
                return [10, 20, 15, 15, 15, 15]
            }
        }
    },
    methods: {
        toAppraval(item) {
            this.$refs.processModal.show(item);
        },
        toDetail(item) {
            this.$refs.processModal.show(item);
        },
        handlePage(page) {
            this.page = page;
            this.$emit("handle-page", this.page, this.pageSize)
        },
        handlePageSize(pageSize) {
            this.pageSize = pageSize;
            this.$emit("handle-page", 1, this.pageSize)
        },
        reloadPage() {
            this.$emit('reload-page')
        }
    }
}
</script>
<style lang="less">
@import './list.less';
</style>