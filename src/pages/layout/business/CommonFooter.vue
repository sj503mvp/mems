<template>
    <footer id="foot-bar" class="row" style="opacity: 1;">
        <p id="footer-copyright">
            中北大学 @孙鑫海 <a href="http://github.com/sj503mvp/mems" target="_blank">金属冶炼设备管理子系统</a> <tis-icon type="md-return-left" size="14" class="footer-arrow"/>点击获取代码
        </p>
        <div class="bc_content" id="bc_content" :class="{show:showFeedback}">
            <div class="bc_container">
                <h1>问题反馈<Icon type="md-close" :size="16" class="pull-right fa fa-times" @click="showFeedback=false"></Icon></h1>
                <Form class="feedback-form" ref="refFeedback" :model="feedbackForm" :rules="validateRules">
                    <Row :gutter="22">
                        <Col span="12">
                            <FormItem label="反馈人">
                                <Input v-model="feedbackForm.username"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="联系方式">
                                <Input v-model="feedbackForm.contact"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem>
                        <label slot="label">
                            反馈网址
                            <label-tip :content="'(可填写多个网址，一行一个)'"></label-tip>
                        </label>
                        <Input type="textarea"  v-model="feedbackForm.url"></Input>
                    </FormItem>
                    <FormItem prop="content" label="反馈内容">
                        <Input type="textarea" v-model="feedbackForm.content" class="feedback" placeholder="请详细描述BUG的触发条件，或者提出建议的背景情况"></Input>
                    </FormItem>
                    <Row style="text-align: center; margin-top: 15px;">
                        <Button @click="submitFeedback" type="primary" style="padding: 6px 40px;">提交</Button>
                    </Row>
                </Form>
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
import $ from 'jquery';
import LabelTip from "@/components/common/label_tip/LabelTip.vue";
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
                // username:Cookie.get("username"),
                contact:"",
                // 首页网址
                // url:"https://tis.tanikawa.com/index/admin_index",
                content:"",
            },
            //问题反馈表单的验证
            validateRules: {
                content: [{ required: true, message: '请填写反馈内容'}]
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
            console.log('123');
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
        submitFeedback(){
            let status = true;
            this.$refs.refFeedback.validate((valid)=>{
                status = status && valid;
            });
            if(status === false){
                return ;
            }
            // 接口
            // let res = $api.saveProblemFeedback(this.feedbackForm);
            // res.then(result=>{
            //   if (result.code == 200){
            //       utils.notice('反馈成功','success')
            //   }
            // })
            this.showFeedback = false;
        },
    }
}
</script>
<style lang="less" scoped>
@import './commonFooter.less';
</style>