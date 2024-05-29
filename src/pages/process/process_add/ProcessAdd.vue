<template>
    <div class="process-add" :style="{'min-height': `calc(100vh - 117px)`}">
        <div class="process-content-box">
            <tis-form ref="processInfo" :model="processInfo" :rules="processInfoRule" :label-width="100" class="process-info">
                <tis-form-item label="申请标题" prop="processTitle">
                    <tis-input v-model="processInfo.processTitle" placeholder="请输入申请标题" style="width: 500px" clearable></tis-input>
                </tis-form-item>
                 <tis-form-item label="申请人">
                    <tis-select v-model="userId" placeholder="请选择申请人" disabled style="width: 300px">
                        <tis-option v-for="item in userList" :key="item.id" :value="item.id" :label="item.name"></tis-option>
                    </tis-select>
                </tis-form-item>
                <tis-form-item label="申请种类" prop="processType">
                    <tis-select v-model="processInfo.processType" placeholder="请选择申请种类" style="width: 300px">
                        <tis-option v-for="item in typeList" :key="item.id" :value="item.id" :label="item.name"></tis-option>
                    </tis-select>
                </tis-form-item>
                <tis-form-item label="生产厂家" prop="productor" v-if="processInfo.processType == '1'">
                    <tis-input v-model="processInfo.productor" placeholder="请输入生产厂家" style="width: 500px;" clearable></tis-input>
                </tis-form-item>
                <tis-form-item label="设备名称" prop="deviceName" v-if="processInfo.processType == '1'">
                    <tis-input v-model="processInfo.deviceName" placeholder="请输入设备名称" style="width: 500px;" clearable></tis-input>
                </tis-form-item>
                <tis-form-item label="设备数量" prop="buyCount" v-if="processInfo.processType == '1'">
                    <tis-input v-model="processInfo.buyCount" placeholder="请输入设备数量" style="width: 500px;" clearable type="number"></tis-input>
                </tis-form-item>
                <tis-form-item label="设备单价" prop="buyMoney" v-if="processInfo.processType == '1'">
                    <tis-splicing-input
                        type="company"
                        :unit-select="true"
                        :unit-list="unitList"
                        isClearable
                        input1-placeholder="请输入金额"
                        :default-text1="processInfo.buyMoney"
                        @change-input="changeInput"
                        style="width: 500px">
                    </tis-splicing-input>
                </tis-form-item>
                <tis-form-item label="设备种类" prop="deviceType" v-if="processInfo.processType == '1'">
                    <tis-radio-group v-model="processInfo.deviceType" class="form-radio-class">
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
                <tis-form-item label="报废设备" prop="scrapDevice" v-if="processInfo.processType == '2'">
                    <tis-select v-model="processInfo.scrapDevice" placeholder="请选择报废设备" style="width: 300px;" filterable>
                        <tis-option v-for="item in deviceList" :key="item.id" :value="item.id" :label="`[${item.id}] ` + item.name"></tis-option>
                    </tis-select>
                </tis-form-item>
            </tis-form>
            <tis-button type="primary" class="bottom-button" @click="submit">提交审批</tis-button>
        </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie'
import $notifyApi from '@/api/notify/index.js'
import $api from '@/api/process/index.js'
import $deviceApi from '@/api/device/index.js'
export default {
    data() {
        return {
            processInfo: {
                processTitle: '',
                processType: '1',
                processTime: '',
                productor: '',
                deviceName: '',
                buyCount: '',
                buyMoney: '',
                unitId: '',
                deviceType: '',
                scrapDevice: '',
            },
            processInfoRule: {
                processTitle: [
                    { required: true, message: '请输入公告标题', trigger: 'change' }
                ],
                processType: [
                    { required: true, message: '请选择申请种类', trigger: 'change' }
                ],
                productor: [
                    { required: true, message: '请输入生产厂家', trigger: 'change' }
                ],
                deviceName: [
                    { required: true, message: '请输入设备名称', trigger: 'change' }
                ],
                buyCount: [
                    { required: true, message: '请输入购买数量', trigger: 'change' }
                ],
                buyMoney: [
                    { required: true, message: '请输入金额', trigger: 'blur'}
                ],

            },
            userList: [],
            typeList: [
                {
                    id: '1',
                    name: '购入申请',
                },
                {
                    id: '2',
                    name: '报废申请',
                },
            ],
            unitList: [
                {key: '1', value: '元'},
                {key: '2', value: '美元'},
                {key: '3', value: '日元'},
                {key: '4', value: '法郎'},
            ],
            userId: '',
            deviceList: [],
        }
    },
    created() {
        this.getAllUser();
        this.getDeviceList();
    },
    methods: {
        /**
         * 获得当前存在且非报废的设备
         */
        async getDeviceList() {
            let res = await $deviceApi.getDeviceList();
            if(res.code == 200) {
                this.deviceList = res.data.map(item => {
                    return {
                        id: item.id,
                        name: item.type + '-' + item.name
                    }
                })
            }
        },
        /**
         * 获得所有用户
         */
        async getAllUser() {
            this.userId = Cookies.get('uid');
            let res = await $notifyApi.getAllUser();
            this.userList = res.data.map(item => {
                return {
                    id: `${item.uid}`,
                    name: item.name
                }
            })
        },
        async submit() {
            let validate = await this.$refs.processInfo.validate();
            if(validate) {
                this.processInfo.processTime = this.getTime();
                let data = this.processInfo;
                data.userId = this.userId;
                data.proposer = this.userList.map(item => {
                    if(this.userId == item.id) {
                        return item.name
                    }
                })
                let res = await $api.saveProcess(data);
                if(res.code == 200) {
                    this.$TisMessage.success(` ${res.msg},请等待审批`);
                    this.$refs.processInfo.resetFields();
                }else {
                    this.$TisMessage.error('提交失败，请稍后重试');
                }
            }
        },
        getTime() {
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            month = month< 10 ? '0' + month : month;
            var date = now.getDate();
            date = date < 10 ? '0' + date : date;
            var hours = now.getHours();
            hours = hours < 10 ? '0' + hours : hours;
            var minutes = now.getMinutes();  
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var seconds = now.getSeconds();  
            seconds = seconds < 10 ? '0' + seconds : seconds;
            return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
        },
        changeInput(index, type ,tel) {
            this.processInfo.buyMoney = type
            this.processInfo.unitId= tel
        },
    }
}
</script>
<style lang="less">
@import './processAdd.less';
</style>