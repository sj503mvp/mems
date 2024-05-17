<template>
    <div class="device-list-bg">
        <div class="list-bg-content" :style="{'min-height': `calc(100vh - 205px)`}">
            <tis-spin v-if="loading" fix></tis-spin>
            <template v-if="$route.name === 'pending_device'">
                <div class="list-top">
                    <tis-icon class="info-icon" type="ios-information-circle" size="18"></tis-icon>
                    <span class="info-word">请及时推送给相应人员消除以待处理设备</span>
                </div>
            </template>
            <template v-if="$route.name === 'recycle_device'">
                <div class="list-top">
                    <tis-icon class="info-icon" type="ios-information-circle" size="18"></tis-icon>
                    <span class="info-word">设备报废后将会出现在此列表</span>
                </div>
            </template>
            <div class="list-content" :style="backData.count>10? {'min-height':'calc(100vh - 261px)'}: {'min-height' : ''}">
                <div class="list-item" v-for="(item,index) in dataList" :key="item.id">
                    <div class="item-left" v-if="$route.name === 'pending_device'">
                        <tis-checkbox :value="selectIds.includes(item.id)" @on-change="(event) => checkboxChange(event, item)"></tis-checkbox>
                    </div>
                    <div class="item-right">
                        <div class="item-right-top">
                            <div class="item-title">
                                <p class="item-title-word" v-title @click="toDetail(item)">[{{ item.number }}] {{ item.name }}</p>
                                <tis-tag type="brimless" color="green" class="title-tag" v-if="item.status=='1'">正常</tis-tag>
                                <tis-tag type="brimless" color="red" class="title-tag" v-if="item.status=='2'">异常</tis-tag>
                                <tis-tag type="brimless" color="blue" class="title-tag" v-if="item.status=='3'">维修中</tis-tag>
                                <tis-tag type="brimless" color="yellow" class="title-tag" v-if="item.status=='4'">待确认</tis-tag>
                                <tis-tag type="brimless" color="grey" class="title-tag" v-if="item.status=='5'">报废</tis-tag>
                            </div>
                        </div>
                        <div class="item-bottom">
                            <div class="item-bottom-left">
                                <div class="item-bottom-field">设备种类：{{item.type}}</div>
                                <div class="item-bottom-field info-factory-field">所属厂区：<span class="info-factory">{{item.ownFactory}}</span></div>
                                <div class="item-bottom-field">购入时间：{{item.buyTime}}</div>
                                <div class="item-bottom-field">最后一次维修时间：{{item.lastFitTime? item.lastFitTIme : '暂无'}}</div>
                            </div>
                            <template v-if="$route.name == 'pending_device'">
                                    <div v-if="item.status !== '4'" class="item-bottom-share" @click="pushItem(item, 'single')">
                                        <i class="iconfont icontuisong share-icon"></i><span class="share-word">推送</span>
                                    </div>
                                    <div v-if="item.status == '4'" class="item-bottom-share" @click="openConfirmModal(item)">
                                        <i class="iconfont iconcheck share-icon"></i><span class="share-word">确认</span>
                                    </div>
                            </template>
                            <template v-if="$route.name == 'my_device_collection'">
                                <!-- 已关注 -->
                                <div class="item-bottom-share" v-if="item.isFocus" @click="careOrNot(item, 0)">
                                    <i class="iconfont iconstar-fill share-icon"></i><span class="share-word">已关注</span>
                                </div>
                                <!-- 未关注 -->
                                <div class="item-bottom-share" v-else @click="careOrNot(item, 1)">
                                    <i class="iconfont iconstar share-icon"></i><span class="share-word">关注</span>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="backData.count<=10 && backData.count>0" class="list-bottom-less">
                <div class="bottom-left" v-if="$route.name == 'pending_device'">
                    <tis-checkbox :value="selectIds.length == dataList.length"
                        :disabled="loading"  @on-change="handleCheckAll">
                        <span class="bottom-left-word">全选</span>
                    </tis-checkbox>
                    <tis-button type="primary" :disabled="selectIds.length === 0 || loading" @click="pushItem">推送设备</tis-button>
                    <p class="num-selected" v-if="selectIds.length">已选择<span class="num">{{selectIds.length}}</span>条</p>
                </div>
                <div v-else></div>
                <p class="bottom-info-less">共 {{ backData.count }} 条</p>
            </div>
            <div v-if="backData.count>10" id="pageBottom" ref="pageBottom" class="list-bottom">
                <div class="bottom-line-page"></div>
                <div class="bottom-page">
                    <div class="bottom-left">
                        <tis-checkbox :value="selectIds.length == dataList.length"
                        class="all-check"
                        :disabled="loading"  @on-change="handleCheckAll" label="全选">
                            <span class="bottom-left-word">全选</span>
                        </tis-checkbox>
                        <tis-button type="primary" :disabled="selectIds.length === 0 || loading" @click="pushItem">推送设备</tis-button>
                        <p class="num-selected" v-if="selectIds.length">已选择<span class="num">{{selectIds.length}}</span>条</p>
                    </div>
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
        <confirm-modal ref="confirmItemModal" @reload-list="reloadList"></confirm-modal>
        <tis-push-range
            ref="tisPushRange"
            :people-data="peopleList"
            children-key="children"
            :diyFooterLeft="true"
            :diy-tab="['people']"
            @push-sure="pushConfirm"
            :useTreeNode="true"
            :userMoreParams="['company_id']"
            title="推送范围">
        </tis-push-range>
    </div>
</template>
<script>
import ConfirmModal from '@/components/device/confirm_modal/ConfirmModal.vue'
import EmptyView from '@/components/common/empty_view/EmptyView.vue';
export default {
    components: {
        ConfirmModal,
        EmptyView,
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
            selectIds: [],
            singleId: [],
            // 推送人员列表
            peopleList: [],
        }
    },
    watch: {
        'dataList': {
            handler() {
                this.selectIds = []
            }
        }
    },
    mounted() {
        // 滑动触发
        window.addEventListener("scroll", this.suctionBottom);
        // 调整页面高度触发
        window.addEventListener("resize", this.suctionBottom);
        this.getTreeList();
    },
    beforeDestroy() {
        // 销毁监听事件
        window.removeEventListener("scroll", this.suctionBottom);

        window.removeEventListener("resize", this.suctionBottom);

        this.$refs.pageBottom && this.stickyObserver && this.stickyObserver.unobserve(this.$refs.pageBottom || '')
    },
    methods: {
         /**
         * 监听吸底样式
         */
         async suctionBottom() {
            let listTop = document.getElementById('listTop');
            if(!listTop) {
                return;
            }
            let top = document.getElementById('listTop').getBoundingClientRect().top;
            if (document.getElementById('pageBottom')) {
                if (top< 200) {
                    document.getElementById('pageBottom').style.position = "sticky";
                    this.$nextTick(() => {
                        const stickyElm = this.$refs.pageBottom
                        this.stickyObserver = new IntersectionObserver(
                            ([e]) => e.target.classList.toggle('is-sticky', e.intersectionRatio < 1),
                            {threshold: [1],rootMargin: '0px 100% -1px 100%'}
                        );
                        this.stickyObserver.observe(stickyElm)
                    })
                } else {
                    document.getElementById('pageBottom').style.position = "relative";
                    this.stickyObserver.unobserve(this.$refs.pageBottom)
                }
            }
        },
        /**
         * 全选
         */
        handleCheckAll(event) {
            this.selectIds = []
            if (event) {
                this.dataList.forEach(item => {
                    this.selectIds.push(item.id)
                })
            }
        },
        /**
         * 推送方法
         */
        pushItem(item, type) {
            this.openModal();
            this.singleId = [];
            if(type == 'single') {
                this.singleId.push(item.id);
            }
        },
        openModal() {
            this.$refs.tisPushRange.show();
        },
        /**
         * 选中逻辑判断
         * @param {Boolean} event 是否选中
         * @param {item} item 选中项
         */
        checkboxChange(event, item) {
            if (event) {
                // 选中
                this.selectIds.push(item.id)
            } else {
                // 取消选中
                this.selectIds.splice(this.selectIds.indexOf(item.id), 1)
            }
        },
        openConfirmModal(item) {
            this.$refs.confirmItemModal.show(item)
        },
        /**
         * 刷新页面
         */
        async reloadList() {
            // let params = JSON.parse(JSON.stringify(this.$route.query));
            // await this.getListData(params);
            console.log('123');
        },
        /**
         * 是否关注
         * @param item
         * @param care 1：关注 其他：取消关注
         */
        async careOrNot(item, care) {
            this.$set(item, "isFocus", care)
            // let params = {
            //     itemId: item.itemId,
            //     isFocus: care==1 ? 1 : 0
            // }
            // let res = await $itemListApi.changeItemFocus(params)
            // if (res.code == 200) {
            //     if (care == 1) {
            //         this.$TisMessage.success('关注成功')
            //     } else {
            //         this.$TisMessage.success('取消关注成功')
            //     }
            // }
        },
        /**
         * 获取数据
         */
         async getTreeList(val) {
            // let res = await $api.getPushData();
            let res = {
                data: {
                    userTree: [
                        {
                            id: "1264",
                            name: "设备管理员",
                            children: [
                                {
                                    id: "100124",
                                    name: "狗头苏丹",
                                    gourpName: "设备管理员",
                                },
                                {
                                    id: "100125",
                                    name: "狗头苏丹1",
                                    gourpName: "设备管理员",
                                },
                            ]
                        },
                        {
                            id: "1266",
                            name: "维修人员",
                            children: [
                                {
                                    id: "100127",
                                    name: "狗头苏丹",
                                    gourpName: "维修人员",
                                },
                                {
                                    id: "100128",
                                    name: "狗头苏丹1",
                                    gourpName: "维修人员",
                                },
                            ]
                        },
                    ]
                }                
            };
            let pushData = res.data;
            this.peopleList = JSON.parse(JSON.stringify(pushData.userTree));
            if (this.$refs.tisPushRange) {
                this.$refs.tisPushRange.hideLoading();
            }
        },
        /**
         * 点击确定后的回调
         */
         async pushConfirm(data) {
            const uidArray = [];
            data.forEach((item, index, array)=> {
                uidArray.push(item.id)
            })
            let params = {
                uidArray: uidArray,
                itemIdArray: this.singleId.length == 1? this.singleId: this.selectIds,
            }
            // let res = await $api.pushItem(params);
            this.selectIds = [];
        },
        toDetail(item) {
            this.openDetailPage('device_detail', item.id)
        },
        openDetailPage(pageName, device_id) {
            window.open(this.$router.resolve({
                name: pageName,
                params: {
                    device_id
                }
            }).href, '_blank')
        }
    }
}
</script>
<style lang="less">
@import './list.less';
</style>