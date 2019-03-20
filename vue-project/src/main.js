//第三方模块
import Vue from "vue";

import iView from 'iview';

import 'iview/dist/styles/iview.css';

Vue.use(iView);

//自定义模块
import App from "./App";
import {router} from "./router";
import "./style/base.less";
import {store} from "./store";






//自定义全局过滤器
Vue.filter("cny", (value, tag="￥", num=2)=>tag+value.toFixed(num))
Vue.filter("op",(value,discount)=>value /discount*10)


new Vue({
    el: "#app",
    template: "<App />",//用引入的组件替换原来的html结构
    components: { App},
    router,
    store
    
})