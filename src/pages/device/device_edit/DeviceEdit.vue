<template>
    <div class="device-add">
        <div class="device-content-box">
            <div class="device-add-content" id="base-info">
                <p class="device-add-top">{{ type }}设备编辑</p>
                <div class="device-base-info">
                    <p class="device-info-title">设备信息</p>
                    <tis-form ref="deviceData" :model="deviceData" :rules="deviceDataRule" :label-width="100" class="base-info">
                        <tis-form-item label="设备名称" prop="deviceName">
                            <tis-input v-model="deviceData.deviceName" placeholder="设备名称" style="width: 500px" clearable></tis-input>
                        </tis-form-item>
                        <tis-form-item label="设备种类">
                            <tis-radio-group v-model="deviceData.type" class="form-radio-class">
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
                        <tis-form-item label="录入人" prop="deviceManager">
                            <tis-select v-model="deviceData.deviceManager" filterable clearable style="width: 500px" disabled>
                                <tis-option v-for="item in managerList" :key="item.id" :label="item.name" :value="item.id"></tis-option>
                            </tis-select>
                        </tis-form-item>
                        <tis-form-item label="购入金额" prop="deviceMoney">
                            <tis-splicing-input
                                type="company"
                                :unit-select="true"
                                :unit-list="unitList"
                                isClearable
                                input1-placeholder="请输入金额"
                                :default-text1="deviceData.deviceMoney"
                                @change-input="changeInput"
                                style="width: 500px">
                            </tis-splicing-input>
                        </tis-form-item>
                        <tis-form-item label="购入时间" prop="deviceTime">
                            <tis-date-picker type="date" placeholder="购入时间" :value="deviceData.deviceTime" style="width: 500px" @on-change="dateChange" disabled></tis-date-picker>
                        </tis-form-item>
                        <tis-form-item label="生产厂家">
                            <tis-input v-model="deviceData.deviceCreater" placeholder="请输入生产产家" style="width: 500px" clearable></tis-input>
                        </tis-form-item>
                        <tis-form-item label="设备介绍">
                            <tis-input type="textarea" v-model="deviceData.deviceDesc" placeholder="设备介绍" :autosize="{}" show-word-limit maxlength="200"></tis-input>
                        </tis-form-item>
                    </tis-form>
                </div>
            </div>
            <div class="device-add-content" id="other-info">
                <div class="device-other-info">
                    <p class="device-info-title">其他信息</p>
                    <tis-form :label-width="100" class="base-info">
                        <tis-form-item label="来源渠道">
                            <tis-radio-group v-model="deviceData.source" class="form-radio-class">
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
export default {
    data() {
        return {
            deviceData: {},
            deviceDataRule: {
                deviceName: [
                    { required: true, message: '请输入设备名称', trigger: 'blur' }
                ],
                deviceManager: [
                    { required: true, message: '请选择录入人', trigger: 'change' }
                ],
                deviceMoney: [
                    { required: true, message: '请输入金额', trigger: 'blur'}
                ],
                deviceTime: [
                    { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
                ],
            },
            managerList: [
                {
                    id: '1',
                    name: '设备管理人1号'
                },
                {
                    id: '2',
                    name: '设备管理人2号'
                },
                {
                    id: '3',
                    name: '设备管理人3号'
                },
            ],
            unitList: [
                {key: '1', value: '元'},
                {key: '2', value: '美元'},
                {key: '3', value: '日元'},
                {key: '4', value: '法郎'},
            ],
            bottom: 0,
            selectNumber: 0, // 获取锚点点击次数
            validateStatus: true,
            submitLoading: false,
            scrollOffset: 0
        }
    },
    computed: {
        type() {
            if(this.deviceData.type = '1') {
                return '冶炼';
            }else if(this.deviceData.type = '2') {
                return '连铸';
            }else if(this.deviceData.type = '3') {
                return '轧制';
            }else if(this.deviceData.type = '4') {
                return '后步精整';
            }else {
                return '辅助';
            }
        }
    },
    mounted() {
        // let res = $api. (this.$route.params.device_id)
        let res = {
            deviceNumber: 'YL-1',
            deviceId: '1',
            deviceName: '冶炼设备一号',
            status: '异常',
            deviceTime: '2021-03-26',
            ownFactory: '华东冶炼一厂',
            type: '1',
            deviceManager: '1',
            deviceMoney: '15000',
            typeName: '冶炼设备',
            lastFitTime: '2023-04-12',
            deviceCreater: '有限制造公司',
            deviceDesc: '设备介绍',
            source: '2',
            isFocus: true,
        }
        this.deviceData = res;
        let that = this;
        this.$on('scrollToFirst',function (msg) {
            that.scrollToFirst();
        })
        document.addEventListener('scroll',this.loadImg,false)
    },
    methods: {
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
            let validate = await this.$refs.deviceData.validate();
            if(!validate) {
                this.validateStatus = false;
                this.$TisMessage.error('请完善信息');
                this.submitLoading = false;
                return false;
            }else {
                this.validateStatus = true;
                let data = this.deviceData;
                // let res = await $api. ()
                this.$TisMessage.success('保存成功');
                this.submitLoading = false;
                this.$refs.deviceData.resetFields();
                this.$router.push({
                    name: '首页'
                })
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
            this.deviceData.deviceMoney = type
            this.deviceData.unit= tel
        },
        /**
         * 日期改变
         * @param {Array} date 选择的日期
        */
        dateChange(date) {
            this.deviceData.deviceTime = date;
        },
    }
}
</script>
<style lang="less">
@import './deviceEdit.less';
</style>