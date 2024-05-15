<template>
    <tis-modal class="process-modal" v-model="processModal" :mask-closeable="false" width="450" footer-hide :closable="false">
        <div class="process-body">
            <div class="process-body-top">
                <div class="top-word">{{ title }}</div>
            </div>
            <div class="process-body-middle">
                <p style="text-align: center;">{{ process.title }}</p>
                <p><span class="info-before">申请人</span>： {{ process.processPeople }}</p>
                <p><span class="info-before">申请时间</span>： {{ process.processTime }}</p>
                <p><span class="info-before">申请类型</span>： {{ process.processType }}</p>
                <p><span class="info-before">申请内容</span>：<br>
                    <span class="max-five-line">{{ process.processContent }}</span></p>
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
export default {
    data() {
        return {
            processModal: false,
            title: '查看申请',
            process: {}
        }
    },
    computed() {
        if(this.$route.name == 'process_approval') {
                return '审批公告'
            }else {
                return '查看公告'
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
                // await $api. (,'1')
                this.processModal = false;
            }else {
                // await $api. (,'2')
                this.processModal = false;
            }
        }
    }
}
</script>
<style lang="less">
@import './processModal.less';
</style>