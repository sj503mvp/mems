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
            let type = ['page','pageSize']
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