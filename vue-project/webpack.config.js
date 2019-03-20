let Hwp = require("html-webpack-plugin");
let Ext = require("extract-text-webpack-plugin");

module.exports = {
    entry : __dirname + "/src/main.js", //声明项目入口文件
    output : {  //配置编译后的文件
        path : __dirname + "/dist/",    //配置文件所在目录
        filename : "app.js" //配置文件名
    },
    devServer: {//指定本地web服务路径
        contentBase: __dirname + "/dist/",
        port: 3000,//设置服务端口
        inline: true// 开启自动刷新
    },
    module: {
        rules: [               // 除了node_modules文件
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.html$/, loader: "string-loader" },
            { test: /\.css$/, loader: Ext.extract("css-loader") },//在解析文件时，如果遇到以.css为结尾 则该文件会被css-loader以及style-loader进行解析
            { test: /\.less$/, loader: Ext.extract("css-loader!less-loader") },
            {
                test:/\.(png|gif|svg|jpg|woff|woff2|eot|ttf)\??.*$/,
                use:["url-loader?limit=8192&name=font/[hash:8].[name].[ext]"]
            },
        ]
    },
    resolve:{
        alias:{//指定程序文件在引入"vue"模块时 真正引入的是vue/dist/vue.js
            "vue":"vue/dist/vue.js"
        }
    },
    devtool:"source-map",//开启资源地图模式
    plugins : [
        new Hwp({//这里要相对路径，src前不能加/
            template:"src/index.html",//配置需要复制的html文件地址
            filename:"index.html",//配置复制后的html文件名
            inject:true //自动添加script或者link等需要依赖的文件标签
        }),
        new Ext("app.css")//把样式都放到这里
    ]
}



