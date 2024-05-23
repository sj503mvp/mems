<template>
    <div class="device-add">
        <div class="device-content-box">
            <div class="device-add-content" id="base-info">
                <p class="device-add-top">{{ type }}设备录入</p>
                <div class="device-base-info">
                    <p class="device-info-title">设备信息</p>
                    <tis-form ref="baseInfo" :model="baseInfo" :rules="baseInfoRule" :label-width="100" class="base-info">
                        <tis-form-item label="设备名称" prop="name">
                            <tis-input v-model="baseInfo.name" placeholder="设备名称" style="width: 500px" clearable></tis-input>
                        </tis-form-item>
                        <tis-form-item label="设备种类">
                            <tis-radio-group v-model="baseInfo.typeId" class="form-radio-class">
                                <tis-radio label="1">
                                    <span>冶炼设备</span>
                                </tis-radio>
                                <tis-radio label="2">
                                    <span>连铸设备</span>
                                </tis-radio>
                                <tis-radio label="3">
                                    <span>轧制设备</span>
                                </tis-radio>
                                <tis-radio label="4">
                                    <span>后步精整设备</span>
                                </tis-radio>
                                <tis-radio label="5">
                                    <span>辅助设备</span>
                                </tis-radio>
                            </tis-radio-group>
                        </tis-form-item>
                        <tis-form-item label="录入人" prop="recordUserId">
                            <tis-select v-model="baseInfo.recordUserId" filterable clearable style="width: 500px">
                                <tis-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id"></tis-option>
                            </tis-select>
                        </tis-form-item>
                        <tis-form-item label="购入金额" prop="buyMoney">
                            <tis-splicing-input
                                type="company"
                                :unit-select="true"
                                :unit-list="unitList"
                                isClearable
                                input1-placeholder="请输入金额"
                                :default-text1="baseInfo.buyMoney"
                                @change-input="changeInput"
                                style="width: 500px">
                            </tis-splicing-input>
                        </tis-form-item>
                        <tis-form-item label="购入时间" prop="buyTime">
                            <tis-date-picker type="date" placeholder="购入时间" :value="baseInfo.buyTime" style="width: 500px" @on-change="dateChange"></tis-date-picker>
                        </tis-form-item>
                        <tis-form-item label="生产厂家">
                            <tis-input v-model="baseInfo.productor" placeholder="请输入生产产家" style="width: 500px" clearable></tis-input>
                        </tis-form-item>
                        <tis-form-item label="所属厂区">
                            <tis-select v-model="baseInfo.ownFactoryId" filterable clearable style="width: 500px">
                                <tis-option v-for="item in factoryList" :key="item.id" :label="item.name" :value="item.id"></tis-option>
                            </tis-select>
                        </tis-form-item>
                        <tis-form-item label="设备介绍">
                            <tis-input type="textarea" v-model="baseInfo.introduce" placeholder="设备介绍" :autosize="{}" show-word-limit maxlength="200"></tis-input>
                        </tis-form-item>
                    </tis-form>
                </div>
            </div>
            <div class="device-add-content" id="other-info">
                <div class="device-other-info">
                    <p class="device-info-title">其他信息</p>
                    <tis-form :label-width="100" class="base-info">
                        <tis-form-item label="来源渠道">
                            <tis-radio-group v-model="baseInfo.sourceId" class="form-radio-class">
                                <tis-radio label="1">
                                    <span>制造商直接采购</span>
                                </tis-radio>
                                <tis-radio label="2">
                                    <span>经销商采购</span>
                                </tis-radio>
                                <tis-radio label="3">
                                    <span>二手设备市场</span>
                                </tis-radio>
                                <tis-radio label="4">
                                    <span>国际合作与进口</span>
                                </tis-radio>
                                <tis-radio label="5">
                                    <span>自主研发与制造</span>
                                </tis-radio>
                            </tis-radio-group>
                        </tis-form-item>
                    </tis-form>
                </div>
            </div>
            <div class="item-add-anchor">
                <tis-anchor :scroll-offset="scrollOffset" show-ink  ref="anchorBox" @on-select="addSelectNum">
                    <tis-anchor-link :class="{'validate-error':!validateStatus}" href="#base-info" title="设备信息"></tis-anchor-link>
                    <tis-anchor-link href="#other-info" title="其他信息"></tis-anchor-link>
                </tis-anchor>
            </div>
        </div>
        <div class="item-add-footer" :style="{'bottom':bottom+'px'}">
            <div class="item-footer-box">
                <div class="item-footer-left">
                    <tis-button type="primary" class="create-btn btn-sub" @click="submit" :loading="submitLoading">保存</tis-button>
                    <tis-button type="default" class="create-btn btn-sub" @click="cancel">取消</tis-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie'
import $api from '@/api/device/index.js'
export default {
    data() {
        return {
            baseInfo: {
                name: '',
                typeId: '',
                recordUserId: '',
                buyMoney: '',
                unitId: '',
                buyTime: '',
                productor: '',
                ownFactoryId: '',
                introduce: '',
                sourceId: '',
            },
            baseInfoRule: {
                name: [
                    { required: true, message: '请输入设备名称', trigger: 'blur' }
                ],
                recordUserId: [
                    { required: true, message: '请选择录入人', trigger: 'change' }
                ],
                buyMoney: [
                    { required: true, message: '请输入金额', trigger: 'blur'}
                ],
                buyTime: [
                    { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
                ],
            },
            userList: [],
            unitList: [
                {key: '1', value: '元'},
                {key: '2', value: '美元'},
                {key: '3', value: '日元'},
                {key: '4', value: '法郎'},
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
            bottom: 0,
            selectNumber: 0, // 获取锚点点击次数
            validateStatus: true,
            submitLoading: false,
            scrollOffset: 0,
        }
    },
    computed: {
        type() {
            if(this.$route.name == 'device_one') {
                this.baseInfo.typeId = '1';
                return '冶炼';
            }else if(this.$route.name == 'device_two') {
                this.baseInfo.typeId = '2';
                return '连铸';
            }else if(this.$route.name == 'device_three') {
                this.baseInfo.typeId = '3';
                return '轧制';
            }else if(this.$route.name == 'device_four') {
                this.baseInfo.typeId = '4';
                return '后步精整';
            }else {
                this.baseInfo.typeId = '5';
                return '辅助';
            }
        }
    },
    mounted() {
        let that = this;
        this.$on('scrollToFirst',function (msg) {
            that.scrollToFirst();
        })
        document.addEventListener('scroll',this.loadImg,false)
        this.getAllUser();
    },
    methods: {
        /**
         * 获得所有用户
         */
        async getAllUser() {
            this.baseInfo.recordUserId = Cookies.get('uid');
            let res = await $api.getAllUserList();
            this.userList = res.data.map(item => {
                return {
                    id: `${item.uid}`,
                    name: item.name,
                }
            })
        },

        /**
         * 触底滚动条监听位置
         */
        addSelectNum(){
            this.selectNumber++
        },
        /**
         * 触底滚动条监听位置
         */
        loadImg(event){
            this.$nextTick(()=>{
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop // 滚动条距离顶部的距离
                let windowHeight = document.documentElement.clientHeight || document.body.clientHeight // 可视区的高度
                let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight //dom元素的高度，包含溢出不可见的内容
                let temp = this.bottom
                let bottom = (scrollTop + windowHeight - scrollHeight) + 52
                bottom = bottom < 0 ? 0 : bottom
                if (bottom - temp <= 52) {
                    this.bottom = bottom
                }
            })
        },
        /**
         * 点击返回第一个选项
         */
        scrollToFirst(){
            if(this.$refs.anchorBox) {
                this.$refs.anchorBox.currentId = 'card-info';
                this.$refs.anchorBox.currentLink = '#card-info';
                this.$refs.anchorBox.handleScrollTo();
                // 281行有个10秒延迟，上面代码会先执行，故加个大于10秒的延迟
                setTimeout(() => {
                    this.$refs.anchorBox.currentLink = '#card-info';
                    this.$refs.anchorBox.handleScrollTo();
                }, 15)
            }
        },
        /**
         * 提交表单
         */
        async submit() {
            this.submitLoading = true;
            // 验证表单
            let validate = await this.$refs.baseInfo.validate();
            if(!validate) {
                this.validateStatus = false;
                this.$TisMessage.error('请完善信息');
                this.submitLoading = false;
                return false;
            }else {
                this.validateStatus = true;
                let data = this.baseInfo;
                let res = await $api.saveDeviceInfo(data);
                if(res.code == 200) {
                    this.$TisMessage.success(res.msg);
                    this.$refs.baseInfo.resetFields();
                    this.$router.push({
                        name: 'all_device_all'
                    })
                }else {
                    this.$TisMessage.error('保存失败，请稍后再试');
                }
                this.submitLoading = false;

            }
        },
        /**
         * 取消
         */
        cancel() {
            this.$router.push({
                name: '首页'
            })
        },
        changeInput(index, type ,tel) {
            this.baseInfo.buyMoney = type
            this.baseInfo.unitId= tel
        },
        /**
         * 日期改变
         * @param {Array} date 选择的日期
        */
        dateChange(date) {
            this.baseInfo.buyTime = date;
        },
    }
}
</script>
<style lang="less">
@import './deviceAdd.less';
</style>