<template>
    <tis-modal class="process-modal" v-model="processModal" :mask-closeable="false" width="450" footer-hide :closable="false">
        <div class="process-body">
            <div class="process-body-top">
                <div class="top-word">{{ title }}</div>
            </div>
            <div class="process-body-middle">
                <p style="text-align: center;">{{ process.title }}</p>
                <p><span class="info-before">申请人</span>： {{ process.proposer }}</p>
                <p><span class="info-before">申请时间</span>： {{ process.time }}</p>
                <p><span class="info-before">申请类型</span>： 
                    <span v-if="process.approvalType=='1'">购入申请</span>
                    <span v-if="process.approvalType=='2'">报废申请</span>
                </p>
                <p><span class="info-before">申请内容</span>：<br>
                    <span class="max-five-line">{{ process.content }}</span></p>
            </div>
            <div class="process-body-footer">
                <template v-if="$route.name == 'process_approval'">
                    <tis-button type="primary" @click="handleSubmit('yes')" style="margin-right: 8px;">审批通过</tis-button>
                    <tis-button type="error" @click="handleSubmit('no')" style="margin-right: 8px;">审批不通过</tis-button>
                    <tis-button type="default" @click="handleCancel">取消审批</tis-button>
                </template>
                <template v-else>
                    <tis-button type="primary" @click="handleCancel">关闭</tis-button>
                </template>
            </div>
        </div>
    </tis-modal>
</template>
<script>
import Cookies from 'js-cookie';
import $api from '@/api/process/index.js'
export default {
    data() {
        return {
            processModal: false,
            process: {}
        }
    },
    computed: {
        title() {
            if(this.$route.name == 'process_approval') {
                return '审批公告'
            }else {
                return '查看公告'
            }
        }
    },
    methods: {
        show(item) {
            this.process = item;
            this.processModal = true;
        },
        handleCancel() {
            this.process = {};
            this.processModal = false;
        },
        async handleSubmit(type) {
            if(type) {
                let data = {
                    uid: Cookies.get('uid'),
                    id: this.process.id,
                    type: '1'
                }
                let res = await $api.approvalProcess(data);
                if(res.code == 200) {
                    this.$TisMessage.success(res.msg);
                    this.$emit('reload-page');
                }else {
                    this.$TisMessage.error('审批失败')
                }
                this.processModal = false;
            }else {
                let data = {
                    uid: Cookies.get('uid'),
                    id: this.process.id,
                    type: '2'
                }
                let res = await $api.approvalProcess(data);
                if(res.code == 200) {
                    this.$TisMessage.success(res.msg);
                    this.$emit('reload-page');
                }else {
                    this.$TisMessage.error('审批失败')
                }
                this.processModal = false;
            }
        }
    }
}
</script>
<style lang="less">
@import './processModal.less';
</style>