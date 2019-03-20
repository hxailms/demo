//第三方模块
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";


//自定义模块
import Nav from "../../components/Nav";
import List from "../../components/List";
import Footer from "../../components/Footer";
import "./index.less";



export default {
    template: require("./index.html"),
    data() {
        return {
            sortby: "price",
            isAsc: true,
            seekValue: "",
            index:null
        }
    },
   
    components: { Nav, List, Footer },
    computed: {
        ...mapState("goods/", [,"goodsSub","dataCount","pageSize","totalProblemList"]),
        ...mapGetters("goods/",["changepage"])
        
    },
   mounted(){
     
    this.goodsSub.sort(this.sortBy("price", true));
   },
    methods: {
        sortGoods(attr, rev) {
           
            this.goodsSub.sort(this.sortBy(attr, rev));
            
        },
        change(value) {
            switch (value) {
                case 1:
                    this.isAsc = true;
                    break;
                case 2:
                    this.isAsc = false;
                    break;
                case 3:
                    this.sortby = 'price';
                    break;
                case 4:
                    this.sortby = 'discount';
                    break;
            }
        },
        //排序
        sortBy(attr, rev) {
            //第二个参数没有传递 默认升序排列

            if (rev == undefined) {
                rev = 1;
            } else {
                rev = (rev) ? 1 : -1;
            }

            return function (a, b) {
                a = a[attr];
                b = b[attr];
                if (a < b) {
                    return rev * -1;
                }
                if (a > b) {
                    return rev * 1;
                }
                return 0;
            }
        },
        //搜索商品
        ...mapActions("goods/", ["searchGoods"]),

        pagechange(index){
            this.index = index;
            this.$store.dispatch("goods/getAll").then(data=>{
                
                //点击分页按钮传对应下标来切换
                this.changepage(index)
                console.log(this.dataCount)
            })
            
        }

    },
    mounted(){
        this.$store.dispatch("goods/getAll").then(data=>{
            
            this.changepage(1);//确保ajax的数据回来之后才执行这个函数，页面初始化默认加载第一页数据
        })
       

    },
   
    
}