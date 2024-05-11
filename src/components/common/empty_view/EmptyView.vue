<template>
    <div class="empty-view">
        <img v-if="emptyImgUrl" :src="require(`@/assets${emptyImgUrl}`)" :style="{'margin-bottom': `${imgBottom}px`, 'width': `${imgSize}px`, 'height': `${imgSize}px`}">
        <p v-if="title" class="empty-title" :style="titleStyle" :class="newList? 'own-class':''">{{ title }}</p>
        <p v-if="desc" class="empty-desc" :style="{'color': descColor}">{{ desc }}</p>
    </div>
</template>

<script>
    export default {
        props: {
            emptyImgUrl: {
                type: String,
                default: ''
            }, // 空数据图片路径
            title: {
                type: String,
                default: ''
            }, // 空视图文字
            desc: {
                type: String,
                default: ''
            }, // 空视图描述文字
            imgBottom: {
                type: String | Number,
                default: '24'
            }, // 图片底部间距
            imgSize: {
                type: String | Number,
                default: '160'
            }, // 图片宽高
            descColor: {
                type: String,
                default: '#666666'
            }, // 描述文字颜色
            titleStyle: {
                type: Object,
                default: () => {
                    return {}
                }
            }, // 标题的样式
            newList: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {

            }
        }
    }
</script>

<style lang="less">
    .empty-view {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;

        img {
            width: 160px;
            height: 160px;
            margin-bottom: 24px;
        }

        .empty-title {
            font-size: 18px;
            font-weight: 600;
            color: #666666;
            line-height: 26px;
        }

        .empty-desc {
            margin-top: 8px;
            font-size: 12px;
            line-height: 20px;
        }
        .own-class {
            color: #909090;
        }
    }
</style>
