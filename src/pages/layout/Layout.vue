<template>
    <div class="main">
        <!-- 头部导航栏 -->
        <header-menu></header-menu>
        <!-- 左侧菜单栏 -->
        <div class="sidebar-menu-con">
            <sidebarMenu :menu-array="menuArray" @on-change="handleChange"></sidebarMenu>
        </div>
        <div class="single-page-con" ref="pageBody">
            <div class="single-page">
                <router-view ref="view"></router-view>
                <!-- <water-mark ref="waterMark"></water-mark> -->
            </div>
            <common-footer></common-footer>
        </div>
    </div>
</template>
<script>
import menuArray from '@/static_data/menu_array.js'
import headerMenu from './business/HeaderMenu.vue'
import sidebarMenu from './business/SidebarMenu.vue'
import CommonFooter from './business/CommonFooter.vue';
export default {
    components: {
        headerMenu,
        sidebarMenu,
        CommonFooter
    },
    data() {
        return {
            menuArray: menuArray, //左侧列表
            isRetract: false,      
        }
    },
    methods: {
        // 侧边栏展开收起
        changeMenuStatus() {
            this.isRetract = !this.isRetract;
        },
        handleChange(menuItem) {
            if(menuItem.goUrlLocation) {
                window.location.href = menuItem.url;
                return
            }
            if(menuItem.name){
                this.$router.push({
                    name: menuItem.name
                });
            }
        }
    }
}
</script>
<style lang="less" scoped>
@import './main.less';
</style>