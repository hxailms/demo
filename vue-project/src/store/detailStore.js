//第三方模块
import axios from "axios";

//自定义模块
// let img1 = require("../img/bg1.jpg")


export default {
    namespaced: true,//开启命名空间
    state: {//数据模型
        bannerList: [
            "http://img1.imgtn.bdimg.com/it/u=2933997075,1145744980&fm=26&gp=0.jpg",
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1992085767,102835282&fm=27&gp=0.jpg",
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=49764040,3750999451&fm=27&gp=0.jpg",
            " http://img2.nuandaoimg.com/Public/images/uploads/focuspic/20181129/5bff88f26639f.jpg"
        ],
        goodsList: [],
        goodsObj: {}
    },
    mutations: {//执行同步函数，操作数据模型（state）的唯一方法
        // setBanner(state, { list }) {
        //     // state.bannerList = list;
        // },
        setGoods(state, { list, goodsid }) {
            state.goodsList = list;
            // console.log(goodsid)

            list.map(function (item) {
                if (item._id == goodsid * 1) {
                    state.goodsObj = item;
                }
            })

        }
    },
    actions: {
        //获取轮播图的数据
        // getAll({ commit }, { goodsid }) {//解构mutations，得到啊其commit方法来操作state
        //     // axios.get("/goodsInfo/bannerList.json")
        //     //     .then((data) => {//拿到数据后将数据赋给当前组件的数据模型 进而传给banner组件
        //     //         // console.log(data);
        //     //         commit("setBanner", { list: data.data.bannerList })
        //     //     });

        //     //请求商品信息
        //     axios.get("/goodsInfo/goodsList.json")
        //         .then(({ data }) => {
        //             // console.log( goodsid);

        //             commit("setGoods", { list: data.goodsList, goodsid: goodsid })
        //         })
        // }

        getAll({ commit }, { goodsid }) {//解构mutations，得到其commit方法来操作state
            //    console.log(goodsid); // 把对应的goodsid 传过来的
            var p = new Promise((res, rej) => {
                axios.get("/goodsInfo/goodsList.json", { params: { goodsid } })
                    .then(({ data }) => {//拿到数据后将数据赋给当前组件的数据模型 进而传给banner组件
                        //  console.log(data);   
                        res(data);
                        commit("setGoods", { list: data.goodsList, goodsid: goodsid })
                    });
            })
            return p;
        }

    }

}
