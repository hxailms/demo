//第三方模块


//自定义模块
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import "./index.less";


export default {
    template: require("./index.html"),
    components: { Footer, Nav },
    data() {
        return {
            goodsList: [],
            isAll: false,
            userName: null,
            reduce: "-",
            empty: false,
            have: false,
            modal1: false,
            modal2: false,
            index: null,
            delType:"one"
        }
    },
    computed: {
        countNum() {
            let count = 0;
            this.goodsList.map(item => {
                if (item.active) {
                    count += item.goodsNum;
                }
            })
            return count;
        },
        countPrice() {
            let count = 0;
            this.goodsList.map(item => {
                if (item.active) {
                    count += item.goodsNum * item.goodsPrice;
                }
            })
            return count;
        }

    },
    watch: {
        goodsList: {
            deep: true,
            handler() {
                let isAll = true;//假设所有的值都是选中的
                this.goodsList.map((item) => {
                    if (item.goodsNum <= 1) {//数值不能小于零
                        item.goodsNum = 1;
                        this.reduce = "";
                    } else {
                        this.reduce = "-";
                    }
                    if (!item.active) {//只要有一个单选没有选中，全选就不选中
                        isAll = false;
                    }
                })
                this.isAll = isAll;
                if (this.goodsList.length <= 0) {//商品删完时
                    this.isAll = false;
                    this.empty = true;
                    this.have = false;
                }
            }

        }
    },
    mounted() {

        let logInfo = sessionStorage.getItem("logInfo");
        logInfo = JSON.parse(logInfo);
        if (logInfo != null) {

            let userName = logInfo.username;
            this.userName = userName;

            let goodsList = localStorage.getItem(userName);
            goodsList = JSON.parse(goodsList);
            if (goodsList != null) {
                this.empty = false;//购物车有商品时
                this.have = true;
                this.goodsList = goodsList.map(function (item) {//先循环集合里面所有的对象，然后逐一给上选中属性
                    item.active = false;
                    return item
                });
            } else {
                this.empty = true;
                this.have = false;

            }

        } else {//用户为登录时
            this.empty = true;
            this.modal1 = true;
        }
    },
    methods: {
        changeNum(index, isAdd = true) {//加减商品
            isAdd ? this.goodsList[index].goodsNum++ : this.goodsList[index].goodsNum--;
        },
        checkAll() {//通过全选改变单选
            // console.log(this.isAll)
            this.goodsList.map((item) => {
                item.active = this.isAll;
            })
        },
        delOne(i) {
            this.index = i
            this.delType = "one"
            this.modal2 = true;
        },
        delAll() {
            this.delType = "all";
            this.modal2 = true;
        },
        ok() {

            this.$router.push({ name: 'l' })
        },
        cancel() {
            this.$Message.info('不登录就没法买东西哦！');

        },
        ok1() {
            if (this.delType == "one") {
                this.goodsList.splice(this.index, 1);
                localStorage.setItem(this.userName, JSON.stringify(this.goodsList));
            } else {
                for (let i = 0; i < this.goodsList.length; i++) {
                    if (this.goodsList[i].active) {
                        this.goodsList.splice(i, 1);
                        this.goodsList.active = false;
                        i--;
                    }
                }
                localStorage.setItem(this.userName, JSON.stringify(this.goodsList));
            }

        },
        cancel2() {
            this.$Message.info('是的，不要对自己太苛刻！');

        },
    },

}