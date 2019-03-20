//第三方模块


//自定义模块
import "./index.less";
import Bg from "../../components/Bg";

export default {
    template: require("./index.html"),
    components: { Bg },
    data() {
        return {
            data1: {
                username: "",
                userpwd: "",
                nameTip: "",
                pwdTip: ""
            },
            color1: "#f00",
            color2: "#f00",
            flag1: false,
            flag2: false,
            show: false,
            back1: ""
        }
    },


    methods: {
        //验证账号
        changeName() {
            let name = this.data1.username;
            if (name != "") {
                let usernameReg = /^1[3456789][0-9]{9}$/g;
                if (usernameReg.test(name)) {
                    this.data1.nameTip = "√";
                    this.color1 = "#0f0";
                    this.flag1 = true;
                } else {
                    this.data1.nameTip = "用户名格式错误！";
                }
            } else {
                this.data1.nameTip = "用户名不能为空！";
            }
        },
        //验证密码
        changePwd() {
            let pwd = this.data1.userpwd;
            if (pwd != "") {
                let userpwdReg = /^[a-z0-9]{6,12}$/ig//8到16位
                if (userpwdReg.test(this.data1.userpwd)) {//判断密码格式
                    this.data1.pwdTip = "√";
                    this.color2 = "#0f0";
                    this.flag2 = true;
                } else {
                    this.data1.pwdTip = "密码格式错误！";
                    this.color2 = "#f00";
                }

            } else {
                this.data1.pwdTip = "密码不能为空！";
                this.color2 = "#f00";
            }
        },
        // 点击登录
        user_log() {
            if (this.flag1 && this.flag2) {
                let flag = false;
                let userObj = {
                    username: this.data1.username,
                    userpwd: this.data1.userpwd
                };
                let userInfo = localStorage.getItem("userInfo");
                userInfo = JSON.parse(userInfo);//先转回原来的类型

                if (userInfo) {
                    userInfo.map(function (item) {//遍历数组
                        // console.log(item.username)
                        if (userObj.username == item.username) {
                            if (userObj.userpwd == item.userpwd) {
                                return flag = true;
                            }
                        }
                    })

                    if (flag) {
                        sessionStorage.setItem("logInfo", JSON.stringify(userObj));
                        this.show = true;
                        let timer = setTimeout(() => {
                            let path = sessionStorage.getItem("path");
                    
                            if(path == "/register"){//如果是注册页面来的就去首页
                                this.$router.push({name:'h'})
                            }else{//不然的话就哪里来的回哪去
                                this.$router.go(-1)
                            }
                            clearTimeout(timer);
                        }, 2000);

                    } else {
                        this.data1.pwdTip = "用户名或密码错误"
                        this.color2 = "#ff0";
                    }
                } else {
                    this.data1.pwdTip = "用户不存在"
                    this.color2 = "#ff0";
                }

            } else {
                this.data1.pwdTip = "账号或密码格式错误";
                this.color2 = "#ff0";
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        let path = from.path
        sessionStorage.setItem("path", path)
        next()
    },
   

}