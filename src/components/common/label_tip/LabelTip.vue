
<template>
    <span  class="label-tip" v-bind:style="theme">{{content}}</span>
</template>

<script>
    export default {
        props:{
            //提示内容
            content : '',
            //手动设置样式
            theme : {},
        }
    };
</script>


<style scoped>
    @import "label_tip.less";
</style>