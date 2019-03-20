//第三方模块
import axios from "axios";

//自定义模块



export default {
    namespaced: true,//开启命名空间
    state: {//数据模型
        
        goodsObj: {},
        goodsSub: [],
        totalProblemList: [],
        dataCount: 0,
        //每页显示多少条
        pageSize: 8,
        

    },
    getters:{
        changepage:(state)=>(index)=>{
            
            var _start = (index - 1) * state.pageSize;

            var _end = index * state.pageSize;

            state.goodsSub = state.totalProblemList.slice(_start,_end);
            
            return state.goodsSub
        }
    },
    mutations: {//执行同步函数，操作数据模型（state）的唯一方法
        setGoods(state, { list }) {
            // 取到使用的数据
            state.totalProblemList = list;
           
            //总条数
            state.dataCount = state.totalProblemList.length;

            if (state.dataCount < state.pageSize) {
                state.goodsSub = state.totalProblemList;
                
            } else {
                state.goodsSub = state.totalProblemList.slice(0, state.pageSize);
               
            }
            
            
           
        },
        seekGoods(state, { list, value }) {
            let newList = [];
            // console.log(list)
            list.map((item) => {
               
                if (item.title.indexOf(value) != -1 || item.info.indexOf(value) != -1) {
                    
                    newList.push(item)
                }
            })
            state.goodsSub = newList;
            state.dataCount = state.goodsSub.length;
           
        }

    },
    actions: {
        //获取轮播图的数据
        getAll({ commit }) {//解构mutations，得到啊其commit方法来操作state
            return new Promise((res,rej)=>{
            //请求商品信息
                axios.get("/goodsInfo/goodsList.json")
                    .then(({ data }) => {

                        // console.log("setGoods")
                        commit("setGoods", { list: data.goodsList })
                        res("ok")
                    })
            })

        },

        searchGoods({ commit }, value) {
            //请求商品信息
            console.log(value)
            axios.get("/goodsInfo/goodsList.json")
                .then(({ data }) => {

                    commit("seekGoods", { list: data.goodsList, value: value })
                })

        }


    },


}