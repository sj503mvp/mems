<template>
    <tis-form @keyup.13.native="handleSearch">
        <div class="process-search">
            <div class="search-area">
                <tis-row :gutter="12">
                    <tis-col span="6">
                        <tis-input placeholder="流程标题" clearable :max-length="20" v-model="searchData.keyword"></tis-input>
                    </tis-col>
                    <tis-col span="6">
                        <tis-date-picker type="date" placeholder="发起时间" :value="searchData.processTime" @on-change="dateChange"></tis-date-picker>
                    </tis-col>
                    <tis-col span="6">
                        <tis-select v-model="searchData.processType" clearable>
                            <tis-option v-for="item in typeList" :key="item.id" :value="item.id">{{ item.name }}</tis-option>
                        </tis-select>
                    </tis-col>
                    <tis-col span="6">
                        <tis-button class="search-button" type="primary" @click="handleSearch" style="margin-right: 8px">搜索</tis-button>
                        <tis-button class="search-button" v-show="resetStatus" @click="handleReset">重置</tis-button>
                    </tis-col>
                </tis-row>
            </div>
        </div>
    </tis-form>
</template>
<script>
export default {
    data() {
        return {
            resetStatus: false,
            typeList: [
                {
                    id: '1',
                    name: '购入申请'
                },
                {
                    id: '2',
                    name: '报废申请'
                }
            ],
            searchData: {

            }
        }
    },
    methods: {
        handleSearch() {},
        handleReset() {},
        dateChange(data) {
            this.searchData.processTime = data;
        },
    }
}
</script>
<style>
@import './searchOption.less';
</style>