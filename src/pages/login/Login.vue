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
                        <tis-form-item prop="username">
                            <tis-input placeholder="请输入账号" v-model="formValidate.username"></tis-input>
                        </tis-form-item>
                        <tis-form-item prop="password">
                            <tis-input placeholder="请输入密码" type="password" v-model="formValidate.password"></tis-input>
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
import Cookies from 'js-cookie';
import $api from '@/api/login/index.js';
import { createNamespacedHelpers } from 'vuex';
const userUid = createNamespacedHelpers('userUid');
export default {
    data() {
        var reconfirm = (rule, value, callback) => {
            if(value === '') {
                callback(new Error('请输入确认密码'))
            }else if(value !== this.formValidate.password) {
                callback(new Error('两次密码不一致'))
            }else {
                callback();
            }
        }
        return {
            isLogin: true,
            formValidate: {
                username: '',
                password: '',
                confirmPassWord: '',
            },
            ruleValidate: {
                username: [
                    {
                        required: true, message: '用户名不能为空', trigger: 'blur',
                    },
                ],
                password: [
                    {
                        required: true, message: '请输入密码', trigger: 'blur',
                    },
                ],
                confirmPassWord: [
                    {
                        required: true, validator: reconfirm, trigger: 'blur',
                    },
                ]
            },
        }
    },
    computed: {
        ...userUid.mapGetters(['uid']),
    },
    watch: {
        isLogin(newVal, oldVal) {
            if(newVal != oldVal) {
                this.formValidate = {
                    username: '',
                    password: '',
                    confirmPassWord: '',
                }
            }
        },
        formValidate: {  
            handler(newVal) { 
                this.formValidate.username = newVal.username.replace(/\s/g, '');  
                this.formValidate.password = newVal.password.replace(/\s/g, '');  
                if (!this.isLogin) {  
                    this.formValidate.confirmPassWord = newVal.confirmPassWord.replace(/\s/g, '');  
                }  
            },  
            deep: true, 
            immediate: true  
        },  
    },
    methods: {
        ...userUid.mapActions([
            'getUserUid'
        ]),
        changeIsLogin() {
            this.$refs.loginForm.resetFields();
            setTimeout( ()=> {
                this.isLogin = !this.isLogin;
            },500)
        },
        // 没有区分用户名和密码的大小写，即大小写都可以登录成功
        handleSubmit() {
            this.$refs.loginForm.validate(async (valid) => {
                if (valid) {
                    let data = {
                        username: this.formValidate.username,
                        password: this.formValidate.password,
                        confirmPassWord: !this.isLogin? this.formValidate.confirmPassWord : '',
                    }
                    if(this.isLogin) {
                        let res = await $api.login(data);
                        let params = {
                            uid: res.uid
                        }
                        if(res.code == 200) {
                            let userRes = await $api.getUserName(params);
                            this.$TisMessage.success('登录成功');
                            Cookies.set('uid',res.uid);
                            Cookies.set('username',userRes.data)
                            Cookies.set('token',res.token);
                            this.getUserUid();
                            let loginParams = {
                                username: Cookies.get('username'),
                                loginTime: this.getTime(),
                                loginBrower: this.getBrower(),
                            }
                            await $api.saveLoginData(loginParams);
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
                            setTimeout(()=>{
                                this.isLogin = true;
                            }, 500);
                        }else {
                            this.$TisMessage.error(res.msg);
                        }
                    }
                }
            })
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
        getBrower() {
            let userAgent = navigator.userAgent;
            if(userAgent.indexOf("opera") > -1) {
                return "Opera";
            }
            if(userAgent.indexOf("Edg") > -1) {
                return "Edge";
            }
            if(userAgent.indexOf("Firefox") > -1) {
                return "firefox";
            }
            if(userAgent.indexOf("Chrome") > -1) {
                return "Chrome";
            }
            if(userAgent.indexOf("Safari") > -1) {
                return "Safari";
            }
            if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
                return "IE";
            }
            if ( userAgent.indexOf("Trident") > -1){
                return "IE";
            }
        }
    }
}
</script>
<style lang="less">
@import './login.less';
</style>