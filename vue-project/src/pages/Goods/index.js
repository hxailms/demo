//第三方模块
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";


//自定义模块
import Nav from "../../components/Nav";
import List from "../../components/List";
import Footer from "../../components/Footer";
import Pager from "../../components/Pager";
import "./index.less";



export default {
    template : require("./index.html"),
    data(){
        return {
            type:null,
            seekValue:"",
            key:"price",
            onePage:8, // 一页显示多少条
            orderKey:1,
            defaultIndex : 0, // 默认显示第几页的下标
            cPage:0,
            value:""
        }
    },
    components : {Nav,List,Footer,Pager}, 
    mounted(){
        // 页面加载完了以后 就请求数据 根据特定的条件请求   
        let {page=1} = this.$route.query ; // 页面加载完后获取地址栏的参数 默认第一页 
        this.defaultIndex = page*1 ;
        // console.log(typeof this.defaultIndex)

        this.$store.dispatch("goods/getAll",{type:this.type,seekValue:this.seekValue,key:this.key,onePage:this.onePage,orderKey:this.orderKey,defaultIndex:this.defaultIndex}).then(data=>{
            

             this.cPage = this.cPage1;
        })

    },
    watch : {
        // 监听 只要数据模型里的这些东西发生变化了 就都要去获取正确的数据 这样才有联动效果
        type(){
            this.$store.dispatch("goods/getAll",{type:this.type,seekValue:this.seekValue,key:this.key,onePage:this.onePage,orderKey:this.orderKey,defaultIndex:this.defaultIndex}).then(data=>{
                this.cPage = this.cPage1;
           })
        },
        seekValue(){
            this.$store.dispatch("goods/getAll",{type:this.type,seekValue:this.seekValue,key:this.key,onePage:this.onePage,orderKey:this.orderKey,defaultIndex:this.defaultIndex}).then(data=>{
                this.cPage = this.cPage1;
           })
        },
        key(){
            this.$store.dispatch("goods/getAll",{type:this.type,seekValue:this.seekValue,key:this.key,onePage:this.onePage,orderKey:this.orderKey,defaultIndex:this.defaultIndex}).then(data=>{
                this.cPage = this.cPage1;
           })    
        },
        orderKey(){
            this.$store.dispatch("goods/getAll",{type:this.type,seekValue:this.seekValue,key:this.key,onePage:this.onePage,orderKey:this.orderKey,defaultIndex:this.defaultIndex}).then(data=>{
                this.cPage = this.cPage1;
           })
        }

    },
    computed:{
        ...mapState("goods/",["bannerList","navList","goodsSub","cPage1"])
    },
    methods : {
        // 加一个跳转的页数 
        newPage(page){
            this.$router.push({name:'g',query:{page}})
        },
        changeOrder(bol){
            bol ? this.orderKey = 1 : this.orderKey = -1
        },
        changeKey(bol){
            bol ? this.key = "price" : this.key = "discount"
        },
        changeSeek(value){
            this.seekValue = value;
            // console.log(this.seekValue);
        },
     
        changeTotal(){
            this.type = null;
        }
    },
    beforeRouteUpdate(to,from,next){
        // 在地址栏发生变化时 获取到当前的page 然后赋值给默认下标 再去请求一次ajax 
        let page = to.query.page
        // console.log(page);
        // console.log(typeof page);
        this.defaultIndex = page*1 ;
        this.$store.dispatch("goods/getAll",{type:this.type,seekValue:this.seekValue,key:this.key,onePage:this.onePage,orderKey:this.orderKey,defaultIndex:this.defaultIndex}).then(data=>{
            this.cPage = this.cPage1;
       })
        next();
    }
}