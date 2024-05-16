export default{
    data() {
        return {

        }
    },
    methods: {
        /**
         * 回到顶部
         */
        toPageTop() {
            window.scrollTo({
                top: 0,
                behavior: 'instant'
            })
        },
        /**
         * 判断是否出现重置
         */
        resetJuged(){
            // 这个userId只是针对审批流程
            let type = ['page','pageSize','userId']
            let openType = false;
            let params = JSON.parse(JSON.stringify(this.$route.query))
            for(let i in params){
                if(params[i] && type.indexOf(i)<0){
                    openType = true;
                    break;
                }
            }
            this.resetStatus = openType;
        },
    }
}