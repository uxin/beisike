<template>
  <div>
    <!-- 商品标题 -->
    <div class="tab_List">
      <div class="teb_box">
        <span
          v-for="(item,index) in tablist"
          :key="index"
          class="tab_txt float_l"
          :class="{fontShow:index==fontShow}"
          @click="claName(index),sel(index)"
        >{{item.title}}</span>
      </div>
    </div>

    <!-- 商品内容 -->
    <div class="commodity_box eliminate">
      <div class="commodity" v-for="(item,index) in tabList" :key="index">
        <div class="commodity_img">
          <a href="javascript:;;">
            <img class="imgList" :src="item.ImgUrl" @click="toPath(item)" />
          </a>
        </div>
        <div class="float_l commodity_Name commodity_txt">{{item.Name | fontlenght(10)}}</div>
        <div class="float_l commodity_txt commodity_Means">{{item.Means | fontlenght(11)}}</div>
        <div class="float_l commodity_txt commodity_CurrentPrice">
          <span>￥{{item.CurrentPrice}}.00</span>
          <span>/{{item.Size | fontlenght(6)}}</span>
        </div>
        <span class="cart">
          <img
            class="imgList"
            src="https://res.bestcake.com/m-images-2/list-cart.png"
            @click="add(item)"
          />
        </span>
      </div>
    </div>

    <div class="head eliminate">
      <div class="head_com eliminate">
        <div class="head_l_com float_l">划线价格</div>
        <div class="head_r_com float_l">商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。</div>
      </div>

      <div class="head_com eliminate">
        <div class="head_l_com float_l">未划线价格</div>
        <div
          class="head_r_com float_l"
        >商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。</div>
      </div>
    </div>

    <!-- 空盒子 -->
    <div class="empty_box"></div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import Vue from "vue";
export default {
  data() {
    return {
      tabList: [],
      fontShow: 0
    };
  },
  props: ["tablist"],
  created() {
    // this.sel(0);
  },
  methods: {
    claName(index) {
      this.fontShow = index;
    },

    sel(index) {
      this.tabList = this.tablist[index].list;
      // console.log(this.tablist[index]);
    },

    toPath(item) {
      this.$router.push({
        path: "/show",
        query: {
          City: this.$store.state.City,
          SupplyNo: item.SupplyNo,
          Name: item.Name,
          ID: item.ID || item.Id,
          ImgUrl: item.ImgUrl
        }
      });
      // console.log(item);
    },

    // 分类购买逻辑
    add(item) {
      let temp = {
        City: this.$store.state.City,
        SupplyNo: item.SupplyNo,
        Name: item.Name,
        ID: item.ID || item.Id,
        CurrentPrice: item.CurrentPrice,
        ImgUrl: item.ImgUrl,
        Size: item.Size,
        flag: true
      };
      this.$store.commit("add", temp);
      // console.log(temp);
      Toast("成功加入购物车");
    }
  },
  watch: {
    tablist() {
      this.sel(0);
    }
  },
  filters: {
    setStr: function(val, num) {
      var str = "";
      if (val.length >= num) {
        str = val.slice(0, num) + "..."; //长度超过3就拼接字符串
      } else {
        str = val;
      }
      return str;
    }
  }
};
</script>
<style scoped lang="scss">
.tab_List {
  width: 100%;
  margin-top: 7.466vw;
  height: 5.8667vw;
  position: relative;

  .teb_box {
    height: 5.8667vw;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .tab_txt {
    font-size: 3.733vw;
    display: inline-block;
    margin: 0 3.4667vw;
    &:nth-child(2) {
      margin-left: 5.9vw;
    }
  }

  .fontShow {
    font-weight: bold;
    border-bottom: 0.5333vw solid #1db0b8;
  }
}

// 商品

.commodity_box {
  width: 100vw;
  padding: 0 1.6vw;
  margin: 0 auto;
  margin-top: 2.6667vw;
  box-sizing: border-box;

  .commodity {
    width: 44vw;
    height: 61.8667vw;
    float: left;
    margin-bottom: 5.334vw;

    &:nth-child(2n + 1) {
      margin-right: 8.8vw;
    }

    .commodity_img {
      width: 44vw;
      height: 44vw;
    }

    .commodity_Name {
      margin-top: 1.867vw;
      line-height: 3.734vw;
      font-size: 3.734vw;
      color: #333;
    }
    .commodity_txt {
      padding-left: 2.1vw;
    }
    .commodity_Means {
      font-size: 3.2vw;
      color: #999;
      line-height: 5vw;
    }
    .commodity_CurrentPrice {
      span {
        &:nth-child(1) {
          color: #f30;
          font-size: 4.267vw;
        }
        &:nth-child(2) {
          color: #999;
          font-size: 3.2vw;
          margin-left: 1.067vw;
        }
      }
    }
    .cart {
      display: inherit;
      width: 5.334vw;
      height: 5.334vw;
      position: relative;
      right: -38vw;
      bottom: 6vw;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.head {
  padding: 2vw 0;

  .head_com {
    margin: 0 4vw;
    font-size: 3.734vw;
    margin-bottom: 4vw;

    .head_l_com {
      width: 27vw;
      color: #181818;
      text-align: initial;
    }
    .head_r_com {
      width: 65vw;
      color: #a2a2a2;
      text-align: initial;
    }
  }
}

.empty_box {
  width: 100%;
  height: 13.3333vw;
}
</style>