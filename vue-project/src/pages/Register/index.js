

//自定义模块
import Bg from "../../components/Bg";

export default {
    template: require("./index.html"),
    components: { Bg },
    data() {
        return {
            data1: {
                username: "",
                userpwd1: "",
                userpwd2: "",
                username_span: "",
                userpwd_span: ""
            },
            flag1: false,
            flag2: false,
            flag3: false,
            color1: 'red',
            color2: "red",
            show: false,
        }
    },
    methods: {
        // 判断用户名
        username_pd() {
            if (this.data1.username != "") {
                let usernameReg = /^1[3456789][0-9]{9}$/g;
                if (usernameReg.test(this.data1.username)) {
                    this.data1.username_span = "√";
                    this.color1 = "#0ff";
                    this.flag1 = true;
                } else {
                    this.data1.username_span = "格式错误！";
                }
            } else {
                this.data1.username_span = "内容不能为空！";
            }
        },
        // 判断密码
        userpwd_pd() {

            if (this.data1.userpwd2 != "") {//不能为空
                this.data1.userpwd_span = "√";
                this.color2 = "#0ff";
                if (this.data1.userpwd1 == this.data1.userpwd2) {//密码要相同
                    let userpwdReg = /^[a-z0-9]{6,12}$/ig//8到16位
                    if (userpwdReg.test(this.data1.userpwd2)) {//判断密码格式
                        var numReg = /[0-9]/g;
                        var numCount = numReg.test(this.data1.userpwd2) ? 1 : 0;//有数字就加一

                        var upperReg = /[A-Z]/g;
                        var upperCount = upperReg.test(this.data1.userpwd2) ? 1 : 0;//有大写字母就加一

                        var lowerReg = /[a-z]/g;
                        var lowerCount = lowerReg.test(this.data1.userpwd2) ? 1 : 0;//有小写字母就加一

                        var count = numCount + upperCount + lowerCount;
                        switch (count) {
                            case 1:
                                this.data1.userpwd_span = "密码强度弱";
                                this.color2 = "#ff0";
                                break;
                            case 2:
                                this.data1.userpwd_span = "密码强度中";
                                this.color2 = "#ff0";
                                break;
                            case 3:
                                this.data1.userpwd_span = "密码强度高";
                                this.color2 = "#0f0";
                                break;
                        }
                        this.flag2 = true;
                    } else {
                        this.data1.userpwd_span = "密码格式不合法！";
                        this.color2 = "#f00";
                    }
                } else {
                    this.data1.userpwd_span = "密码不一致！";
                    this.color2 = "#f00";
                }
            } else {
                this.data1.userpwd_span = "密码不能为空！";
                this.color2 = "#f00";
            }
        },
        //全部为ture注册
        user_reg() {

            if (this.flag1 && this.flag2) {

                let userObj = {
                    username: this.data1.username,
                    userpwd: this.data1.userpwd2,
                }
                let list = [];

                let flag = true;

                let userInfo = localStorage.getItem("userInfo");

                if (userInfo != null) {
                    userInfo = JSON.parse(userInfo);//在转回原来的数据类型


                    userInfo.map(function (item) {
                        let userName = item.username;
                        if (userObj.username == userName) {

                            return flag = false;
                        }
                    })

                    //判断该用户
                    userInfo.push(userObj);
                    list = userInfo;
                } else {
                    list.push(userObj);
                    // console.log(666)
                }

                if (flag) {

                    localStorage.setItem("userInfo", JSON.stringify(list))
                    this.show = true;
                    let timer = setTimeout(() =>{
                        this.$router.replace({ name: 'l' })
                        clearTimeout(timer);
                    }, 1000) 
                } else {
                    this.data1.userpwd_span = "用户已存在";
                    this.color2 = "#ff0";
                }
            } else {
                this.data1.userpwd_span = "账号或密码格式错误！"
                this.color2 = "#ff0";
            }
        }
    }
}