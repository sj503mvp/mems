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
            <div ref="myChart" style="width: 500px; height: 100%;"></div>
        </div>
        <div class="home-right-info">
            <div class="home-info-top">
                <div class="home-info-box">
                    <tis-icon type="ios-bug" size="72" color="#ED3737"></tis-icon>
                    <p>待处理设备</p>
                </div>
                <div class="home-info-box">
                    <tis-icon type="ios-cube" size="72" color="#00C284"></tis-icon>
                    <p>全部设备</p>
                </div>
                <div class="home-info-box">
                    <tis-icon type="ios-list" size="72" color="#6D63FF"></tis-icon>
                    <p>我的设备</p>
                </div>
                <div class="home-info-box">
                    <tis-icon type="ios-ionic" size="72" color="#FFBC47"></tis-icon>
                    <p>回收站</p>
                </div>
            </div>
            <div class="home-info-bottom" ref="mySecondChart" style="width: 586px ;height: 73%; background: white; margin-top: 16px;"></div>
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
            optionTwo: {},
        }
    },
    mounted() {
        this.getPieData(this.selected);
        this.getAllDevice();
        this.initEcharts();
    },
    methods: {
        initEcharts() {
            var option = this.option;
            const myChart = echarts.init(this.$refs.myChart);
            myChart.setOption(option);
            var optionTwo = this.optionTwo;
            const mySecondChart = echarts.init(this.$refs.mySecondChart);
            mySecondChart.setOption(optionTwo);
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
        },
        // 获得设备总数
        async getAllDevice() {
            let res = await $api.getAllDevice();
            if(res.code == 200) {
                this.optionTwo = res.data;
                this.initEcharts();
            }
        }
    },
}
</script>
<style lang="less">
@import './home.less';
</style>