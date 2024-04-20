<template>
    <div class="login-page">
        <div class="login-body">
            <div class="login-left">
                <div class="login-picture"></div>
            </div>
            <div class="login-right">
                <div class="login-bg">
                    <p class="login-title">欢迎<span v-if="isLogin">登录</span><span v-else>注册</span> <br> Mems金属冶炼设备管理系统</p>
                    <tis-form class="login-form" :rules="ruleValidate">
                        <tis-form-item prop="account">
                            <tis-input placeholder="请输入账号" v-model="formValidate.account"></tis-input>{{formValidate}}
                        </tis-form-item>
                        <tis-form-item prop="passWord">
                            <tis-input placeholder="请输入密码" v-model="formValidate.passWord"></tis-input>
                        </tis-form-item>
                        <tis-form-item v-if="!isLogin" prop="confirmPassWord">
                            <tis-input placeholder="请再次输入密码" v-model="formValidate.confirmPassWord"></tis-input>
                        </tis-form-item>
                        <div class="form-bottom">
                            <tis-button v-if="isLogin" class="login-button" type="primary" @click="handleSubmit('formValidate')">登录</tis-button>
                            <tis-button v-if="!isLogin" class="login-button" type="primary" @click="handleSubmit('formValidate')">注册</tis-button>
                            <span class="login-word" @click="isLogin=false" v-if="isLogin">没有账号？点击此处注册</span>
                            <span class="login-word" @click="isLogin=true" v-if="!isLogin">已有账号？点击此处登录</span>
                        </div>
                    </tis-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isLogin: true,
            formValidate: {
                account: '',
                passWord: '',
                confirmPassWord: '',
            },
            ruleValidate: {
                account: [
                    {
                        required: true, message: '用户名不能为空', trigger: 'blur',
                    },
                ],
                passWord: [
                    {
                        required: true, message: '密码不能为空', trigger: 'blur',
                    },
                ],
                confirmPassWord: [
                    {
                        required: true, message: '确认密码不能为空', trigger: 'blur',
                    },
                ]
            }
        }
    },
    mounted: {
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('登录成功!');
                } else {
                    this.$Message.error('登录失败!');
                }
            })
            this.$nextTick(() => {
                let isError = document.getElementsByClassName('itis-form-item-error')
                isError[0].querySelector('input').focus()  // 只定位到第一个必填项位置
            })
        },
    }
}
</script>
<style lang="less">
@import './login.less';
</style>