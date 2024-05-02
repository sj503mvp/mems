<template>
    <div>
        <template v-for="(item, index) in menuArray">
            <div style="text-align: center">
                <!--带折叠-->
                <Dropdown transfer v-if="item.menuList && item.menuList.length > 0" placement="right-start" @on-click="changeMenu">
					<Tooltip :content="item.name" placement="right">
						<Button style="width: 64px;margin-left: -5px;padding:10px 0;" type="text">
						    <i class="fa" :class=[item.iconAwesome] aria-hidden="true"></i>
						</Button>
					</Tooltip>
                    <DropdownMenu style="width: 200px;display: none;" v-for="(child, i) in item.menuList" :key="i" slot="list">
                        <template>
                            <a class="menu-icon-link">
                                <DropdownItem :name="child.title" :key="i">
                                    <i class="fa fonta" :class=[child.iconAwesome] aria-hidden="true"></i>
                                    <span style="padding-left:10px;">{{ child.title }}</span>
                                </DropdownItem>
                            </a>
                        </template>
                    </DropdownMenu>
                </Dropdown>
                <!--不带折叠-->
                <Dropdown transfer v-else placement="right-start" :key="index" @on-click="changeMenu">
                    <Tooltip :content="item.name" placement="right">
                        <Button @click="changeMenu(item.name)" style="width: 64px;margin-left: -5px;padding:10px 0;" type="text">
                            <i class="fa" :class=[item.iconAwesome] aria-hidden="true"></i>
                        </Button>
                    </Tooltip>
                    <DropdownMenu style="width: 200px;display: none;" slot="list">
                        <DropdownItem :name="item.name" :key="'d' + index">
                            <i class="fa fonta" :class=[item.iconAwesome] aria-hidden="true"></i>
                            <span style="padding-left:10px;">{{ item.title }}</span>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </template>
    </div>
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

        }
    },
    methods: {
        /*
        *
        * @param {string}  选择的菜单名
        */
        changeMenu (active) {
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
                if(menuArray[k].children){
                    item = this.getMenuItem(menuArray[k].children, name);
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
@import './sidebarMenuShrink.less';
</style>