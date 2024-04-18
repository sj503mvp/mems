<template>
    <div class="home-info">
        <div class="chart-area">
            <p class="chart-title">全部设备</p>
            <tis-dropdown type="primary" text="维度" class="chart-dropdown" @on-click="changeDimension">
                <tis-dropdown-menu slot="list">
                    <tis-dropdown-item name="ascription" :selected="selected == 'ascription'">所属厂区</tis-dropdown-item>
                    <tis-dropdown-item name="status" :selected="selected == 'status'">设备状态</tis-dropdown-item>
                </tis-dropdown-menu>
            </tis-dropdown>
            <div ref="myChart" style="width: 500px; height: 606px;"></div>
        </div>
        <div class="chart-area">
            <div class="total-equipment">
                
            </div>
        </div>
        
    </div>
</template>
<script>
import * as echarts from 'echarts';
import $api from '@/api/home/index.js';
export default {
    data() {
        return {
            selected: 'ascription',
            option: {},
        }
    },
    mounted() {
        this.getPieData(this.selected);
        this.initEcharts();
    },
    methods: {
        initEcharts() {
            var option = this.option;
            const myChart = echarts.init(this.$refs.myChart, null, {
                height: 500
            })
            myChart.setOption(option)
        },
        changeDimension(name) {
            if(this.selected != name) {
                this.selected = name;
                this.getPieData(this.selected);
            }else {
                return
            }

        },
        async getPieData(type) {
            let params = {
                type: type
            }
            let res = await $api.getPieData(params);
            if(res.code == 200) {
                this.option = res.data;
                this.initEcharts();
            }
        }
    },
}
</script>
<style lang="less">
@import './home.less';
</style>