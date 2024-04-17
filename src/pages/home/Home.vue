<template>
    <div class="main">
        <!-- 头部导航栏 -->
        <header-menu></header-menu>
        <!-- 左侧菜单栏 -->
        <div class="sidebar-menu-con">
            <sidebarMenu :menu-array="menuArray"></sidebarMenu>
        </div>
        <div class="single-page-con">
            <div class="single-page">
                <router-view ref="view"></router-view>
                <!-- <water-mark ref="waterMark"></water-mark> -->
            </div>
            <common-footer @item-detail-move="itemDetailMove"></common-footer>
        </div>
    </div>
</template>
<script>
import menuArray from '@/static_data/menu_array.js'
import headerMenu from './business/HeaderMenu.vue'
import sidebarMenu from './business/SidebarMenu.vue'
import RouterView from '../../components/common/router_view/RouterView.vue'
import CommonFooter from './business/CommonFooter.vue';
export default {
    components: {
        headerMenu,
        sidebarMenu,
        RouterView,
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
    }
}
</script>
<style lang="less" scoped>
@import './main.less';
</style>