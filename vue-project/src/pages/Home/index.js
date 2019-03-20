//第三方模块
import {mapState} from "vuex";

//自定义模块
import Nav from "../../components/Nav";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import List from "../../components/List";


export default {
    template:require("./index.html"),
    components:{Nav, Banner, Footer, List},
    computed:{
        ...mapState("home/",["bannerList","goodsList"]),
    },
    mounted(){//首页组件加载完成后开始请求ajax
        this.$store.dispatch("home/getAll");
    }
}