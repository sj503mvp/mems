<template>
    <tis-form @keyup.13.native="handleSearch">
        <div class="notify-search">
            <div class="search-area">
                <tis-row :gutter="12">
                    <tis-col span="6">
                        <tis-input placeholder="公告标题" clearable :max-length="20" v-model="searchData.keyword"></tis-input>
                    </tis-col>
                    <tis-col span="6">
                        <tis-date-picker ref="ownDatePicker" type="daterange" placeholder="发布时间" :value="searchData.notifyTime" @on-change="dateChange"></tis-date-picker>
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
    props: {
        resetStatus: {
            type: Boolean,
            default: false,
        },
        searchData: {
            type: Object,
            default: {},
        }
    },
    data() {
        return {
        }
    },
    methods: {
        handleSearch() {
            this.$emit('on-search', this.searchData)
        },
        handleReset() {
            this.$emit('on-clear')
        },
        dateChange(date) {
            this.searchData.notifyTime = date;
        },
    }
}
</script>
<style lang="less">
@import './searchOption.less';
</style>