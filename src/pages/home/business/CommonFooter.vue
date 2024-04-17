<template>
    <footer id="foot-bar" class="row" style="opacity: 1;">
        <p id="footer-copyright">
            中北大学 @孙鑫海 <a href="http://github.com/sj503mvp/mems">金属冶炼设备管理子系统</a> <tis-icon type="md-return-left" size="14" class="footer-arrow"/>点击获取代码
        </p>
        <ul id="footer-sidebar">
            <div id="open" :style="isOpen == false?'display: none': ''">
                <li id="b_callback" class="sidebar-icon">
                    <a style="color:#fff">
                        <span>反馈问题</span>
                        <i class="fa fa-comment-o" style="font-size: 20px;"></i>
                    </a>
                </li>
                <li id="b_totop" class="sidebar-icon" @click="toTop">
                    <a href="#" style="color:#fff">
                        <span>回到顶部</span>
                        <i class="fa fa-chevron-up" style="font-size: 20px;"></i>
                    </a>
                </li>
            </div>
            <li id="b_open" class="sidebar-icon" @click="submitOpen">
                <a style="color: #fff">
                    <span>{{strOpen}}</span>
                    <i class="fa fa-bars" style="font-size: 20px;"></i>
                </a>
            </li>
        </ul>
    </footer>
</template>
<script>
import $ from 'jquery'
export default {
    data() {
        return {
            isOpen: false,
            strOpen: '点击展开',
        }
    },
    watch: {
        $route(to,from){
            if(from.path != to.path){
                this.isOpen = false;
                this.strOpen = "点击展开";
            }
        }
    },
    methods: {
        /**
         * 回到顶部
         */
        toTop(){
            this.$parent.$refs.pageBody.scrollTo(0, 0);
            this.$emit('scrollToFirst','');
        },
        submitOpen(){
            $("#open").stop().slideToggle();
            if(this.isOpen == true){
                this.isOpen = false;
                this.strOpen = "点击展开";
            }else{
                this.isOpen = true;
                this.strOpen = "点击收起";
            }
        }
    }
}
</script>
<style lang="less">
@import './commonFooter.less';
</style>