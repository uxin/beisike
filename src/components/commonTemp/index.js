// 定义全局组件

// 全局轮播组件
import { Swipe, SwipeItem } from "mint-ui";
import swiper from "@/components/commonTemp/swiper";
import { Button } from 'mint-ui';
import { Tabbar, TabItem } from 'mint-ui';
export default (Vue) => {
    Vue.component("mint_but",Button)
    Vue.component("top_carousel", Swipe)
    Vue.component("carousel", SwipeItem)
    Vue.component("swiper_t", swiper);
    Vue.component(Tabbar.name, Tabbar);
    Vue.component(TabItem.name, TabItem);
}