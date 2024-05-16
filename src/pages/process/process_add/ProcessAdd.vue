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
                <tis-form-item label="申请内容" prop="processContent">
                    <tis-input v-model="processInfo.processContent" placeholder="请输入内容" style="width: 500px" type="textarea" maxlength="200" show-word-limit></tis-input>
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
export default {
    data() {
        return {
            processInfo: {
                processTitle: '',
                processContent: '',
                processType: '1',
                processTime: ''
            },
            processInfoRule: {
                processTitle: [
                    { required: true, message: '请输入公告标题', trigger: 'change' }
                ],
                processType: [
                    { required: true, message: '请选择申请种类', trigger: 'change' }
                ],
                processContent: [
                    { required: true, message: '请输入公告内容', trigger: 'change' }
                ]
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
            userId: '',
        }
    },
    created() {
        this.getAllUser();
    },
    methods: {
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
        }
    }
}
</script>
<style lang="less">
@import './processAdd.less';
</style>