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

export default $api;