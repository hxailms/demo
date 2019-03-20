//第三方模块
import { mapState } from "vuex";

//自定义模块
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import "./index.less"



export default {
    template: require("./index.html"),
    components: { Nav, Footer },
    data() {
        return {
            goodsid: "",
            imgSrc: null,
            num: 1,
            modal1:false,
            show:false,
            shopNum:0,
        }
    },
    watch: {
        num() {
            if (this.num <= 1) {
                this.num = 1
            }

        }

    },
    mounted() {

        this.goodsid = this.$route.params.goodsid;
        let goodsid = this.goodsid;

        this.$store.dispatch("detail/getAll", { goodsid }).then(data => {
            let imgList = this.goodsObj.imgList
            this.imgSrc = imgList[0];
        })



    },
    computed: {
        ...mapState("detail/", ["goodsList", "goodsObj"]),
    },


    methods: {

        ok() {
            
            this.$router.push({name:'sc'})
        },
        cancel() {
            this.$Message.info('好的，祝您逛得愉快！');
            window.location.reload();
        },


        tabs(imgSrc) {
            this.imgSrc = imgSrc;
        },
        changeNum(isAdd = ture) {

            isAdd ? this.num++ : this.num--;

        },
        add_shp() {

            let goodsObj = this.goodsObj;
            let list = [];
            let logInfo = sessionStorage.getItem("logInfo");
            let flag = false;

            if (logInfo != null) {//判断用户有没有登录

                //要存的数据
                let userGoods = {
                    goodsName: goodsObj.info,
                    goodsPrice: goodsObj.price,
                    goodsNum: this.num,
                    goodsImg: goodsObj.imgList[0]
                };


                //取出登录的用户名
                logInfo = JSON.parse(logInfo);
                let userName = logInfo.username;

                //取出已经存入的数据
                let goods = localStorage.getItem(userName);

                goods = JSON.parse(goods);

                // console.log (goods)
                if (goods != null) {

                    goods.map(function (item) {
                        // console.log(item.goodsName)
                        if (item.goodsName == goodsObj.info) {//如果商品已存在就更新
                            item.goodsNum += userGoods.goodsNum;
                            flag = true;

                        } else {
                            flag = false;
                        }

                    })

                    if (!flag) {//如果商品不存在，就新增一条
                        goods.push(userGoods)
                        list = goods;
                    } else {
                        list = goods;
                    }
                } else {//如果为空就直接添加
                    list.push(userGoods);
                }



                localStorage.setItem(userName, JSON.stringify(list));
                this.modal1 = true;
                
            } else {
                this.show= true;
                let timer = setTimeout(()=>{
                    this.$router.push({name:'l'})
                    clearTimeout(timer)
                },1500)
            }


        }
    },



}