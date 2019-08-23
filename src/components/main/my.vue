<template>
  <div id="my" v-show="bool">
    <!-- 头像 -->
    <div class="portrait">
      <div class="portrait_img">
        <img :src="userInfo.avatar" alt />
      </div>
      <div class="portrait_name">{{userInfo.name}}</div>
    </div>

    <!-- 会员等级 -->
    <ul class="grade">
      <li>
        <p>会员等级</p>
        <p>V0</p>
      </li>
      <li>
        <p>吉致币</p>
        <p>0</p>
      </li>
      <li>
        <p>优惠券</p>
        <p>0</p>
      </li>
      <li>
        <p>兑换券</p>
        <p>0</p>
      </li>
    </ul>

    <!-- 我的订单 -->
    <div class="my_d">
      <div class="my_d_t cl_b">
        <div class="my_img_l">
          <img src="https://res.bestcake.com\m-images\order\mw-person-dd.png" alt />
        </div>
        <div class="my_txt">我的订单</div>
        <div class="my_img_r">
          <img src="https://res.bestcake.com\m-images\order\mw_firm_right.jpg" alt />
        </div>
      </div>
      <div class="my_d_t">
        <div class="my_img_l">
          <img src="https://res.bestcake.com\m-images\order\mw_firm_ad.jpg" alt />
        </div>
        <div class="my_txt">我的订单</div>
        <div class="my_img_r">
          <img src="https://res.bestcake.com\m-images\order\mw_firm_right.jpg" alt />
        </div>
      </div>
    </div>

    <!-- 退出登录 -->
    <div class="out_login">
      <span @click="loginOut">退出登录</span>
    </div>

    <!-- 电话热线 -->
    <div class="hot_line">电话热线</div>

    <!-- 服务协议与证照信息 -->
    <div class="bottom">服务协议与证照信息</div>

  <!-- 泡沫 -->
    <div class="empty_box"></div>
  </div>
</template>
<script>
import { Toast, MessageBox } from "mint-ui"; //提示框
import Store from "storejs";
export default {
  data() {
    return {
      userInfo: {},
      bool:false
    };
  },
  created() {
    let userInfo = Store.get("userInfo");
    // console.log(userInfo.avatar);
    if (Store.get("userInfo")) {
      this.userInfo = Store.get("userInfo");
    } else if (Store.get("userInfo") == undefined) {
      MessageBox.confirm("是否去登录")
        .then(action => {
          this.$router.push("/login");
        })
        .catch(() => {
          Toast("取消成功");
        });
    }
    this.show();
  },
  methods: {
    loginOut() {
      // console.log(Store);
      MessageBox.confirm("是否退出登录")
        .then(action => {
          this.bool=false
          Store.remove("userInfo");
          MessageBox.confirm("是否去登录")
            .then(action => {
              this.$router.push("/login");
            })
            .catch(() => {
              Toast("取消成功");
              this.bool=false
            });
        })
        .catch(() => {
          Toast("取消成功");
        });
    },
    show(){
      if(Store.get("userInfo") != undefined){
        this.bool=true;
      }
    }
  }
};
</script>
<style scoped lang="scss">
#my {
  background: #f7f7f7;
  // 头像
  .portrait {
    width: 100%;
    background-color: #fff;
    .portrait_img {
      padding-top: 6.66vw;
      box-sizing: border-box;

      img {
        width: 21.06vw;
        border-radius: 50%;
      }
    }

    .portrait_name {
      padding-top: 1.33vw;
      box-sizing: border-box;
      line-height: 5.33vw;
      font-size: 3.73vw;
      color: #333;
    }
  }

  // 会员等级
  .grade {
    width: 100%;
    padding-top: 8.66vw;
    background: #fff;
    padding-bottom: 4vw;
    box-sizing: border-box;
    overflow: hidden;
    li {
      width: 25%;
      float: left;
      p {
        width: 100;

        &:nth-child(1) {
          line-height: 4vw;
          font-size: 2.93vw;
          color: #ccc;
        }
        &:nth-child(2) {
          padding-top: 1.73vw;
          box-sizing: border-box;
          line-height: 5.73vw;
          font-size: 4.8vw;
          color: #333;
        }
      }
    }
  }

  // 我的订单
  .my_d {
    width: 100%;
    margin-top: 4vw;
    background: #fff;
    overflow: hidden;

    .cl_b {
      border-bottom: 0.27vw solid #ddd;
    }

    .my_d_t {
      width: 100%;
      overflow: hidden;
      .my_img_l {
        padding-left: 4vw;
        padding-top: 3.38vw;
        padding-bottom: 4vw;
        box-sizing: border-box;
        float: left;
        img {
          display: inline-block;
          width: 4vw;
          vertical-align: -webkit-baseline-middle;
        }
      }

      .my_txt {
        padding-left: 2.66vw;
        padding-top: 3.86vw;
        padding-bottom: 3.86vw;
        box-sizing: border-box;
        float: left;
        font-size: 4.2667vw;
      }

      .my_img_r {
        float: right;
        margin-right: 4vw;
        padding-top: 3.86vw;
        box-sizing: border-box;
        img {
          display: inline-block;
          width: 2.4vw;
        }
      }
    }
  }

  // 退出登录
  .out_login {
    width: 100%;
    background-color: #fff;
    overflow: hidden;
    margin-top: 4vw;
    span {
      display: inline-block;
      font-size: 4.2667vw;
      color: red;
    }
  }

  // 电话热线
  .hot_line {
    margin-top: 21.3333vw;
    line-height: 4vw;
    color: #999;
    font-size: 2.93vw;
  }

  .bottom {
    margin-top: 10vw;
    line-height: 4vw;
    color: #999;
    font-size: 2.93vw;
  }

  .empty_box{
    width: 100%;
    height: 0.2667vw;
    margin-top: 25vw;
  }
  // .quit_login {
  //   width: 100%;
  //   height: 100%;
  //   margin-top: 5.3333vw;
  //   background: #fff;
  //   span {
  //     display: inline-block;
  //     width: 13.3333vw;
  //     border: 1px solid #000;
  //   }
  // }
}
</style>
