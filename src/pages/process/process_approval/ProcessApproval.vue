<template>
    <div class="approval-process" :style="{'min-height': 'calc(100vh - 117px)'}">
        <search-option></search-option>
        <process-list :back-data="backData" :data-list="dataList"></process-list>
    </div>
</template>
<script>
import SearchOption from '../business/SearchOption.vue';
import ProcessList from '../business/List.vue'
export default {
    components: {
        SearchOption,
        ProcessList
    },
    data() {
        return {
            backData: {
                count: 4,
                list: [
                    {
                        id: '1',
                        title: '审批标题1',
                        processTime: '2024-05-04',
                        processStatus: '审批中',
                        processPeople: '狗头苏丹',
                        processType: '购入申请',
                        processContent: '申请内容申请内容申请内容申请内容'
                    },
                    {
                        id: '2',
                        title: '审批标题2',
                        processTime: '2024-05-04',
                        processStatus: '审批通过',
                        processPeople: '狗头苏丹2',
                        processType: '购入申请',
                        processContent: '申请内容申请内容申请内容申请内容'
                    },
                    {
                        id: '3',
                        title: '审批标题3',
                        processTime: '2024-05-04',
                        processStatus: '审批未通过',
                        processPeople: '狗头苏丹3',
                        processType: '报废申请',
                        processContent: '申请内容申请内容申请内容申请内容'
                    },
                ]
            },
            dataList: [
                {
                    id: '1',
                    title: '审批标题1',
                    processTime: '2024-05-04',
                    processPeople: '狗头苏丹',
                    processStatus: '审批中',
                    processType: '购入申请',
                    processContent: '申请内容申请内容申请内容申请内容'
                },
                {
                    id: '2',
                    title: '审批标题2',
                    processTime: '2024-05-04',
                    processPeople: '狗头苏丹2',
                    processStatus: '审批通过',
                    processType: '购入申请',
                    processContent: '申请内容申请内容申请内容申请内容'
                },
                {
                    id: '3',
                    title: '审批标题3',
                    processTime: '2024-05-04',
                    processPeople: '狗头苏丹3',
                    processStatus: '审批未通过',
                    processType: '报废申请',
                    processContent: '申请内容申请内容申请内容申请内容'
                },
            ]
        }
    }
}
</script>
<style lang="less">
@import './processApproval.less';
</style>