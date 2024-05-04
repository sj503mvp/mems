<template>
    <div class="process-add" :style="{'min-height': `calc(100vh - 117px)`}">
        <div class="process-content-box">
            <tis-form ref="processInfo" :model="processInfo" :rules="processInfoRule" :label-width="100" class="process-info">
                <tis-form-item label="申请标题" prop="processName">
                    <tis-input v-model="processInfo.processName" placeholder="请输入申请标题" style="width: 500px" clearable></tis-input>
                </tis-form-item>
                 <tis-form-item label="申请人">
                    <tis-select v-model="userName" placeholder="请选择申请人" disabled style="width: 300px">
                        <tis-option v-for="item in userList" :key="item.value" :value="item.value" :label="item.label"></tis-option>
                    </tis-select>
                </tis-form-item>
                <tis-form-item label="申请种类" prop="processType">
                    <tis-select v-model="processInfo.processType" placeholder="请选择申请种类" style="width: 300px">
                        <tis-option v-for="item in typeList" :key="item.value" :value="item.value" :label="item.label"></tis-option>
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
export default {
    data() {
        return {
            processInfo: {
                processName: '',
                processContent: '',
                processType: '',
                processTime: '' // 这里时间发布时取，并且将发布人加上
            },
            processInfoRule: {
                processName: [
                    { required: true, message: '请输入公告标题', trigger: 'blur' }
                ],
                processType: [
                    { required: true, message: '请选择申请种类', trigger: 'change' }
                ],
                processContent: [
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
            typeList: [
                {
                    value: '1',
                    label: '购入申请',
                },
                {
                    value: '2',
                    label: '报废申请',
                },
            ],
            // 登录存到状态机里取用
            userName: '1'
        }
    },
    methods: {
        async submit() {
            let validate = await this.$refs.processInfo.validate();
            if(validate) {
                this.processInfo.processTime = new Date();
                let data = this.processInfo;
                data.userName = this.userName;
                console.log(data,'qwe');
            }
        }
    }
}
</script>
<style lang="less">
@import './processAdd.less';
</style>