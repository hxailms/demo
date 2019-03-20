

import "./index.less";

export default {
    props : {
        defaultPage : {
            type : Number,
            default : 0
        },
        cPage : {
            type : Number,
            required : true
        }
    },
    data(){
        return {
            index : 0
            // 记录当前显示第几页 
        }
    },
    watch : {
        index(){
            // console.log(this.index)
            // 监听 页码的索引发生变化事件 只要index 发生变化就把这个数据传给调用它的父级  这里的this.index+1 就是直接传的页码数   自定义一个changePage 事件 在父级调用这个组件的时候就会有这个自定义的事件
            this.$emit("changePage",this.index+1)
        },
        defaultPage(){
            this.index = this.defaultPage - 1 ;
        }
    },
    template : require("./index.html"),
    methods : {
        // 点击上下按钮 切换页码的下标
        next(isNext=true){
            // 判断下标比最大页码数减1 小时 允许它加 
            if(isNext && this.index < this.cPage-1){
                this.index ++
            }else if(!isNext && this.index > 0){
             // 判断下标 大于0时 允许它减 
                this.index --
            }
            // isNext ? this.index ++ : this.index--
        },
        isPage(i){
            // 点击的时候 让点击的按钮的下标 等于this.index  就可以把样式选中
            this.index = i-1;
        }
    },
    mounted(){
        this.index = this.defaultPage
    }
}