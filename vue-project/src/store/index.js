//第三方模块
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


//自定义模块
import home from "./homeStore";
import goods from "./goodsStore";
import detail from "./detailStore";


export let store = new Vuex.Store({
    modules : {
        home,
        goods,
        detail
    }
})

