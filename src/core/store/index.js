import Vue from "vue"
import Vuex from "vuex";
import apis from "@/core/api/index";
import { Indicator } from 'mint-ui';
import Store from "storejs";
Vue.use(Vuex)

// 组件内部的data,作用:全局状态管理和通信
const state = { //单项数据流,定义属性
    City: "上海",
    cartList: [],
}
// 定义同步方法 methods   调用 this.$store.commit("mutations里的方法",val)
const mutations = { //同步方法
    add(state, data) {

        let flag = true;
        if (state.cartList.length != 0) {
            state.cartList.map((item) => {
                if (data.ID == item.ID) {
                    if (data.mark == "show" || data.mark == "home_page") {
                        item.num = item.num + data.num;
                        flag = false;
                        return;
                    }
                    item.num++;
                    flag = false;
                }
            })
        }
        if (flag) {
            data.num = data.num || 1;
            state.cartList.push(data);
        }
        // console.log(state.cartList);
        // console.log(data);
        Store.set("cartList", state.cartList)
    },

    del(state, data) {
        state.cartList.map((item,index) => {
            if (data.ID == item.ID & data.num >= 1) {
                item.num--;
                if (item.num <= 0) {
                    (state.cartList).splice(index, 1)
                }
            }
            Store.set("cartList", state.cartList)  //当减减时覆盖当前的值
        })
    },

    vueXInit(state) {
        if (Store.get("cartList")) {
            state.cartList = Store.get("cartList");
        }
    }
}

// 定义 compunted
const getters = {  //用于属性计算
    count(state) {
        let num= 0;
         state.cartList.map((item)=>{
            num += item.num;
        })
        return num
    }
}

// 定义异步方法,通用接口调用 this.$store.dispatch("actions里的方法",val)
// context可以调用mutations方法和actions自己的方法,还可以使用getters和state
const actions = {
    test(context, data) { }

}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})
