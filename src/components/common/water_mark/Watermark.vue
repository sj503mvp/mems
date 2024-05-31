<template>
    <div class="watermark"  :style="{'background':'url('+img+') left top repeat'}"></div>
</template>
<script>
import Cookies from 'js-cookie';
export default {
    data() {
        return {
            name:Cookies.get('username')?Cookies.get('username'):'',
            img:localStorage.getItem('waterMarkImg'+Cookies.get('uid'))
        }
    },
    mounted(){
        if(!this.img && this.name){
            this.againImg(this.name);
        }
    },
    methods: {
        /**
         * 没有存上图的情况
         * @param {string} name 生成的名字
         */
         againImg(name){
            if(!this.img){
                this.setWatermark(name)
                this.img = localStorage.getItem('waterMarkImg'+Cookies.get('uid'));
            }
        },
        /**
         * 生成背景图
         * @param {string} str 生成的名字
         */
         setWatermark(str){
            //特殊name的截取处理， 只保留名 
            if(str.indexOf('·') != -1){
                str = str.slice(0,str.indexOf('·'))
            }
            // 创建一个画布
            let can = document.createElement('canvas');
            //设置画布的长宽
            can.width = 280 + 10 * str.length
            can.height = 280 + 10 * str.length
            //设置旋转角度
            let angle = -20 * Math.PI / 180;
            //设置文字排列的单位距离
            let strWidth = can.width / 4
            let strHeight = can.height / 4
            //建立一个二维渲染上下文
            let cans = can.getContext('2d');
            // 设置旋转原点
            cans.translate(can.width / 2, can.height / 2);
            //旋转角度
            cans.rotate(-20 * Math.PI / 180);
            cans.font = '14px Vedana';
            //设置填充绘画的颜色、渐变或者模式
            cans.fillStyle = 'rgba(158, 158, 158,0.20)';
            //设置文本内容的当前对齐方式
            cans.textAlign = 'center';
            //设置在绘制文本时使用的当前文本基线
            cans.textBaseline = 'Middle';
            //通过旋转坐标系公式计算文字的相对位置
            let x = strWidth * Math.cos(angle) - strHeight * Math.sin(angle)
            let y = strWidth * Math.sin(angle) + strHeight * Math.cos(angle)
            //在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
            cans.fillText(str, -x, y)
            cans.fillText(str, x, -y)
            localStorage.setItem('waterMarkImg' + Cookies.get('uid'), can.toDataURL('image/png'))
        }
    }
}
</script>
<style scoped lang='less'>
    .watermark{
        width: 100%;
        height: calc(~"100% - 52px");
        position: fixed;
        top: 16px; // 预留顶部间距
        pointer-events: none;
        // z-index: 999; //不遮罩弹窗
        z-index: 9999; // 遮罩弹窗
    }
    .modal-watermark {
        height: 100%;
    }
</style>