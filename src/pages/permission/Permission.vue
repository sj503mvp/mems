<template>
    <div class="permission-bg" :style="{'min-height': `calc(100vh - 117px)`}">
        <p class="permission-title">{{ title }}</p>
        <tis-form @keyup.13.native="handleSearch">
            <div class="search">
                <template v-if="$route.name == 'user'">
                    <div class="search-left">
                        <tis-row :gutter="12">
                            <tis-col span="6">
                                <tis-input placeholder="员工姓名" clearable v-model="searchData.keyword" :maxlength="20"></tis-input>
                            </tis-col>
                            <tis-col span="6">
                                <tis-select placeholder="所属厂区" clearable v-model="searchData.factory">
                                    <tis-option v-for="item in factoryList" :value="item.id" :key="item.id" :label="item.name"></tis-option>
                                </tis-select>
                            </tis-col>
                            <tis-col span="6">
                                <tis-select placeholder="所属职位" clearable v-model="searchData.position">
                                    <tis-option v-for="item in positionList" :value="item.id" :key="item.id" :label="item.name"></tis-option>
                                </tis-select>
                            </tis-col>
                            <tis-col span="6">
                                <tis-select placeholder="员工状态" clearable v-model="searchData.status">
                                    <tis-option v-for="item in statusList" :value="item.id" :key="item.id" :label="item.name"></tis-option>
                                </tis-select>
                            </tis-col>
                        </tis-row>
                    </div>
                    <div class="search-right">
                        <tis-button class="search-button" type="primary" @click="handleSearch">搜索</tis-button>
                        <tis-button class="search-button" v-show="resetStatus" @click="handleReset">重置</tis-button>
                    </div>
                </template>
                <template v-if="$route.name == 'manager'">
                    <div class="search-left">
                        <tis-row :gutter="12">
                            <tis-col span="6">
                                <tis-input placeholder="管理员姓名" clearable v-model="searchData.keyword" :maxlength="20"></tis-input>
                            </tis-col>
                            <tis-col span="6">
                                <tis-button class="search-button" type="primary" @click="handleSearch">搜索</tis-button>
                                <tis-button class="search-button" v-show="resetStatus" @click="handleReset">重置</tis-button>
                            </tis-col>
                            <tis-col span="6">
                                <tis-button class="search-button" type="primary" @click="addManager">新增管理员</tis-button>
                            </tis-col>
                        </tis-row>
                    </div>
                </template>
            </div>
        </tis-form>
        <tis-table class="permission-list-table" :midTdWidth="listWidth" :theadHeight="40">
            <tr slot="table-head">
                <th>工号</th>
                <th>姓名</th>
                <th>所在厂区</th>
                <th>职位</th>
                <th>操作</th>
            </tr>
            <tr slot="table-body" v-for="item in dataList" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.factory }}</td>
                <td>{{ item.position }}</td>
                <td>
                    <template v-if="$route.name == 'user'">
                        <tis-button type="text" color="blue" class="first-button" @click="changeDetail(item)">查看</tis-button>
                    </template>
                    <template v-if="$route.name == 'manager'">
                        <tis-button type="text" color="blue" class="first-button" @click="deleteManager(item)">移除</tis-button>
                    </template>
                </td>
            </tr>
        </tis-table>
        <change-modal ref="changeModal"></change-modal>
        <add-modal ref="addModal"></add-modal>
    </div>
</template>
<script>
import changeModal from './business/ChangeUserModal.vue'
import addModal from './business/AddModal.vue'
export default {
    components: {
        changeModal,
        addModal
    },
    data() {
        return {
            searchData: {},
            resetStatus: false,
            title: "用户管理",
            factoryList: [
                {
                    id: '1',
                    name: '华东冶炼一厂'
                },
                {
                    id: '2',
                    name: '华南冶炼二厂'
                },
                {
                    id: '3',
                    name: '华北制造三厂'
                },
            ],
            positionList: [
            {
                    id: '1',
                    name: '设备管理员'
                },
                {
                    id: '2',
                    name: '维修人员'
                },
                {
                    id: '3',
                    name: '超级管理员'
                },
            ],
            statusList: [
                {
                    id: '1',
                    name: '在职'
                },
                {
                    id: '2',
                    name: '离职'
                },
            ],
            listWidth: [20, 20, 20, 20, 20],
            dataList: [
                {
                    id: '1',
                    name: '1号人员',
                    factory: '1号厂区',
                    position: '设备管理员',
                    permission: true,
                },
                {
                    id: '2',
                    name: '2号人员',
                    factory: '2号厂区',
                    position: '设备管理员',
                },
                {
                    id: '3',
                    name: '3号人员',
                    factory: '3号厂区',
                    position: '维修人员',
                },
            ]
        }
    },
    watch: {
        '$route.name'(newVal, oldVal) {
            if(newVal == 'user') {
                this.title = '员工管理'
            }else {
                this.title = '管理员管理'
            }
        }
    },
    methods: {
        handleSearch() {

        },
        handleReset() {},
        changeDetail(item) {
            // 调一个接口去请求权限,传入
            this.$refs.changeModal.show();
        },
        deleteManager() {
            this.$TisModal.warning({
                    title: '移除管理员',
                    content: '<p>此操作将会移除该管理员，操作不可逆</p>',
                    maskClosable: true,
                    okText: '删除',
                    showCancel: true,
                    okError: true,
                    onOk: async () => {
                    },
                    onCancel: () => {
                    }
                });
        },
        addManager() {
            this.$refs.addModal.show();
        },
    }
}
</script>
<style lang="less">
@import './permission.less';
</style>