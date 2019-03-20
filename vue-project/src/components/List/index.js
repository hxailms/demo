
//自定义模块
import "./index.less";

export default {
    template:require("./index.html"),
    props:{
        list:{
            type:Array,
            required: true
        }
    }
}