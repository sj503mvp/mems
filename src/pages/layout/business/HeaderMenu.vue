<template>
    <div class="main-header">
        <div class="header-menu">
            <div class="header-logo">
                <a href="Mems"><img src="../../../assets/common/xnlogo.png"></a>
                <div class="menu-icon">
                    <tis-icon type="ios-menu" size="20" color="#f8f8f8"/><tis-icon ></tis-icon>
                </div>
            </div>
            <div class="header-middle">
                <tis-input class="header-search" prefix="ios-search" placeholder="输入内容后搜索"></tis-input>
            </div>
            <div class="header-avatar-con">
                <ul>
                    <li v-for="(item, index) in headerRight" :key="index">
                        <tis-icon :type=item.type style="margin-right: 8px" size="24"></tis-icon>
                        <span>{{item.title}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
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
    methods: {
        clickUser() {
            this.userClick = !this.userClick
        },
        logOut() {
            console.log('点击退出，待后续登录页写完跳转到登录页');
        },
    }
}
</script>
<style lang="less">
@import './headerMenu.less';
</style>