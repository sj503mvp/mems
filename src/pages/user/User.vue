<template>
    <div class="user-info">
        <div class="show-info" >
            <div class="user-title">
                <div class="user-word-bar"></div>
                <span class="user-word">个人中心</span>
                <tis-button type="text" size="large" @click="changeEdit">{{ changeTitle }}</tis-button>
            </div>
            <tis-row v-if="!isEdit">
                <tis-col span="12">
                    <div class="user-info-content">
                        <p class="info-content"><span class="info-type">姓名</span><span>：</span>{{ info.name }}</p>
                        <p class="info-content"><span class="info-type">厂区</span><span>：</span>{{ info.factory }}</p>
                        <p class="info-content"><span class="info-type">职位</span><span>：</span>{{ info.position }}</p>
                        <p class="info-content"><span class="info-type">手机</span><span>：</span>{{ info.phone }}</p>
                        <p class="info-content"><span class="info-type">邮箱</span><span>：</span>{{ info.email }}</p>
                        <p class="info-content"><span class="info-type">个人简介</span><span>：</span>{{ info.descText ? info.descText : '暂未填写' }}</p>    
                    </div>
                </tis-col>
                <tis-col span="12">
                    <img :src=info.img style="width: 160px; height: 160px;">
                </tis-col>
            </tis-row>
            <tis-row v-else>
                <tis-col span="12">
                    <div class="user-info-content">
                        <p class="info-content"><span class="info-type">姓名</span>：<tis-input v-model="info.name" placeholder="请输入姓名" clearable style="width: 200px;"></tis-input></p>
                        <p class="info-content"><span class="info-type">厂区</span>：
                            <tis-select v-model="info.factoryId" style="width: 200px;">
                                <tis-option v-for="item in factoryList" :key="item.id" :value="item.id">{{ item.name }}</tis-option>
                            </tis-select>
                        </p>
                        <p class="info-content"><span class="info-type">职位</span>：
                            <tis-select v-model="info.positionId" style="width: 200px;">
                                <tis-option v-for="item in positionList" :key="item.id" :value="item.id">{{ item.name }}</tis-option>
                            </tis-select>
                        </p>
                        <p class="info-content"><span class="info-type">手机</span>：<tis-input v-model="info.phone" placeholder="请输入手机号" clearable style="width: 200px;"></tis-input></p>
                        <p class="info-content"><span class="info-type">邮箱</span>：<tis-input v-model="info.email" placeholder="请输入邮箱" clearable style="width: 200px;"></tis-input></p>
                        <p class="info-content"><span class="info-type">个人简介</span>：<tis-input v-model="info.descText" placeholder="简介" clearable style="width: 400px;" type="textarea" maxlength="200" show-word-limit :isCanDrag="false"></tis-input></p>    
                    </div>
                    <tis-button type="primary" style="margin-top: 16px;" @click="submitInfo">保存</tis-button>
                </tis-col>
                <tis-col span="12">
                    <div style="position: relative; width: 160px">
                        <div @click="changeImg" class="change-img">
                            <tis-icon type="ios-arrow-round-up" size="40" />
                            <input type="file" style="display: none;" ref="inputFile" accept="image/*" @change="handleFileChange">
                        </div>
                        <img :src=info.img style="width: 160px; height: 160px;">
                    </div>
                    <p style="font-size: 18px; margin-top: 16px">点击上传图片</p>
                </tis-col>
            </tis-row>
        </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie'
import $api from '@/api/layout/index.js'
import $userApi from '@/api/user/index.js'
export default {
    data() {
        return {
            info: {},
            changeTitle: '编辑资料',
            isEdit: false,
            factoryList: [
                {
                    id: '1',
                    name: '总部'
                },
                {
                    id: '2',
                    name: '华东冶炼一厂'
                },
                {
                    id: '3',
                    name: '华南轧制二厂'
                },
                {
                    id: '4',
                    name: '华东连铸三厂'
                },
                {
                    id: '5',
                    name: '华北冶炼四厂'
                },
                {
                    id: '6',
                    name: '华南冶炼五厂'
                },
            ],
            positionList: [
                {
                    id: '1',
                    name: '设备管理员'
                },
                {
                    id: '2',
                    name: '维修人员'
                }
            ]
        }
    },
    watch: {
        isEdit(newVal, oldVal) {
            if(newVal == true) {
                this.changeTitle = '取消编辑'
            }else {
                this.changeTitle = '编辑资料'
                this.getUserInfo();
            }
        }
    },
    mounted() {
        this.getUserInfo();
    },
    methods: {
        async getUserInfo() {
            let params = {
                uid: Cookies.get('uid'),
            }
            let res = await $api.getUserInfo(params);
            this.info = res;
        },
        changeEdit() {
            this.isEdit = !this.isEdit;
        },
        async submitInfo() {
            let data = {
                uid: Cookies.get('uid'),
                ...this.info
            }
            let res = await $userApi.editUserInfo(data)
            if(res.code == 200) {
                this.$TisMessage.success(res.msg)
            }else {
                this.$TisMessage.error(res.msg)
            }
            this.isEdit = !this.isEdit;
        },
        changeImg() {
            this.$refs.inputFile.click();
        },
        handleFileChange(e) {
            const file = e.target.files[0];
            if(!file) {
                return;
            }
            // 创建FileReader 对象读取文件
            const reader = new FileReader();
            reader.onload = (e) => {
                this.info.img = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    }
}
</script>
<style lang="less">
@import './user.less';
</style>