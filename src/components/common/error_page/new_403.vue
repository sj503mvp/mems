<template>
    <div class="container">
        <Card class="card" :bordered="false" dis-hover>
            <div class="main">
                <img class="card-img" :src="require('@/assets/common/no_permissions@2x.png')">
                <p class="prompt-title card-text card-text-mb8">暂无权限</p>
                <p class="prompt-content card-text">
                    <span class="prompt-content-num left-text">{{ remainingTime }}</span>
                    后即将跳转至系统首页
                </p>
            </div>
        </Card>

    </div>
</template>
<script>
export default {
    data() {
        return {
            startTime: 3, // 开始计时的秒数
            currentTime: 0, // 当前时间（也就是已经过去的秒数）
            intervalID: null, // 定义定时器 ID
            textContent: '这是一段初始文本', // 初始文本内容
            count: 0, // 倒计时时间
        }
    },
    computed: {
        // 计算属性：计算剩余时间
        remainingTime() {
            return `${this.startTime - this.currentTime}s`;
        },
    },
    created() {
        this.jump()
        // 开始计时：每隔 1s 减少一个字符
    },
    methods: {
        jump() {
            this.intervalID = setInterval(() => {
                if (this.currentTime < this.startTime) {
                    this.textContent = this.textContent.slice(0, -1);
                    this.currentTime++;
                } else {
                    clearInterval(this.intervalID);
                    window.location.href = 'http://127.0.0.1:8080/Mems/home'
                }
            }, 1000); // 1s 为计时器周期
        }

    }
}
</script>
<style lang="less">
@import 'new_error.less';
</style>
  
  