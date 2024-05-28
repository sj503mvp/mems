<template>
    <footer id="foot-bar" class="row" style="opacity: 1;">
        <p id="footer-copyright">
            中北大学 @孙鑫海 <a href="http://github.com/sj503mvp/mems" target="_blank">金属冶炼设备管理子系统</a> <tis-icon type="md-return-left" size="14" class="footer-arrow"/>点击获取代码
        </p>
        <div class="bc_content" id="bc_content" :class="{show:showFeedback}">
            <div class="bc_container">
                <h1>问题反馈<Icon type="md-close" :size="16" class="pull-right fa fa-times" @click="showFeedback=false"></Icon></h1>
                <tis-form class="feedback-form" ref="refFeedback" :model="feedbackForm" :rules="validateRules">
                    <tis-row :gutter="22">
                        <tis-col span="12">
                            <tis-form-item label="反馈人">
                                <tis-input v-model="feedbackForm.username"></tis-input>
                            </tis-form-item>
                        </tis-col>
                        <tis-col span="12">
                            <tis-form-item label="联系方式">
                                <tis-input v-model="feedbackForm.phone"></tis-input>
                            </tis-form-item>
                        </tis-col>
                    </tis-row>
                    <tis-form-item>
                        <label slot="label">
                            反馈网址
                            <label-tip :content="'(可填写多个网址，一行一个)'"></label-tip>
                        </label>
                        <tis-input type="textarea"  v-model="feedbackForm.url" :isCanDrag="false"></tis-input>
                    </tis-form-item>
                    <tis-form-item prop="content" label="反馈内容">
                        <tis-input type="textarea" v-model="feedbackForm.content" class="feedback" placeholder="请详细描述BUG的触发条件，或者提出建议的背景情况" :isCanDrag="false"></tis-input>
                    </tis-form-item>
                    <tis-row style="text-align: center; margin-top: 16px;">
                        <tis-button @click="submitFeedback" type="primary" style="padding: 6px 40px;">提交</tis-button>
                    </tis-row>
                </tis-form>
            </div>
        </div>
        <ul id="footer-sidebar">
            <div id="open" :style="isOpen == false?'display: none': ''">
                <li id="b_callback" class="sidebar-icon" @click="clickFeedback">
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
import Cookies from 'js-cookie'
import $ from 'jquery';
import LabelTip from "@/components/common/label_tip/LabelTip.vue";
import $api from '@/api/layout/index.js'
export default {
    components: {
        LabelTip,
    },
    data() {
        return {
            isOpen: false,
            strOpen: '点击展开',
            showFeedback: false,
            feedbackForm:{   //问题反馈表单数据
                username:Cookies.get("username"),
                phone:"",
                url:"",
                content:"",
            },
            //问题反馈表单的验证
            validateRules: {
                content: [{ required: true, message: '请填写反馈内容', trigger: 'blur'}]
            },
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
        clickFeedback(){
            this.feedbackForm = {
                username:Cookies.get("username"),
                phone:"",
                url:"",
                content:"",
            },
            this.showFeedback = true;
            this.feedbackForm.url = window.location.href;
        },
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
        },
        /*
        * 提交表单
        */
        async submitFeedback(){
            let status = true;
            this.$refs.refFeedback.validate((valid)=>{
                status = status && valid;
            });
            if(status === false){
                return ;
            }
            // 接口
            this.feedbackForm.time = this.getTime();
            let res = await $api.saveProblemFeedback(this.feedbackForm);
            if(res.code == 200) {
                this.$TisMessage.success(res.msg)
            }else {
                this.$TisMessage.error('反馈失败，请稍后再试')
            }
            this.showFeedback = false;
        },
        getTime() {
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            month = month< 10 ? '0' + month : month;
            var date = now.getDate();
            date = date < 10 ? '0' + date : date;
            var hours = now.getHours();
            hours = hours < 10 ? '0' + hours : hours;
            var minutes = now.getMinutes();  
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var seconds = now.getSeconds();  
            seconds = seconds < 10 ? '0' + seconds : seconds;
            return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
        }
    }
}
</script>
<style lang="less" scoped>
@import './commonFooter.less';
</style>