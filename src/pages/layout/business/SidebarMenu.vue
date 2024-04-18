<template>
    <Menu class="left-menu" ref="sideMenu" theme="dark" width="auto" accordion active-name="首页" @on-select="changeMenu">
        <div v-for="(menu, index) in menuArray" :key="index" class="every-menu">
            <!-- 有二级菜单 -->
            <Submenu :key="index" v-if="menu.menuList && menu.menuList.length > 0" :name="menu.name">
                <template slot="title">
                    <div class="menu first-menu">
                        <i class="fa first-icon" :class=[menu.iconAwesome] aria-hidden="true"></i>
                        <span>{{ menu.name }}</span>
                    </div>
                </template>
                <template v-for="item of menu.menuList">
                    <MenuItem :key="item.name" :name="item.name">
                        <div class="menu second-menu">
                            <i class="fa first-icon" :class=[item.iconAwesome] aria-hidden="true"></i>
                            <span>{{ item.title }}</span>
                        </div>
                    </MenuItem>
                </template>
            </Submenu>
            <!-- 一级菜单 -->
            <template v-else>
                <MenuItem :name="menu.name">
                    <div class="menu first-menu">
                        <i class="fa first-icon" :class=[menu.iconAwesome] aria-hidden="true"></i>
                        <span>{{ menu.name }}</span>
                    </div>
                </MenuItem>
            </template>
        </div>
    </Menu>
</template>
<script>
export default {
    props: {
        menuArray: {
            type: Array,
            default: []
        },
    },
    data() {
        return {
            menuDropDownIsOpen: false, // 下拉菜单是否展开
        }
    },
    methods: {
        changeMenu(active) {
            if(active == this.$route.name) return
            let menuItem = this.getMenuItem(this.menuArray, active);
            this.$emit('on-change', menuItem);
        },
        /**
         * 递归找到选中的菜单
         *
         * @param {array} menuArray 部分菜单
         * @param {string} name 名字
         * @return {object}
         */
        getMenuItem(menuArray, name){
            let item = {};
            for(let k in menuArray){
                if(menuArray[k].menuList){
                    item = this.getMenuItem(menuArray[k].menuList, name);
                }
                if(item.name){
                    return item;
                }
                if(menuArray[k].name == name){
                    return menuArray[k];
                }
            }
            return item;
        },
    }
}
</script>
<style lang="less">
@import './sidebarMenu.less';
</style>