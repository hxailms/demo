//第三方模块
import Vue from "vue";
import Router from "vue-router";


//自定义模块
import { Index } from "./pages/Entry";
import Home from "./pages/Home";
import Goods from "./pages/Goods";
import Detail from "./pages/Detail";
import ShopCar from "./pages/ShopCar";
import Register from "./pages/Register";
import Login from "./pages/Login";

//注入路由模块
Vue.use(Router);

//创建路由实例的同时，定义路由匹配规则
export let router = new Router({
    // mode:"history",
    routes: [
        {
            path: "/", redirect: { name: "h" }, component: Index, children: [
                { path: "home", component: Home, name: "h" },
                { path: "goods", component: Goods, name: "g" },
                { path: "detail/:goodsid", component: Detail, name: "d" },
                { path: "shopCar", component: ShopCar, name: "sc" },
                { path: "register", component: Register, name: "r" },
                { path: "login", component: Login, name: "l" }
            ]
        }
    ]
})


