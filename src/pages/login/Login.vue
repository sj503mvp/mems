<template>
    <div class="login-page">
        <div class="login-body">
            <div class="login-left">
                <div class="login-picture"></div>
            </div>
            <div class="login-right">
                <div class="login-bg">
                    <p class="login-title">欢迎<span v-if="isLogin">登录</span><span v-else>注册</span> <br> Mems金属冶炼设备管理系统</p>
                    <tis-form class="login-form" :model="formValidate" :rules="ruleValidate" ref="loginForm" :key="isLogin">
                        <tis-form-item prop="account">
                            <tis-input placeholder="请输入账号" v-model="formValidate.account"></tis-input>
                        </tis-form-item>
                        <tis-form-item prop="passWord">
                            <tis-input placeholder="请输入密码" type="password" v-model="formValidate.passWord"></tis-input>
                        </tis-form-item>
                        <tis-form-item v-if="!isLogin" prop="confirmPassWord">
                            <tis-input placeholder="请再次输入密码" type="password" v-model="formValidate.confirmPassWord"></tis-input>
                        </tis-form-item>
                        <div class="form-bottom">
                            <tis-button v-if="isLogin" class="login-button" type="primary" @click="handleSubmit('formValidate')">登录</tis-button>
                            <tis-button v-if="!isLogin" class="login-button" type="primary" @click="handleSubmit('formValidate')">注册</tis-button>
                            <span class="login-word" @click="changeIsLogin" v-if="isLogin">没有账号？点击此处注册</span>
                            <span class="login-word" @click="changeIsLogin" v-if="!isLogin">已有账号？点击此处登录</span>
                        </div>
                    </tis-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie'
import $api from '@/api/login/index.js'
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
    watch: {
        isLogin(newVal, oldVal) {
            if(newVal != oldVal) {
                this.formValidate = {
                    account: '',
                    passWord: '',
                    confirmPassWord: '',
                }
            }
        }
    },
    methods: {
        changeIsLogin() {
            this.$refs.loginForm.resetFields();
            setTimeout( ()=> {
                this.isLogin = !this.isLogin;
            },500)
        },
        handleSubmit() {
            this.$refs.loginForm.validate(async (valid) => {
                if (valid) {
                    let data = {
                        uid: this.formValidate.account,
                        passWord: this.formValidate.passWord,
                        confirmPassWord: this.isLogin? this.formValidate.confirmPassWord : '',
                    }
                    if(this.isLogin) {
                        let res = await $api.login(data);
                        if(res.code == 200) {
                            this.$TisMessage.success('登录成功');
                            Cookies.set('username',res.data.username);
                            Cookies.set('uid',res.data.uid);
                            Cookies.set('token',res.data.token);
                            this.$router.push({
                                name: '首页'
                            })
                        }else {
                            this.$TisMessage.error('用户名或密码错误，请核实');
                        }
                    }else {
                        let res = await $api.register(data);
                        if(res.code == 200) {
                            this.$TisMessage.success('注册成功，即将跳转登录页面');
                            this.isLogin = true;
                        }else {
                            this.$TisMessage.error(res.data.msg);
                        }
                    }
                }
            })
        },
    }
}
</script>
<style lang="less">
@import './login.less';
</style>