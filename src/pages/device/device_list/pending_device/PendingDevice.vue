<template>
    <div class="pending-device">
        <search-option></search-option>
        <device-list></device-list>
    </div>
</template>
<script>
import SearchOption from '../business/SearchOption.vue'
import DeviceList from '../business/List.vue'
export default {
    components: {
        SearchOption,
        DeviceList
    },
    data() {
        return {
        }
    }
}
</script>
<style lang="less">
@import './pendingDevice.less';
</style>