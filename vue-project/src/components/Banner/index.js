//第三方模块
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

//自定义模块
import "./index.less";



export default {
    template: require("./index.html"),
    props: {
        list: {
            type: Array,
            required: true
        }
    },
    mounted() {//在页面组件加载完成后初始化轮播图插件
        this.swiper = new Swiper(".swiper-container", {
            
            // speed: 3000,//滚动的速度
            // loop: true,//循环播放
            initialSlide: 1,//默认显示第几张的索引
            // autoplay: {
            //     disableOnInteraction: false,//自动播放并且操作后也不停止
            //     delay: 1000   //切换下一张的速度
            // },
            effect: 'coverflow',//切换方式
            slidesPerView: 1.5,//图片的宽度等于大盒子除以这个比例
            centeredSlides: true,
            coverflowEffect: {//效果
                rotate: 30,
                stretch: 10,
                depth: 60,
                modifier: 2,
                slideShadows: true
            },
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            on:{
                slideChange:function(){
                    console.log(this.activeIndex)
                }
            }
        })



    },
    updated() {
        this.swiper.update();
        
    }

}

