<template>
    <tis-modal class="notify-modal" v-model="notifyModal" :mask-closeable="false" width="450" footer-hide :closable="false">
        <div class="notify-body">
            <div class="notify-body-top">
                <div class="top-word">{{ title }}</div>
            </div>
            <div class="notify-body-middle">
                <p style="text-align: center;">{{ notify.title }}</p>
                <p><span class="info-before">发布人</span>： {{ notify.publisher }}</p>
                <p><span class="info-before">发布时间</span>： {{ notify.publishTime }}</p>
                <p><span class="info-before">紧急程度</span>：
                    <tis-tag color="blue" v-if="notify.notifyStatus == '普通'">{{ notify.notifyStatus }}</tis-tag>
                    <tis-tag color="yellow" v-if="notify.notifyStatus == '紧急'">{{ notify.notifyStatus }}</tis-tag>
                    <tis-tag color="red" v-if="notify.notifyStatus == '非常紧急'">{{ notify.notifyStatus }}</tis-tag>
                </p>
                <p><span class="info-before">发布内容</span>： <br>
                    <span class="max-three-line" v-title.multiLine>{{ notify.notifyContent }}</span>
                </p>
            </div>
            <div class="notify-body-footer">
                <template v-if="$route.name == 'notify_approval'">
                    <tis-button type="primary" @click="handleSubmit('yes')" style="margin-right: 8px;">审批通过</tis-button>
                    <tis-button type="error" @click="handleSubmit('no')">审批不通过</tis-button>
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
            notifyModal: false,
            title: '查看公告',
            notify: {}
        }
    },
    watch: {
        '$route.name' (newVal, oldVal){
            if(newVal == 'notify_approval') {
                this.title = '审批公告'
            }else {
                this.title = '查看公告'
            }
        }
    },
    methods: {
        show(item) {
            this.notify = item;
            this.notifyModal = true;
        },
        handleCancel() {
            this.notifyModal = false;
        },
        async handleSubmit(type) {
            if(type) {
                // await $api. (,'1')
                this.notifyModal = false;
            }else {
                // await $api. (,'2')
                this.notifyModal = false;
            }
        }
    }
}
</script>
<style lang="less">
@import './notifyModal.less';
</style>