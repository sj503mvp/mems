<template>
    <div class="main">
        <!-- 头部导航栏 -->
        <header-menu @shrink-menu="retractMenu"></header-menu>
        <!-- 左侧菜单栏 -->
        <div class="sidebar-menu-con" :style="{width: shrink?'64px':'220px', overflow: shrink ? 'visible' : 'auto'}" v-if="hideLeftMenuArr.indexOf($route.name) === -1">
            <sidebarMenu v-show="!shrink" :menu-array="menuArray" @on-change="handleChange"></sidebarMenu>
            <sidebar-menu-shrink v-show="shrink" :menu-array="menuArray" @on-change="handleChange"></sidebar-menu-shrink>
        </div>
        <div class="single-page-con" ref="pageBody"
            :style="{minWidth: contentBoxArr.indexOf($route.name) != -1? '1440px':'1200px',
            marginLeft:contentBoxArr.indexOf($route.name) != -1? '0px':shrink?'60px':'220px'}">
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
import sidebarMenuShrink from './business/SidebarMenuShrink.vue'
import CommonFooter from './business/CommonFooter.vue';
export default {
    components: {
        headerMenu,
        sidebarMenu,
        CommonFooter,
        sidebarMenuShrink
    },
    data() {
        return {
            menuArray: menuArray, //左侧列表
            isRetract: false,
            shrink: false,
            hideLeftMenuArr: [
                'device_one',
                'device_two',
                'device_three',
                'device_four',
                'device_five',
                'device_detail'
            ],
            contentBoxArr: [
            'device_one',
                'device_two',
                'device_three',
                'device_four',
                'device_five',
                'device_detail'
            ]
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
        },
        retractMenu() {
            this.shrink = !this.shrink
        }
    }
}
</script>
<style lang="less" scoped>
@import './main.less';
</style>