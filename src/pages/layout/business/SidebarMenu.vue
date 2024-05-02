<template>
    <Menu class="left-menu" ref="sideMenu" theme="dark" width="auto" accordion :active-name="activeMenu" :open-names="openMenu" @on-select="changeMenu">
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
                    <!-- 一级（下拉气泡） -->
                    <tis-dropdown v-if="item.dropdownList && item.dropdownList.length > 0" :visible="menuDropDownIsOpen" :class="{'menu-tis-dropdown-select': item.name==activeMenu}" class="menu-tis-dropdown" :use-button="false" placement="right-start" @on-click="event => menuDropdownClick(event, item.dropdownList)" @on-visible-change="menuDropVisibleChange" :key="item.name">
                        <div class="menu-drop-in" :class="{'ivu-menu-item-active ivu-menu-item-selected': item.name==activeMenu}" :name="menu.name" @click="showPop(item.dropdownList, item.name)">
                            <i class="fa" :class=[item.iconAwesome] aria-hidden="true"></i>
                            <span>{{ item.title }}</span>
                            <tis-icon v-if="item.lastIconAwesome" class="last-icon fa-pop-icon" :class=[item.lastIconAwesome] type="md-add" size="18" />
                        </div>
                        <tis-dropdown-menu slot="list">
                            <tis-dropdown-item v-for="dropdownItem of item.dropdownList" :key="dropdownItem.id" :name="dropdownItem.title">{{ dropdownItem.title }}</tis-dropdown-item>
                        </tis-dropdown-menu>
                    </tis-dropdown>
                    <MenuItem :key="item.name" :name="item.name" v-else>
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
            //当前菜单
            activeMenu: "",
            menuDropDownIsOpen: false, // 下拉菜单是否展开
            openMenu: [],
            itemPopAgoMenu: 'home', // 项目头部下点击项目录入气泡之前选中的菜单,
            lastActiveMenu: "", //上一次选中的
        }
    },
    mounted() {
        this.initMenuStatus();
    },
    methods: {
        /**
         * 初始化菜单
         */
        async initMenuStatus() {
            this.activeMenu = "";
            this.openMenu = [];
            let menu = this.$route.matched;
            let openName = '';
            menu.map((item, index) => {
                if(item.meta && item.meta.openName) {
                    openName = item.meta.openName;
                    this.itemPopAgoMenu = openName;
                }
            })
            console.log(this.menuArray);
            this.menuArray.map((item, index) => {
                this.cycle(item, openName);
            })
            this.$nextTick( ()=> {
                this.$refs.sideMenu.updateOpened();
                this.$refs.sideMenu.updateActiveName();
            })
        },
        /**
         * 循环递归
         */
        cycle(item, openName) {
            if(item.openName && item.openName == openName){
                this.openMenu.push(item.name);
                if(item.menuList && item.menuList.length > 0) {
                    for(let i=0;i<item.menuList.length;i++) {
                        if(this.$route.path.split('/')[3] == item.menuList[i].openName) {
                            this.activeMenu = item.menuList[i].openName;
                        }
                    }
                }
            }
        },
        /**
         * 显示气泡
         */
        showPop(dropdownList, active) {
            this.activeMenu = active
        },
        /**
         * 气泡菜单展开装态改变
         * @param {Boolean} visible 是否显示
         */
        menuDropVisibleChange(visible) {
            this.menuDropDownIsOpen = visible
            if (!visible) {
                this.activeMenu = this.itemPopAgoMenu
                let ele = document.getElementsByClassName('sidebar-menu-con')
                ele[0].style.overflow = 'auto';
            } else {
                let ele = document.getElementsByClassName('sidebar-menu-con')
                ele[0].style.overflow = 'visible';
            }
        },
        /**
         * 左侧菜单气泡点击事件
         * @param {String} event 点击的选项名称
         * @param {Array} dropdownList 菜单列表
         */
        menuDropdownClick(event, dropdownList) {
            let routeName = ''
            dropdownList.forEach(item => {
                if(item.title == event){
                    routeName = item.openName
                }
            })
            let url = this.$router.resolve({
                name: routeName
            });
            console.log(routeName,'qwe');
            window.open(url.href);
            window.opener = null;
            // 选中上次点击的菜单
            this.activeMenu = this.itemPopAgoMenu
        },
        changeMenu(active) {
            this.menuDropDownIsOpen = false
            if(active == this.$route.name) return
            this.itemPopAgoMenu = active
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