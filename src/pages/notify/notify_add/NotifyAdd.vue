<template>
    <div class="notify-add" :style="{'min-height': `calc(100vh - 117px)`}">
        <div class="nofity-content-box">
            <tis-form ref="notify-info" :model="notifyInfo" :rules="notifyInfoRule" :label-width="100" class="notify-info">
                <tis-form-item label="公告标题" prop="notifyName">
                    <tis-input v-model="notifyInfo.notifyName" placeholder="请输入公告标题" style="width: 500px" clearable></tis-input>
                </tis-form-item>
                 <tis-form-item label="发布人">
                    <tis-select v-model="userName" placeholder="请选择发布人" disabled style="width: 300px">
                        <tis-option v-for="item in userList" :key="item.value" :value="item.value" :label="item.label"></tis-option>
                    </tis-select>
                </tis-form-item>
                <tis-form-item label="紧急程度" prop="notifyStatus">
                    <tis-select v-model="notifyInfo.notifyStatus" placeholder="请选择紧急程度" style="width: 300px">
                        <tis-option v-for="item in statusList" :key="item.value" :value="item.value" :label="item.label"></tis-option>
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
export default {
    data() {
        return {
            notifyInfo: {
                notifyName: '',
                notifyContent: '',
                notifyTime: '' // 这里时间发布时取，并且将发布人加上
            },
            notifyInfoRule: {
                notifyName: [
                    { required: true, message: '请输入公告标题', trigger: 'blur' }
                ],
                notifyStatus: [
                    { required: true, message: '请选择紧急程度', trigger: 'change' }
                ],
                notifyContent: [
                { required: true, message: '请输入公告内容', trigger: 'blur' }
                ]
            },
            // 后端获取人员id列表
            userList: [
                {
                    value: '1',
                    label: '当前用户名'
                },
                {
                    value: '2',
                    label: '其他用户名'
                },
            ],
            statusList: [
                {
                    value: '1',
                    label: '普通',
                },
                {
                    value: '2',
                    label: '紧急',
                },
                {
                    value: '3',
                    label: '非常紧急',
                },
            ],
            // 登录存到状态机里取用
            userName: '1'
        }
    },
    methods: {
        submit() {
            this.notifyInfo.notifyTime = new Date();
            let data = this.notifyInfo;
            data.userName = this.userName;
            console.log(data,'qwe');
        }
    }
}
</script>
<style lang="less">
@import './notifyAdd.less';
</style>