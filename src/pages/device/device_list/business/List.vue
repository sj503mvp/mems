<template>
    <div class="device-list-bg">
        <div class="list-bg-content" :style=" haveTab? {'min-height':'calc(100vh - 251px)'}: {'min-height' : 'calc(100vh - 205px)'}">
            <tis-spin v-if="loading" fix></tis-spin>
            <template v-if="$route.name === 'pending_device'">
                <div class="list-top" id="listTop">
                    <tis-icon class="info-icon" type="ios-information-circle" size="18"></tis-icon>
                    <span class="info-word">请及时推送给相应人员消除以待处理设备</span>
                </div>
            </template>
            <template v-if="$route.name === 'recycle_device'">
                <div class="list-top" id="listTop">
                    <tis-icon class="info-icon" type="ios-information-circle" size="18"></tis-icon>
                    <span class="info-word">设备报废后将会出现在此列表</span>
                </div>
            </template>
            <div class="list-content" :style="minHeightStyle" id="listTop">
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
                                <div class="item-bottom-field">最后一次维修时间：{{item.lastFitTime? item.lastFitTime : '暂无'}}</div>
                            </div>
                            <template v-if="$route.name == 'pending_device'">
                                    <div v-if="item.status !== '4'" class="item-bottom-share" @click="pushItem(item, 'single')">
                                        <i class="iconfont icontuisong share-icon"></i><span class="share-word">推送</span>
                                    </div>
                                    <div v-if="item.status == '4'" class="item-bottom-share" @click="openConfirmModal(item)">
                                        <i class="iconfont iconcheck share-icon"></i><span class="share-word">确认</span>
                                    </div>
                            </template>
                            <template v-if="$route.name == 'my_device_follow' && FiterList.indexOf(parseInt(userId)) !== -1">
                                <div class="item-bottom-share" @click="pushItemConfrim(item)">
                                    <i class="iconfont icontuisong share-icon"></i><span class="share-word">推送</span>
                                </div>
                            </template>
                            <template v-if="$route.name == 'my_device_collection'">
                                <!-- 已关注 -->
                                <div class="item-bottom-share" v-if="item.isFocus" @click="toFocus(item,false)">
                                    <i class="iconfont iconstar-fill share-icon"></i><span class="share-word">已关注</span>
                                </div>
                                <!-- 未关注 -->
                                <div class="item-bottom-share" v-else @click="toFocus(item,true)">
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
                    <div class="bottom-left"  v-if="$route.name == 'pending_device'">
                        <tis-checkbox :value="selectIds.length == dataList.length"
                        class="all-check"
                        :disabled="loading"  @on-change="handleCheckAll" label="全选">
                            <span class="bottom-left-word">全选</span>
                        </tis-checkbox>
                        <tis-button type="primary" :disabled="selectIds.length === 0 || loading" @click="pushItem">推送设备</tis-button>
                        <p class="num-selected" v-if="selectIds.length">已选择<span class="num">{{selectIds.length}}</span>条</p>
                    </div>
                    <div v-else></div>
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
import Cookies from 'js-cookie';
import ConfirmModal from '@/components/device/confirm_modal/ConfirmModal.vue'
import EmptyView from '@/components/common/empty_view/EmptyView.vue';
import $api from '../../../../api/device/device';
import {createNamespacedHelpers} from "vuex";
const sidebarNum =createNamespacedHelpers('sidebarNum');
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
        },
        haveTab: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            page: 1,
            pageSize: 10,
            selectIds: [],
            userId: '',
            singleId: [],
            // 维修人员列表
            FiterList: [],
            // 推送人员列表
            peopleList: [],
        }
    },
    computed: {  
        minHeightStyle() {  
            if (this.backData.count > 10) {  
                if (this.haveTab) {  
                    return { minHeight: 'calc(100vh - 307px)' };  
                } else {  
                    return { minHeight: 'calc(100vh - 261px)' };  
                }  
            } else {  
                return { minHeight: '' };
            }  
        },  
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
        this.getAllUser();
        this.userId = Cookies.get('uid')
    },
    beforeDestroy() {
        // 销毁监听事件
        window.removeEventListener("scroll", this.suctionBottom);

        window.removeEventListener("resize", this.suctionBottom);

        this.$refs.pageBottom && this.stickyObserver && this.stickyObserver.unobserve(this.$refs.pageBottom || '')
    },
    methods: {
        ...sidebarNum.mapActions([
            'saveTabFieldTips'
        ]),
        async getAllUser() {
            let res = await $api.getAllUserList();
            this.FiterList = res.data.filter(item => {return item.positionId == '2'}).map(item => item.uid);
        },
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
                if(this.$route.name === 'pending_device' || this.$route.name === 'recycle_device') {
                    if (top< 146) {
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
                }else {
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
        reloadList() {
            this.$emit('reload-list')
        },
        /**
         * 获取数据
         */
         async getTreeList(val) {
            let res = await $api.getPushList();
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
            // 此处即使是多选也只会去推送给第一个人员
            let res = await $api.pushItem(params);
            if(res.code == 200) {
                this.$TisMessage.success(res.msg);
                this.saveTabFieldTips();
                this.reloadList();
            }
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
        },
        handlePage(page) {
            this.page = page;
            this.$emit("handle-page", this.page, this.pageSize)
        },
        handlePageSize(pageSize) {
            this.pageSize = pageSize;
            this.$emit("handle-page", 1, this.pageSize)
        },
        /**
         * 关注设备
         */
        async toFocus(item, type) {
            let data = {
                userId: Cookies.get('uid'),
                deviceId: item.id,
                type: type
            }
            await $api.toFocus(data);
            if(item.isFocus != type) {
                item.isFocus = type;
            }
        },
        pushItemConfrim(item) {
            this.$TisModal.warning({
                title: '推送给设备管理员',
                content: '<p>此操作将会推送给设备录入人，即设备管理员</p>',
                maskClosable: true,
                showCancel: true,
                onOk: async () => {
                    let data = {
                        deviceId: item.id,
                        recordUserId: item.recordUserId,
                    }
                    let res = await $api.pushItemConfrim(data);
                    if(res.code == 200) {
                        this.$TisMessage.success(res.msg)
                        this.saveTabFieldTips();
                        this.reloadList();
                    }
                },
                onCancel: () => {
                }
            });
        }

    }
}
</script>
<style lang="less">
@import './list.less';
</style>