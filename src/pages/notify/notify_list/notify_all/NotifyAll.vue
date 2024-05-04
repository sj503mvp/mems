<template>
    <div class="all-notify" :style="{'min-height': 'calc(100vh - 117px)'}">
        <search-option></search-option>
        <notify-list :back-data="backData" :data-list="dataList"></notify-list>
    </div>
</template>
<script>
import SearchOption from '../business/SearchOption.vue';
import NotifyList from '../business/List.vue'
export default {
    components: {
        SearchOption,
        NotifyList,
    },
    data() {
        return {
            backData: {
                count: 4,
                list: [
                    {
                        id: '1',
                        title: '公告标题',
                        publishTime: '2024-05-04',
                        publisher: '狗头苏丹',
                        approvalStatus: '审批中',
                        notifyStatus: '紧急',
                        notifyContent: '这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容'
                    },
                    {
                        id: '2',
                        title: '公告标题1',
                        publishTime: '2024-05-04',
                        publisher: '狗头苏丹1',
                        approvalStatus: '审批通过',
                        notifyStatus: '非常紧急',
                        notifyContent: '这里是内容这里是内容这里是内容这里是里是内容这里是内容'
                    },
                    {
                        id: '3',
                        title: '公告标题3',
                        publishTime: '2024-05-04',
                        publisher: '狗头苏丹3',
                        approvalStatus: '审批拒绝',
                        notifyStatus: '普通',
                        notifyContent: '这里是内容这里'
                    },
                ]
            },
            dataList: [
                {
                    id: '1',
                    title: '公告标题',
                    publishTime: '2024-05-04',
                    publisher: '狗头苏丹',
                    approvalStatus: '审批中',
                    notifyStatus: '紧急',
                    notifyContent: '这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容'
                },
                {
                    id: '2',
                    title: '公告标题1',
                    publishTime: '2024-05-04',
                    publisher: '狗头苏丹1',
                    approvalStatus: '审批通过',
                    notifyStatus: '非常紧急',
                    notifyContent: '这里是内容这里是内容这里是内容这里是里是内容这里是内容'
                },
                {
                    id: '3',
                    title: '公告标题3',
                    publishTime: '2024-05-04',
                    publisher: '狗头苏丹3',
                    approvalStatus: '审批拒绝',
                    notifyStatus: '普通',
                    notifyContent: '这里是内容这里'
                },
            ]
        }
    }
}
</script>
<style lang="less">
@import './notifyAll.less';
</style>