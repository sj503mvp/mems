<template>
    <div class="main-header">
        <div class="header-menu">
            <div class="header-logo">
                <a href="Mems"><img src="../../../assets/common/logo.png"></a>
                <div class="menu-icon" @click=retract>
                    <tis-icon type="ios-menu" size="20" color="#f8f8f8"/><tis-icon ></tis-icon>
                </div>
            </div>
            <div class="header-middle">
                <tis-input class="header-search" prefix="ios-search" placeholder="输入内容后搜索"></tis-input>
            </div>
            <div class="header-avatar-con">
                <ul>
                    <li v-for="(item, index) in headerRight" :key="index" :class="item.title=='退出'? 'header-logout' : ''">
                        <tis-icon :type=item.type style="margin-right: 8px" size="24"></tis-icon>
                        <span>{{item.title}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
    data() {
        return {
            userClick: false,
            headerRight: [
                {
                    type: 'ios-contact',
                    title: '当前用户名',
                },
                {
                    type:'ios-megaphone-outline',
                    title: '消息中心',
                },
                {
                    type: 'ios-log-out',
                    title: '退出'
                }
            ]
        }
    },
    mounted() {
        let logout = document.querySelector('.header-logout');
        logout.addEventListener('click', this.logOut)
    },
    methods: {
        clickUser() {
            this.userClick = !this.userClick
        },
        logOut() {
            this.$router.push({
                name: 'login_index'
            })
            Cookies.remove('username');
            Cookies.remove('uid');
            Cookies.remove('token');
        },
        retract() {
            this.$emit('shrink-menu')
        }
    }
}
</script>
<style lang="less">
@import './headerMenu.less';
</style>