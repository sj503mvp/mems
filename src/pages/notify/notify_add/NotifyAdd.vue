<template>
    <div class="notify-add" :style="{'min-height': `calc(100vh - 117px)`}">
        <div class="notify-content-box">
            <tis-form ref="notifyInfo" :model="notifyInfo" :rules="notifyInfoRule" :label-width="100" class="notify-info">
                <tis-form-item label="公告标题" prop="notifyTitle">
                    <tis-input v-model="notifyInfo.notifyTitle" placeholder="请输入公告标题" style="width: 500px" clearable></tis-input>
                </tis-form-item>
                 <tis-form-item label="发布人">
                    <tis-select v-model="userId" placeholder="请选择发布人" disabled style="width: 300px">
                        <tis-option v-for="item in userList" :key="item.id" :value="item.id" :label="item.name"></tis-option>
                    </tis-select>
                </tis-form-item>
                <tis-form-item label="紧急程度" prop="notifyStatus">
                    <tis-select v-model="notifyInfo.notifyStatus" placeholder="请选择紧急程度" style="width: 300px">
                        <tis-option v-for="item in statusList" :key="item.id" :value="item.id" :label="item.name"></tis-option>
                    </tis-select>
                </tis-form-item>
                <tis-form-item label="发布内容" prop="notifyContent">
                    <tis-input v-model="notifyInfo.notifyContent" placeholder="请输入内容" style="width: 500px" type="textarea" maxlength="200" show-word-limit></tis-input>
                </tis-form-item>
            </tis-form>
            <tis-button type="primary" class="bottom-button" @click="submit">提交审批</tis-button>
        </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie'
import $api from '@/api/notify/index.js'
export default {
    data() {
        return {
            notifyInfo: {
                notifyTitle: '',
                notifyContent: '',
                notifyStatus: '1',
                notifyTime: ''
            },
            notifyInfoRule: {
                notifyTitle: [
                    { required: true, message: '请输入公告标题', trigger: 'change' }
                ],
                notifyStatus: [
                    { required: true, message: '请选择紧急程度', trigger: 'change' }
                ],
                notifyContent: [
                    { required: true, message: '请输入公告内容', trigger: 'change' }
                ]
            },
            userList: [],
            statusList: [
                {
                    id: '1',
                    name: '普通',
                },
                {
                    id: '2',
                    name: '紧急',
                },
                {
                    id: '3',
                    name: '非常紧急',
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
            let res = await $api.getAllUser();
            this.userList = res.data.map(item => {
                return {
                    id: `${item.uid}`,
                    name: item.name,
                }
            })
        },
        async submit() {
            let validate = await this.$refs.notifyInfo.validate();
            if(validate) {
                this.notifyInfo.notifyTime = this.getTime();
                let data = this.notifyInfo;
                data.userId = this.userId;
                data.publisher = this.userList.map(item => {
                    if(this.userId == item.id) {
                        return item.name
                    }
                })
                let res = await $api.saveNotify(data);
                if(res.code == 200) {
                    this.$TisMessage.success(` ${res.msg},请等待审批`);
                    this.$refs.notifyInfo.resetFields();
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
@import './notifyAdd.less';
</style>