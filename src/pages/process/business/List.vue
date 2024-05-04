<template>
    <div class="process-list">
        <tis-table class="process-list-table" :midTdWidth="listWidth" :theadHeight="40">
            <tr slot="table-head">
                <th>编号</th>
                <th>申请标题</th>
                <th>申请时间</th>
                <th>申请人</th>
                <th>申请种类</th>
                <th>操作</th>
            </tr>
            <tr slot="table-body" v-for="item in dataList" :key=item.id>
                <td>{{ item.id }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.processTime }}</td>
                <td>{{ item.processPeople }}</td>
                <td>{{ item.processType }}</td>
                <td>
                    <tis-button type="text" color="blue" v-if="$route.name == 'process_approval'" @click="toAppraval(item)">审批</tis-button>
                    <tis-button type="text" color="blue" v-else @click="toDetail(item)">查看</tis-button>
                </td>
            </tr>
        </tis-table>
        <process-modal ref="processModal"></process-modal>
    </div>
</template>
<script>
import ProcessModal from '@/components/process/ProcessModal.vue'
export default {
    components: {
        ProcessModal,
    },
    props: {
        backData: {
            type: Object,
            default: {},
        },
        dataList: {
            type: Array,
            default: [],
        }
    },
    data() {
        return {
            listWidth: [10, 20, 15, 15, 15, 15]
        }
    },
    methods: {
        toAppraval(item) {
            this.$refs.processModal.show(item);
        },
        toDetail(item) {
            this.$refs.processModal.show(item);
        },
    }
}
</script>
<style lang="less">
@import './list.less';
</style>