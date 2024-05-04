<template>
    <div class="notify-list">
        <tis-table class="notify-list-table" :midTdWidth="listWidth" :theadHeight="40">
            <tr slot="table-head">
                <th>编号</th>
                <th>公告标题</th>
                <th>发布时间</th>
                <th>发布人</th>
                <th v-if="$route.name == 'notify_approval'">审批状态</th>
                <th>操作</th>
            </tr>
            <tr slot="table-body" v-for="item in dataList" :key="item.id">
                <td>{{ item.id }}</td>
                <td>
                    {{ item.title }}
                    <tis-tag type="brimless" color="yellow" class="title-tag" v-if="item.notifyStatus=='紧急'">紧急</tis-tag>
                    <tis-tag type="brimless" color="red" class="title-tag" v-if="item.notifyStatus=='非常紧急'">非常紧急</tis-tag>
                </td>
                <td>{{ item.publishTime }}</td>
                <td>{{ item.publisher }}</td>
                <td v-if="$route.name == 'notify_approval'">{{ item.approvalStatus }}</td>
                <td>
                    <tis-button type="text" color="blue" v-if="$route.name == 'notify_approval'" @click="toAppraval(item)">审批</tis-button>
                    <tis-button type="text" color="blue" v-else @click="toDetail(item)">查看</tis-button>
                </td>
            </tr>
        </tis-table>
        <notify-modal ref="notifyModal"></notify-modal>
    </div>
</template>
<script>
import NotifyModal from '@/components/notify/NotifyModal.vue'
export default {
    components: {
        NotifyModal,
    },
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
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
            
        }
    },
    computed: {
        listWidth() {
            if(this.$route.name == 'notify_approval') {
                return [10, 20, 15, 15, 15, 15]
            }else {
                return [10, 20, 15, 15, 15]
            }
        }
    },
    methods: {
        toAppraval(item) {
            this.$refs.notifyModal.show(item);
        },
        toDetail(item) {
            this.$refs.notifyModal.show(item);
        },
    }
}
</script>
<style lang="less">
@import './searchOption.less';
</style>