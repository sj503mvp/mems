<template>
    <div class="main">
        <!-- 头部导航栏 -->
        <header-menu @shrink-menu="retractMenu" @go-home="goHome"></header-menu>
        <!-- 左侧菜单栏 -->
        <div class="sidebar-menu-con" :style="{width: shrink?'64px':'220px', overflow: shrink ? 'visible' : 'auto'}" v-if="hideLeftMenuArr.indexOf($route.name) === -1 && !$route.meta.hideMenu">
            <sidebarMenu :power="powerSiderData" v-show="!shrink" :menu-array="menuArray" @on-change="handleChange" ref="sidebarMenu"></sidebarMenu>
            <sidebar-menu-shrink v-show="shrink" :menu-array="menuArray" @on-change="handleChange"></sidebar-menu-shrink>
        </div>
        <div class="single-page-con" ref="pageBody"
            :style="{minWidth: contentBoxArr.indexOf($route.name) != -1 || $route.meta.hideMenu? '1440px':'1200px',
            marginLeft:contentBoxArr.indexOf($route.name) != -1 || $route.meta.hideMenu? '0px':shrink?'60px':'220px'}">
            <div class="single-page">
                <router-view ref="view"></router-view>
                <water-mark ref="waterMark"></water-mark>
            </div>
            <common-footer></common-footer>
        </div>
    </div>
</template>
<script>
import WaterMark from '@/components/common/water_mark/Watermark.vue';
import menuArray from '@/static_data/menu_array.js';
import headerMenu from './business/HeaderMenu.vue';
import sidebarMenu from './business/SidebarMenu.vue';
import sidebarMenuShrink from './business/SidebarMenuShrink.vue';
import CommonFooter from './business/CommonFooter.vue';
import Cookies from 'js-cookie';
import $api from '@/api/layout/index.js';
import { createNamespacedHelpers } from 'vuex';
const sidebarNum = createNamespacedHelpers('sidebarNum');
export default {
    components: {
        headerMenu,
        sidebarMenu,
        CommonFooter,
        sidebarMenuShrink,
        WaterMark,
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
                'device_detail',
                'device_edit',
            ],
            contentBoxArr: [
            'device_one',
                'device_two',
                'device_three',
                'device_four',
                'device_five',
                'device_detail',
                'device_edit',
            ],
            powerSiderData: [], //侧边栏权限,  
        }
    },
    computed: {
        ...sidebarNum.mapGetters(['tabFieldTips']),
    },
    watch: {
        '$route.name': function(val) {
            this.saveTabFieldTips();
        },
    },
    created() {
        this.initData();
    },
    methods: {
        ...sidebarNum.mapActions([
            'saveTabFieldTips'
        ]),
        initData() {
            this.initMenuAuth();
            this.saveTabFieldTips();
        },
        // 侧边栏展开收起
        changeMenuStatus() {
            this.isRetract = !this.isRetract;
        },
        // 获得菜单权限
        async initMenuAuth() {
            let params = {
                uid: Cookies.get('uid'),
            }
            let power = await $api.getPowerData(params);
            let HASNOTIFYAPPROVAL = power.hasNotifyApproval != undefined || power.hasNotifyApproval != null? power.hasNotifyApproval: [];
            let HASPROCESSAPPROVAL = power.hasProcessApproval != undefined || power.hasProcessApproval != null? power.hasProcessApproval: [];
            let HASCHANGEPERMISSION = power.hasChangePermission != undefined || power.hasChangePermission != null? power.hasChangePermission: [];
            this.powerSiderData = [HASNOTIFYAPPROVAL,HASPROCESSAPPROVAL,HASCHANGEPERMISSION];
            let litRouterName = this.$route.path.split('/')[3];
            let bigRouterName = this.$route.path.split('/')[2];
            console.log(this.powerSiderData);
            if(litRouterName == 'notify_approval' && !this.powerSiderData.includes('hasNotifyApproval')) {
                this.$router.push({name: 'error-403'})
            }
            if((litRouterName == 'process_approval' || this.litRouterName == 'process_approved') && !this.powerSiderData.includes('hasProcessApproval')) {
                this.$router.push({name: 'error-403'})
            }
            if(bigRouterName == 'permission' && !this.powerSiderData.includes('hasChangePermission')) {
                this.$router.push({name: 'error-403'})
            }
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
        },
        goHome() {
            this.$refs.sidebarMenu.goHome();
        }
    }
}
</script>
<style lang="less" scoped>
@import './main.less';
</style>