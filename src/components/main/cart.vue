<template>
  <div id="cart">
    <!-- 空空如也 -->
    <div class="cart_box eliminate" v-show="cartListData.length==0?true:false">
      <div class="null_box">购物车是空的哦~</div>
    </div>

    <!-- 一件商品 -->
    <div v-for="(item,index) in cartListData" :key="index">
      <div class="cart_commodity eliminate">
        <div class="cart_commodity_t eliminate">
          <div class="commodity_l">
            <!-- <img src="https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg" alt /> -->
            <input type="checkbox" v-model="item.cartFlag" @change="count" />
          </div>
          <div class="commodity_r">
            <div class="commodity_img" @click="show(item)">
              <a href="javascript:;;">
                <img :src="item.ImgUrl" alt />
              </a>
            </div>
            <div class="commodity_txt">
              <p class="name"></p>
              <p class="name">{{item.Name}}</p>
              <div class="num_box">
                <p>{{item.Size}}</p>
                <div class="num eliminate">
                  <span @click="del(item)">-</span>
                  <span>{{item.num}}</span>
                  <span @click="add(item)">+</span>
                </div>
              </div>
              <p class="price">{{item.CurrentPrice*item.num}}.00</p>
            </div>
          </div>
        </div>
        <div class="cart_commodity_b eliminate">
          <span>优惠方式</span>
          <span>不参与活动</span>
        </div>
      </div>
    </div>

    <!-- 结算 -->
    <div class="cart_b">
      <div class="cart_money">
        <!-- <img src="https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg" alt /> -->
        <input type="checkbox" v-model="isAllPrice" @click="allPriceBtn" />
      </div>
      <div class="all" @click="allPriceBtn">全选</div>
      <div class="empty" @click="allDel">清空</div>
      <div class="summation">
        <span>{{allPrice}}.00</span>
        <span>合计:</span>
      </div>
      <div class="jiesuan">结算</div>
    </div>

    <!-- 泡沫 -->
    <div class="empty_box eliminate"></div>
  </div>
</template>
<script>
import Store from "storejs";
import { Toast } from "mint-ui";
import { mapState } from "vuex";
export default {
  data() {
    return {
      cartListData: [],
      allPrice: 0,
      isAllPrice: false,
      isArr: []
    };
  },
  created() {
    this.$store.commit("vueXInit");
    this.cartListData = this.$store.state.cartList;
    //  console.log(this.cartListData);
    this.cartListData.map(item => {
      item.cartFlag = false;
    });
  },
  computed: {
    ...mapState(["cartList"])
  },
  methods: {
    add(item) {
      item.mark = "";
      this.$store.commit("add", item);
      this.count();
    },
    del(item) {
      this.$store.commit("del", item);
      if (item.num == 0) {
        this.cartListData.splice(this.cartListData.indexOf(item), 1);
        console.log(this.cartListData);

        Toast("删除成功");
        if (this.cartListData.length <= 0) {
          this.allDel();
        }
      }

      this.count();
      // console.log(item.flag);
    },

    allDel() {
      Store.remove("cartList");
      Toast("清空成功");
    },
    count() {
      this.allPrice = 0;
      this.isArr = [];
      this.cartListData.map(item => {
        if (item.cartFlag) {
          this.allPrice += item.num * item.CurrentPrice;
          this.isArr.push(item);
        }
      });
      if (this.isArr.length == this.cartListData.length) {
        this.isAllPrice = true;
      } else {
        this.isAllPrice = false;
      }
    },
    allPriceBtn() {
      this.isAllPrice = !this.isAllPrice;
      this.cartListData.forEach(item => {
        item.cartFlag = this.isAllPrice;
      });
      this.count();
    },
    show(item) {
      this.$router.push({
        path: "/show",
        query: {
          City: item.City,
          SupplyNo: item.SupplyNo,
          Size: item.Size,
          Name: item.Name,
          ID: item.ID,
          ImgUrl: item.ImgUrl
        }
      });
    }
  },
  watch: {
    cartList() {
      this.cartListData = this.cartList;
    }
  }
};
</script>
<style scoped lang="scss">
#cart {
  background: #f7f7f7;
  width: 100%;

  // 空空如也
  .cart_box {
    position: relative;
    width: 100%;
    // z-index: -1;

    .null_box {
      width: 100%;
      line-height: 16vw;
      color: #141414;
      font-size: 3.2vw;
      background: #fff;
      text-align: center;
      position: absolute;
    }
  }

  // 一件商品
  .cart_commodity {
    width: 100%;
    z-index: 1;
    background-color: #fff;
    margin-bottom: 4vw;

    .cart_commodity_t {
      padding-bottom: 4.26vw;
      width: 100%;
      box-sizing: border-box;

      .commodity_l {
        float: left;
        width: 5.33vw;
        // height: 5.33vw;
        margin-left: 4vw;
        margin-right: 3vw;

        img {
          width: 100%;
          height: 100%;
          margin-top: 17vw;
        }
        input {
          width: 3.33vw;
          height: 3.33vw;
          margin-top: 17vw;
        }
      }

      .commodity_r {
        float: left;

        .commodity_img {
          width: 30.4vw;
          height: 30.4vw;
          float: left;
          margin-right: 4vw;
          padding-top: 4.26vw;
          box-sizing: border-box;

          a {
            img {
              width: 100%;
              height: 100%;
            }
          }
        }

        .commodity_txt {
          float: left;
          width: 52vw;
          padding-top: 5.06vw;
          box-sizing: border-box;

          .name {
            font-size: 4.26vw;
            color: #000;
            line-height: 5.06vw;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 49vw;
            // height: 5.8vw;
            text-align: initial;
          }

          .num_box {
            margin: 1.2vw 0;
            overflow: hidden;

            p {
              width: 50%;
              font-size: 2.93vw;
              color: #ccc;
              line-height: 3.46vw;
              margin-top: 1.69vw;
              float: left;
              text-align: initial;
            }

            .num {
              width: 50%;
              float: left;

              span {
                display: inline-block;
                width: 7.3vw;
                color: #333;
                line-height: 6vw;
                text-align: center;
                font-size: 5.3333vw;

                &:nth-child(2) {
                  font-size: 4.2667vw !important;
                }
              }
            }
          }
          .price {
            font-size: 3.46vw;
            font-weight: bold;
            line-height: 4vw;
            margin-top: 2.66vw;
            text-align: initial;
          }
        }
      }
    }

    .cart_commodity_b {
      margin-left: 12.33vw;
      border-top: 0.133vw solid #ddd;

      span {
        display: inline-block;
        line-height: 5.33vw;
        margin-top: 3.86vw;
        margin-bottom: 3.86vw;
        font-size: 3.73vw;
        float: left;

        &:nth-child(1) {
          color: #f2495e;
          margin-right: 1.333vw;
          font-weight: bold;
        }
      }
    }
  }

  // 结算
  .cart_b {
    position: fixed;
    bottom: 13.55vw;
    left: 0;
    z-index: 2;
    // height: 14.6666vw;
    width: 100%;
    background-color: #fff;
    border-top: 1px solid #eee;

    .cart_money {
      float: left;
      margin-left: 3vw;
      margin-right: 1.33vw;
      img {
        display: inline-block;
        width: 5.33vw;
        margin-top: 4.34vw;
      }

      input {
        width: 3.33vw;
        height: 3.33vw;
        margin-top: 5.7vw;
      }
    }

    .all {
      padding-top: 4.53vw;
      padding-bottom: 4.53vw;
      font-size: 4vw;
      color: #333;
      line-height: 5.6vw;
      float: left;
      width: 9vw;
      margin-right: 4vw;
    }

    .empty {
      font-size: 3.46vw;
      color: #333;
      line-height: 3.93vw;
      float: left;
      width: 8.06vw;
      text-align: center;
      margin-right: 0.12vw;
      padding-top: 4.93vw;
    }

    .summation {
      float: left;
      margin-top: 2.53vw;
      margin-right: 1.74vw;
      width: 36.67vw;

      span {
        float: right;
        &:nth-child(2) {
          font-size: 2.9333vw;
          line-height: 9.0667vw;
        }
        &:nth-child(1) {
          padding-right: 4vw;
          font-size: 4.8vw;
          color: #f2495e;
          font-weight: bold;
          line-height: 8.5333vw;
        }
      }
    }

    .jiesuan {
      float: left;
      width: 30.66vw;
      line-height: 15vw;
      background: #02d4d7;
      color: #fff;
      font-weight: bolder;
      font-size: 4.2667vw;
    }
  }

  //泡沫
  .empty_box {
    height: 28.6667vw;
    background: #fff;
  }
}
</style>