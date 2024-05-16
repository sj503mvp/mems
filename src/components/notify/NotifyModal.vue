<template>
    <tis-modal class="notify-modal" v-model="notifyModal" :mask-closeable="false" width="450" footer-hide :closable="false">
        <div class="notify-body">
            <div class="notify-body-top">
                <div class="top-word">{{ title }}</div>
            </div>
            <div class="notify-body-middle">
                <p style="text-align: center;">{{ notify.title }}</p>
                <p><span class="info-before">发布人</span>： {{ notify.publisher }}</p>
                <p><span class="info-before">发布时间</span>： {{ notify.time }}</p>
                <p><span class="info-before">紧急程度</span>：
                    <tis-tag color="blue" v-if="notify.status == '1'">普通</tis-tag>
                    <tis-tag color="yellow" v-if="notify.status == '2'">紧急</tis-tag>
                    <tis-tag color="red" v-if="notify.status == '3'">非常紧急</tis-tag>
                </p>
                <p><span class="info-before">发布内容</span>： <br>
                    <span class="max-five-line" v-title.multiLine>{{ notify.content }}</span>
                </p>
            </div>
            <div class="notify-body-footer">
                <template v-if="$route.name == 'notify_approval'">
                    <tis-button type="primary" @click="handleSubmit(true)" style="margin-right: 8px;">审批通过</tis-button>
                    <tis-button type="error" @click="handleSubmit(false)"  style="margin-right: 8px;">审批不通过</tis-button>
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
import $api from '@/api/notify/index.js'
export default {
    data() {
        return {
            notifyModal: false,
            notify: {}
        }
    },
    computed: {
        title() {
            if(this.$route.name == 'notify_approval') {
                return '审批公告'
            }else {
                return '查看公告'
            }
        }
    },
    mounted() {
    },
    methods: {
        show(item) {
            this.notify = item;
            this.notifyModal = true;
        },
        handleCancel() {
            this.notify = {};
            this.notifyModal = false;
        },
        async handleSubmit(type) {
            if(type) {
                let data = {
                    uid: Cookies.get('uid'),
                    id: this.notify.id,
                    type: '1'
                }
                let res = await $api.approvalNotify(data);
                if(res.code == 200) {
                    this.$TisMessage.success(res.msg);
                    this.$emit('reload-page');
                }else {
                    this.$TisMessage.error('审批失败')
                }
                this.notifyModal = false;
            }else {
                let data = {
                    uid: Cookies.get('uid'),
                    id: this.notify.id,
                    type: '2'
                }
                let res = await $api.approvalNotify(data);
                if(res.code == 200) {
                    this.$TisMessage.success(res.msg);
                    this.$emit('reload-page');
                }else {
                    this.$TisMessage.error('审批失败')
                }
                this.notifyModal = false;
            }
        }
    }
}
</script>
<style lang="less">
@import './notifyModal.less';
</style>