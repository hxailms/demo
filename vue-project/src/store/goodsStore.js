
// 引入第三方模块 axios
import axios from "axios";

// 为啥自己再敲一遍 就都不生效 
// export default{
//     namespaced:true,//开启命名空间
//     state:{ // 数据模型 
//         bannerList:[],
//         goodsList:[]
//     },
//     mutations:{ // 执行 同步函数 操作状态(数据模型的) 唯一方法 
//         setBanner(state,data){
//             state.bannerList = data.list;
//         },
//         setGoods(state,data){
//             state.goodsList = data.list;
//         }
//     },
//     actions:{
//         getAll({commit}){ // 解构 mutations 用其commit 方法 来操作数据模型

//         }
//     }

// }
export default {
    namespaced: true,//开启命名空间
    state: {//数据模型
        // 轮播图有问题 放到数据库里就会不轮播 所以先把它放在这里面
        bannerList: [
            { "img": "http://file.tuweia.cn/c34279eb20d100a9d11fcbfef04e56457df8cdc0.jpg" },
            { "img": "http://file.tuweia.cn/e9abc446a22218e615aee854d1354c89ccf78691.jpg" },
            { "img": "http://file.tuweia.cn/8a41ea2ecc93e61ba705d3adea86d23816e86766.jpg" }
        ],
        navList: [
            
        ],
        goodsSub: [],
        cPage1:0
        // 声明一个 变量 接收总页数 用于前面生成按钮
      
    },
    mutations: {//执行同步函数，操作数据模型（state）的唯一方法
        setBanner(state, { list }) {
            state.bannerList = list;
            // console.log(state.bannerList)
        },
        // 获取一串小图的
        setNav(state, data) {
            state.navList = data.list;
        },
        setGoods(state,{list,cPage}){
          
            state.goodsSub = list;
            state.cPage1 = cPage;
            // console.log( state.cPage )
        }
    },
    actions: {
        getAll({ commit }, { type, seekValue, key, onePage, orderKey ,defaultIndex }) {//解构mutations，得到其commit方法来操作state    
           console.log(seekValue);
            return new Promise ((res,rej)=>{
                axios.get("/goodsInfo/goodsList.json")
                    .then(({ data }) => {
                        // commit("setGoods", { list: data.list })
                        // console.log(data);
                        console.log(type);
                        // 从数据库里拿到数据 根据这些默认值来处理数据 当改变了其中一个值 都重新排序
                        let list = data.goodsList; // 声明一个空数组
                    
    
                        //  console.log(list);
                        // 2 处理数组是否含有这个元素 默认为空 (搜索功能)
                        let newList = []; // 声明一个新数组 接收处理过的值
                        list.map(function (item) {
                            item.price *= 1;
                            item.discount *= 1;
                            if (item.info.indexOf(seekValue) != -1 || item.title.indexOf(seekValue) != -1) {
                                newList.push(item);
                            }
                        })
                        //  console.log(newList);
                        // 3 把数组根据价格做升序 处理 (初始化)
    
                        // newList.sort(function(a,b){
                        //     if(orderKey == 1){
                        //         console.log(typeof a[key]);
                        //         console.log(b[key]);
                                
                        //         return a[key] - b[key] > 0
                        //     }else{
                        //         return a[key] - b[key] < 0
                        //     }  
                        // })
                        // console.log(newList);
                        // console.log(key);
                        if(orderKey == 1){   
                            for (var i = 0; i < newList.length-1; i++) {
                                for (var j = 0; j < newList.length - 1 - i; j++) {
                                        // 做升序
                                        // console.log(newList[i][key]);
                                        if (newList[j][key] > newList[j + 1][key]) {
                                            let obj = newList[j];
                                            newList[j] = newList[j + 1]
                                            newList[j + 1] = obj;
                                        
                                    }
                                }
                            }
                        }else{
                            for (var i = 0; i < newList.length-1; i++) {
                                for (var j = 0; j < newList.length - 1 - i; j++) {
                                        // console.log(newList[i][key]);
                                        // 做降序
                                        if (newList[j][key]< newList[j + 1][key]) {
                                          let obj = newList[j];
                                          newList[j] = newList[j + 1]
                                          newList[j + 1] = obj;
                                      }      
                                }
                            }
                        }
                        // console.log(newList);
                        let dataCount = newList.length;
                        // 总共有多少数据 
                        let cPage =Math.ceil( dataCount/onePage) ; 
                        // 总共有多少页 
                        // 4 把整理好的数据按多少页分割 判断一下小于我们的每页是多少数据 小于就直接赋值
                        let endList = [];
                        if(dataCount <= onePage){
                            endList = newList;
                        }else{
                            endList =  newList.slice((defaultIndex-1)*onePage,defaultIndex*onePage); // 0*8——>1*8  1*8——> 2*8
                        } 
                        console.log(endList);
                        commit("setGoods", { list: endList , cPage:cPage})
                        res("ok");
                    });

            })
        },
       
    },

}
