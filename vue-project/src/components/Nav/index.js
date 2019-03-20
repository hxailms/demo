//第三方模块


//自定义模块
import "./index.less";

export default {
    template: require("./index.html"),
    data() {
        return {
            userLog: false,
            jump: true,
            logName: "",
            navs: [
                { name: 'h', text: "商品首页" },
                { name: 'g', text: "商品列表" },
                { name: 'sc', text: "购物车" },

            ],
            show: false,
            shopNum:0
        }
    },
  
    mounted() {
        let logInfo = sessionStorage.getItem("logInfo");
        if (logInfo != null) {
            logInfo = JSON.parse(logInfo);
            let logName = logInfo.username;
            this.logName = logName;
            this.userLog = true;
            this.jump = false;
           
            this.shopNum = JSON.parse(localStorage.getItem(logName)).length
    
            // this.$set(this.shopNum,'num',JSON.parse(localStorage.getItem(logName)).length);
        
        } else {
            this.userLog = false;
        }
    },
    methods: {
        exitLog() {
            // console.log(666)
            sessionStorage.removeItem("logInfo");
            this.show = true;
            
            window.location.reload();
        }
    },
    
       
}