<template>
    <div class="main-header">
        <div class="header-menu">
            <div class="header-logo">
                <a @click="goHome"><img src="../../../assets/common/logo.png"></a>
                <div class="menu-icon" @click=retract>
                    <tis-icon type="ios-menu" size="20" color="#f8f8f8"/><tis-icon ></tis-icon>
                </div>
            </div>
            <div class="header-middle">
                <tis-input class="header-search" prefix="ios-search" placeholder="输入内容后搜索" clearable></tis-input>
            </div>
            <div class="header-avatar-con">
                <div class="header-user" @click="toUser" style="height: 50px; display: flex; margin-right: 16px;">
                    <tis-icon type='ios-contact' style="margin-right: 8px" size="24"></tis-icon>
                    <span>{{ userName? userName : '暂无，点击编辑' }}</span>
                </div>
                <div class="header-dropdown" style="height: 50px; display: flex; margin-right: 16px;">
                    <tis-icon type='ios-megaphone-outline' style="margin-right: 8px" size="24"></tis-icon>
                    <tis-badge :count="infoNumber"><span style="display: inline-block;">公告</span></tis-badge>
                    <div class="dropdown-box">
                        <div v-for="item in infoList" :key="item.id" class="dropdown-info-box" @click="toNoticeDetail(item)">
                            <div class="info-top">
                                <p class="info-title">{{ item.title }}</p>
                                <p>{{ item.time }}</p>
                            </div>
                            <div class="info-bottom" v-title>{{ item.content }}</div>
                        </div>
                        <tis-button style="width: 100%;" type="primary" class="header-button" @click="toAllNotice">查看全部未查看通知</tis-button>
                    </div>  
                </div>
                <div class="header-logout" @click="logOut" style="height: 50px; display: flex; margin-right: 16px;">
                    <tis-icon type='ios-log-out' style="margin-right: 8px" size="24"></tis-icon>
                    <span>退出</span>    
                </div>
            </div>
            <tis-modal class="modal-height" v-model="modal" @on-ok="ok" @on-cancel="cancel" title="确认退出">
                <p>确定要退出系统吗？</p>
            </tis-modal>
        </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie'
import $api from '@/api/layout/index.js'
export default {
    data() {
        return {
            modal: false,
            infoList: [],
            infoNumber: 0,
            userName: '',
        }
    },
    mounted() {
        this.getUserInfo();
        this.getNoticeInfo();
    },
    methods: {
        async getNoticeInfo() {
            let params = {
                uid: Cookies.get('uid')
            }
            let res = await $api.getNoticeInfo(params);
            if(res.code == 200) {
                this.infoNumber = parseInt(res.data.count);
                this.infoList = res.data.list;
                if(this.infoList.length > 3) {
                    this.infoList = this.infoList.slice(0,3)
                }
            }
        },
        async getUserInfo() {
            let params = {
                uid: Cookies.get('uid'),
            }
            let res = await $api.getUserInfo(params);
            this.userName = res.name;
        },
        toUser() {
            this.$router.push({
                name: 'userInfo'
            })
        },
        logOut() {
            this.modal = true
        },
        ok() {
            this.modal = false;
            this.$TisMessage.success('退出成功，即将前往登录页')
            setTimeout(() => {
                this.$router.push({
                    name: 'login_index'
                })
                Cookies.remove('username');
                Cookies.remove('uid');
                Cookies.remove('token');
            },1000)
        },
        cancel() {
            this.modal = false;
        },
        retract() {
            this.$emit('shrink-menu')
        },
        goHome() {
            this.$router.push({
                name: '首页'
            })
            this.$emit('go-home')
        },
        toNoticeDetail(item) {
            this.$router.push({
                
            })
        },
        toAllNotice() {
            this.$router.push({
                name: 'notify_unread'
            })
        }
    }
}
</script>
<style lang="less">
@import './headerMenu.less';
</style>