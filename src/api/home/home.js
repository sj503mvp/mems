import $http from '@/resource';

const $api = {};

/**
 * 获取首页全部设备视图数据
 */
$api.getPieData = async(params) => {
    // const url = '';
    // return await $http.get(url, {params: params})
    return {
        code: 200, 
            data:{
            title: {
                text: '各厂区设备数',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [{
                name: '设备数量',
                type: 'pie',
                radius: '70%',
                data: [
                    { value: 1048, name: '1号厂区' },
                    { value: 735, name: '2号厂区' },
                    { value: 580, name: '3号厂区' },
                    { value: 484, name: '4号厂区' },
                    { value: 300, name: '5号厂区' }
                ],
                emphasis: {
                    itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        }
    }
}

/**
 * 获取首页设备总数数据
 */
$api.getAllDevice = async() => {
    // const url = '';
    // return await $http.get(url);
    return {
        code: 200,
        data: {
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [820, 932, 1231, 1131, 2006, 1231, 1248, 2564, 2345, 1234, 3214, 3421],
                    type: 'line',
                    areaStyle: {}
                }
            ]
        }
    }
}

export default $api;