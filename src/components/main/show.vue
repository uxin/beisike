<template>
  <div id="show" v-if="showAsyn">
    <!-- 轮播图片 -->
    <div class="big_img">
      <top_carousel class="img_box" :auto="0" :continuous="true">
        <carousel v-for="(item,index) in [1,2,3,4]" :key="index">
          <img class="imgList" :src="showData.showImg+item+'.jpg'" />
        </carousel>
      </top_carousel>
      <a href="javascript:;;">
        <div class="more">更多商品</div>
      </a>
      <div class="name_box" v-if="showAsyn">
        <p>{{showNum.Name}}</p>
        <div class="zhe">
          <p>折</p>
        </div>
      </div>
    </div>

    <!-- 商品详细 -->
    <div class="particular_box" v-if="showAsyn">
      <ul>
        <li>
          <div class="b_top">
            <p>甜度</p>
            <p>
              <img
                :src="`https://res.bestcake.com/m-images/ww/jz/tiandu_${showNum.Sweet || showNum.CakeType[0].Sweet}.png`"
                alt
              />
            </p>
          </div>
        </li>
        <li>
          <p>口味</p>
          <p>{{showNum.CategoryName}}</p>
        </li>
        <li>
          <p>原材料</p>
          <p>{{showNum.Resourse || showParticular[0].Resource}}</p>
        </li>
        <li>
          <p>适合人群</p>
          <p>{{suitablePerson}}</p>
        </li>
        <li>
          <div class="b_bottom">
            <p>保鲜条件</p>
            <p>{{showNum.KeepFresh || freshnessTime}}</p>
          </div>
        </li>
      </ul>
    </div>

    <!-- 商品评价 -->
    <div class="evaluate_box eliminate">
      <div class="evaluate_l evaluate">
        <div class="evaluate_img">
          <img src="https://res.bestcake.com/m-images/ww/detail/evaluate-a.png" alt />
        </div>
        <span class="evaluate_l_txt">商品评价</span>
      </div>
      <div class="evaluate_r evaluate">
        <div class="evaluate_img">
          <img src="https://res.bestcake.com/m-images/ww/detail/evaluate-b.png" alt />
        </div>
        <span class="evaluate_r_txt">(7469条)</span>
      </div>
    </div>

    <!-- 商品重量 -->
    <div class="weight_box eliminate">
      <div class="weight_btn eliminate">
        <div
          class="btn"
          v-for="(item,index) in showParticular"
          :key="index"
          :class="{clbtn:index==clbtn}"
          @click="claName(index),selSize(item,index)"
        >{{item.Size}}</div>
      </div>
      <div class="employ_box eliminate">
        <div class="empty eliminate empty_t">
          <div class="empty_l">
            <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-1.png" alt />
          </div>
          <div class="empty_r">{{employ.configsize|| setEmploy.configsize}}</div>
        </div>
        <div class="empty eliminate empty_t">
          <div class="empty_l">
            <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-2.png" alt />
          </div>
          <div class="empty_r">{{employ.configpeople || setEmploy.configpeople}}</div>
        </div>
        <div class="empty eliminate empty_b">
          <div class="empty_l">
            <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-3.png" alt />
          </div>
          <div class="empty_r">{{employ.configware || setEmploy.configware}}</div>
        </div>
        <div class="empty eliminate empty_b">
          <div class="empty_l">
            <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-4.png" alt />
          </div>
          <div class="empty_r">{{employ.configtips || setEmploy.configtips}}</div>
        </div>
      </div>
    </div>

    <!-- 商品购买数量 -->
    <div class="purchase_box eliminate">
      <div class="purchase_l">
        <p>购买数量</p>
      </div>
      <div class="purchase_r">
        <span class="jian purchase" @click="numJian()">-</span>
        <span class="num">{{num}}</span>
        <span class="jia purchase" @click="numJia">+</span>
      </div>
    </div>

    <!-- 温馨提示 -->
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

    <!-- 加入购物车 -->
    <div class="show_b">
      <div class="purchase_num">{{num*showSize.CurrentPrice}}.00</div>
      <div class="join_cart" @click="addCart">加入购物车</div>
      <div class="imme_purchase">立即购买</div>
    </div>

    <!-- 泡沫 -->
    <div class="empty_box eliminate"></div>
  </div>
</template>
<script>
import { MessageBox,Toast  } from "mint-ui";
export default {
  data() {
    return {
      showData: {},
      routeData: {},
      initData: "",
      showParticular: [],
      showNum: {},
      showAsyn: false,
      freshnessTime:
        "最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时。5月1日~10月31日建议2天内食用 11月1日~翌年4月30日建议3天内食用。",
      suitablePerson: "所有人群",
      clbtn: 0,
      employ: [],
      setEmploy: {
        configsize: "13.5*13.5cm",
        configpeople: "适合4-5人分享",
        configware: "含五人份餐具",
        configtips: "至少需提前一天预约"
      },
      showSize: {},
      num: 1,
      sizeNum: 0
    };
  },
  created() {
    this.routeData = this.$route.query;
    this.pageInit();
  },
  // https://res.bestcake.com/m-images/jd-detail/极地牛乳/极地牛乳-1.jpg?v=20170607
  methods: {
    // 初始化方法
    pageInit() {
      this.showData.showImg = this.setImg(this.routeData.SupplyNo);
      // console.log(this.$route);
    },
    setImg(No) {
      let path = "https://res.bestcake.com/m-images/";
      if (No.indexOf("KSK") != -1) {
        let data = {
          City: this.routeData.City,
          ProName: this.routeData.Name,
          c: "Product",
          m: "GetCakeByName",
          v: new Date().getTime()
        };
        this._getShowData(data, res => {
          this.initData = res;
        });

        return (
          path + `jd-detail/${this.routeData.Name}/${this.routeData.Name}-`
        );
      } else if (No.indexOf("NS") != -1) {
        let data = {
          Name: this.routeData.Name,
          c: "NsCakeCenter",
          m: "GetNSCakeByName",
          v: new Date().getTime()
        };
        this._getShowData(data, res => {
          this.initData = res;
        });

        return (
          path + `ns-detail/${this.routeData.Name}/${this.routeData.Name}-`
        );
      } else if (No.indexOf("JZ") != -1) {
        let data = {
          City: this.routeData.City,
          ProName: this.routeData.Name,
          c: "IndexCenter",
          m: "GetjzCakeInfo",
          v: new Date().getTime()
        };
        this._getShowData(data, res => {
          this.initData = res;
        });

        return (
          path + `jz-detail/${this.routeData.Name}/${this.routeData.Name}-`
        );
      } else if (No.indexOf("RP") != -1) {
        let data = {
          Name: this.routeData.Name,
          c: "NsCakeCenter",
          m: "GetRuPCakeByName",
          v: new Date().getTime()
        };
        this._getShowData(data, res => {
          this.initData = res;
        });

        return (
          path + `rp-detail/${this.routeData.Name}/${this.routeData.Name}-`
        );
      }
    },

    // 磅数绑定价格
    selSize(item, num) {
      this.showSize = item;
      this.sizeNum = num;
      // console.log(this.showSize);
    },

    addCart() {
      this.showParticular[this.sizeNum];
      // console.log(this.showParticular[this.sizeNum]);

      MessageBox.confirm("是否加入购物车").then(action => {
            let temp = {
            City: this.$store.state.City,
            SupplyNo: this.showParticular[this.sizeNum].SupplyNo,
            Name: this.$route.query.Name,
            ID:this.showParticular[this.sizeNum].Id ||this.showParticular[this.sizeNum].ID,
            CurrentPrice: this.showParticular[this.sizeNum].CurrentPrice,
            num: this.num,
            ImgUrl: this.$route.query.ImgUrl,
            Size: this.showParticular[this.sizeNum].Size,
            mark:"show",
            mark:"home_page",
            flag:true,
          };
          this.$store.commit("add", temp);
          this.$router.push("/cart");
          Toast("成功加入购物车")
          // console.log(temp);
          // console.log(this.$route.query);
        }).catch(() => {
          Toast("取消成功")
        });
    },

    // 商品数量计算
    numJia() {
      ++this.num;
    },
    numJian() {
      if (this.num == 1) {
        return;
      }
      --this.num;
    },

    // 接口
    _getShowData(data, callback) {
      this.$apis.getShowData(data).then(res => {
        callback(res.data.Tag);
      });
    },

    // 样式切换
    claName(index) {
      this.clbtn = index;
    }
  },
  watch: {
    initData() {
      // this.showParticular  //商品详情  数组
      // this.showNum  // 商品磅数  对象
      if (this.initData.length) {
        this.initData.map(item => {
          if (this.routeData.City == item.City) {
            this.showParticular.push(item);
          }
        });
        if (this.showParticular.length == 0) {
          this.showParticular[0] = this.initData[0];
        }
        this.showNum = this.showParticular[0];
        this.showAsyn = true; //异步
        // this.employ=(JSON.parse(this.showNum.ProductConfig)).wap;
      } else {
        this.showParticular = this.initData.infos.CakeType;
        this.showNum = this.initData.infos;
        // this.employ=JSON.parse(this.showNum.ProductConfig).wap;
        this.showAsyn = true; //异步
      }

      this.selSize(this.showParticular[0], 0);
    }
  }
};
</script>
<style scoped lang="scss">
#show {
  background: #f7f7f7;

  .big_img {
    width: 100%;
    .img_box {
      height: 445px;
      width: 100%;
    }

    a {
      .more {
        position: fixed;
        right: -1px;
        top: 4vw;
        background-color: rgba(255, 255, 255, 0.5);
        width: 22vw;
        height: 9vw;
        border-radius: 1.2vw 0vw 0vw 1.2vw;
        line-height: 8vw;
        z-index: 2;
        border: 1px solid #333;
        font-size: 4.2667vw;
      }
    }

    .name_box {
      background-color: #fff;
      p {
        &:nth-child(1) {
          font-weight: bold;
          color: #333;
          font-size: 4.53vw;
          // margin-top: 2vw;
          margin-bottom: 4vw;
          line-height: 4.53vw;
        }
      }

      .zhe {
        width: 100%;
        height: 16vw;
        p {
          width: 8vw;
          height: 8vw;
          font-size: 4vw;
          line-height: 8vw;
          color: #fff;
          border-radius: 2px;
          background: #f2495e;
          margin: 0 auto;
        }
      }
    }
  }

  // 商品详细
  .particular_box {
    width: 100%;
    background-color: #fff;
    ul {
      li {
        width: 100%;
        content: "";
        display: block;
        clear: both;
        overflow: hidden;
        margin-bottom: 4vw;

        .b_top {
          margin-top: 9.0667vw;
        }
        .b_bottom {
          margin-bottom: 9.066vw;
          overflow: hidden;
        }
        &:nth-child(1) {
          margin-bottom: 2.93vw !important;
          margin-top: 4.2667vw;
        }
        p {
          float: left;
          img {
            vertical-align: top;
            width: 22.4vw;
            height: 4.2667vw;
            margin-top: 0.6vw;
          }
          &:nth-child(2n + 1) {
            font-size: 3.73vw;
            float: left;
            width: 15.93vw;
            margin-left: 4vw;
            color: #9a9a9a;
            text-align: initial;
          }
          &:nth-child(2n) {
            font-size: 3.73vw;
            float: left;
            width: 72vw;
            margin-left: 4vw;
            margin-right: 4vw;
            color: #252525;
            text-align: initial;
          }
        }
      }
    }
  }

  //   商品评价
  .evaluate_box {
    width: 100%;
    background-color: #fff;
    margin-top: 4vw;
    padding: 4vw 0;
    .evaluate {
      width: 50%;
    }
    .evaluate_l {
      padding-left: 4vw;
      .evaluate_img {
        float: left;
        font-size: 3.73vw;
        margin-top: 1.2vw;
        margin-right: 2.93vw;
        width: 12%;
        img {
          display: block;
          max-width: 100%;
          width: 100%;
          height: auto;
        }
      }

      .evaluate_l_txt {
        float: left;
        font-size: 3.73vw;
      }
    }
    .evaluate_r {
      padding-right: 4vw;
      float: right;
      .evaluate_r_txt {
        float: right;
        font-size: 3.73vw;
      }

      .evaluate_img {
        float: right;
        font-size: 3.73vw;
        margin-top: 1.3vw;
        margin-left: 1.6vw;
        width: 5%;
        img {
          display: block;
          max-width: 100%;
          width: 100%;
          height: auto;
        }
      }
    }
  }

  // 商品重量
  .weight_box {
    width: 100%;
    background-color: #fff;
    margin-top: 4vw;
    .weight_btn {
      .btn {
        float: left;
        font-size: 3.73vw;
        text-align: center;
        line-height: 8vw;
        padding: 0 3.5875vw;
        height: 8vw;
        margin-left: 4vw;
        background: #fff;
        border-radius: 2px;
        color: #333;
        border: 1px solid #ddd;
        margin-top: 8vw;
      }
      .clbtn {
        float: left;
        background: #02d3d6;
        border-radius: 2px;
        color: #fff;
        border: 1px solid #02d3d6;
      }
    }

    .employ_box {
      width: 100%;
      .empty {
        width: 50%;
        margin-bottom: 4vw;
        float: left;
        .empty_l {
          float: left;
          width: 12%;
          margin-right: 2.66vw;
          margin-left: 4vw;
          &:nth-child(2n + 1) {
            margin-left: 4vw;
          }
          img {
            display: block;
            max-width: 100%;
            width: 100%;
            height: auto;
          }
        }

        .empty_r {
          float: left;
          line-height: 6.5vw;
          font-size: 3.73vw;
        }
      }

      .empty_t {
        margin-top: 11.33vw;
      }
      .empty_b {
        margin-bottom: 8vw;
      }
    }
  }

  //   商品购买数量
  .purchase_box {
    width: 100%;
    background-color: #fff;
    padding: 4vw 0;
    margin-top: 4vw;

    .purchase_l {
      padding-left: 4vw;
      width: 50%;
      float: left;
      text-align: initial;
      box-sizing: border-box;
      p {
        font-size: 3.73vw;
      }
    }

    .purchase_r {
      padding-right: 4vw;
      width: 50%;
      float: left;
      text-align: right;
      box-sizing: border-box;
      .purchase {
        display: inline-block;
        width: 6.4vw;
        height: 4.2667vw;
        font-size: 5.3333vw;
        font-weight: 500;
        line-height: 4.2667vw;
        text-align: center;
      }
      .num {
        display: inline-block;
        width: 5.6vw;
        height: 4.2667vw;
        line-height: 4.2667vw;
        font-size: 5.3333vw;
        text-align: center;
      }
    }
  }

  .head {
    padding: 6.9333vw 0;

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

  // 加入购物车
  .show_b {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2;
    height: 14.6666vw;
    width: 100%;
    background-color: #fff;
    .purchase_num {
      float: left;
      margin-left: 4vw;
      width: 36%;
      height: 14.6666vw;
      line-height: 14.6666vw;
      text-align: initial;
      font-size: 4.53vw;
      color: #f2495e;
      font-weight: 700;
    }

    .join_cart {
      float: left;
      width: 30%;
      height: 14.6666vw;
      line-height: 14.6666vw;
      color: #333;
      font-size: 4.2667vw;
      font-weight: 400;
    }

    .imme_purchase {
      float: left;
      width: 29.92%;
      height: 14.6666vw;
      line-height: 14.6666vw;
      background-color: #02d4d7;
      color: #fff;
      font-weight: 700;
      font-size: 4.2667vw;
    }
  }

  //泡沫
  .empty_box {
    height: 11.6667vw;
  }
}
</style>