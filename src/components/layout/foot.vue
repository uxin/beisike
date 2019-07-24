<template>
  <div>
    <mt-tabbar v-model="selected" :fixed="true">
      <mt-tab-item
        :id="'box'+index"
        v-for="(item,index) in routerList"
        :key="index"
        @click.native="sel(index)"
        :class="{'is-selected':cindex==index}"
      >
        <i :class="item.className"></i>
        <p>{{item.name}}</p>
      </mt-tab-item>
    </mt-tabbar>
    <div class="yuan" v-show="this.$store.state.cartList.length==0?false:true">{{$store.getters.count}}</div>
  </div>
</template>
<script>
import Store from "storejs";
export default {
  data() {
    return {
      selected: "",
      routerList: [
        { path: "/home_page", name: "首页", className: "fa fa-home fa-2x" },
        { path: "/classify", name: "分类", className: "fa fa-th-large fa-2x" },
        {
          path: "/cart",
          name: "购物车",
          className: "fa fa-shopping-cart fa-2x"
        },
        { path: "/my", name: "我的", className: "fa fa-user-o fa-2x" }
      ],
      cindex: 0,
      footCartList: [],
      num: 0
    };
  },
  methods: {
    sel(index) {
      this.cindex = index;
      this.$router.push(this.routerList[index].path);
    }
  },
};
</script>
<style scoped lang="scss">
.mint-tabbar.is-fixed {
  height: 13.3333vw;
}
.mint-tabbar > .mint-tab-item.is-selected {
  background-color: #fff;
  color: #1fb1b8;
}
.fa-2x {
  font-size: 6.3333vw;
}

p {
  margin-top: 1.4vw;
  font-size: 3.4vw;
  font-weight: 500;
}

.mint-tabbar.is-fixed {
  background-color: #fff !important;
  border-top: 1px solid #eee;
}
ins,
a {
  color: #999;
}

.mint-tabbar {
  background-size: 0px;
}

.yuan {
  width: 4.2667vw;
  height: 4.2667vw;
  font-size: 3.2vw;
  color: #fff;
  position: fixed;
  left: 65.0667vw;
  bottom: 8vw;
  z-index: 20;
  line-height: 4.2667vw;
  border-radius: 50%;
  background-color: red;
}
</style>
