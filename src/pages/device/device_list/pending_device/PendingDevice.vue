<template>
    <div class="pending-device">
        <search-option></search-option>
    </div>
</template>
<script>
import SearchOption from '../business/SearchOption.vue'
export default {
    components: {
        SearchOption,
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