<template>
  <div id="index">
    <!-- 位置 -->
    <div>
      <lay_head></lay_head>
    </div>
    <!-- 位置end -->

    <!-- 轮播 -->
    <div class="box after">
      <div id="top_carousel">
        <top_carousel :auto="4000" @prevent="true" class="top_carousel">
          <carousel v-for="(item,index) in SwiperBannerList" :key="index">
            <a href>
              <img :src="item.ImgUrl" />
            </a>
          </carousel>
        </top_carousel>
      </div>
      <img src="@/assets/title.png" alt class="title" />
    </div>
    <!-- 轮播end -->

    <!-- 吐司活动 -->
    <a href class="tusi" v-for="(item,index) in AbsoluteBannerList" :key="index">
      <img :src="item.ImgUrl" alt />
    </a>
    <!-- 吐司活动end -->

    <!-- 商品列表 -->
    <div class="TopIconList">
      <ul class="eliminate">
        <li v-for="(item,index) in TopIconList" :key="index">
          <a href>
            <img :src="item.ImgUrl" />
            <p>{{item.ActName}}</p>
          </a>
        </li>
      </ul>
    </div>
    <!-- 商品列表end -->

    <!-- 通知 -->
    <div class="notification">
      <span class="notification_text float_l s12">通知</span>
      <div class="roll float_r">
        <p class="s14">{{this.NoticeList}}</p>
      </div>
    </div>
    <!-- 通知end -->

    <!-- 优惠商品 -->
    <div class="discounts eliminate">
      <ul class="eliminate">
        <li v-for="(item,index) in CenterContentList" :key="index">
          <a>
            <img :src="item.ImgUrl" />
          </a>
        </li>
      </ul>
    </div>
    <!-- 优惠商品end -->

    <!-- 一口美妙时刻 -->
    <div>
      <!-- 轮播 -->
      <div>
        <img class="imgList textImgList" :src="this.textImgList1.TabImgUrl" />
        <swiper_t v-if="SaleList.length!=0">
          <div
            class="swiper-slide"
            v-for="(item,index) in SaleList[0]"
            :key="index"
            @click="toPath(item)"
          >
            <a href="javascript:;;" class="eliminate">
              <img :src="item.ImgUrl" style="width: 100%;height:auto;" alt />
              <div class="SaleList_txt float_l">{{item.Name}}</div>
              <div class="price_txt">
                <span>￥{{item.Price}}</span>
                <span>/{{item.Size | fontlenght(7)}}</span>
              </div>
            </a>
          </div>
        </swiper_t>
        <img class="imgList" :src="this.textImgList2.TabImgUrl" />
        <swiper_t v-if="SaleList.length!=0">
          <div class="swiper-slide" v-for="(item,index) in SaleList[1]" :key="index" @click="toPath(item)">
            <a href="javascript:;;" class="eliminate">
              <img :src="item.ImgUrl" style="width: 100%;height:auto;" alt />
              <div class="SaleList_txt float_l">{{item.Name}}</div>
              <div class="price_txt">
                <span>￥{{item.Price}}</span>
                <span>/{{item.Size | fontlenght(7)}}</span>
              </div>
            </a>
          </div>
        </swiper_t>
        <img class="imgList" :src="this.textImgList3.TabImgUrl" />
        <swiper_t v-if="SaleList.length!=0">
          <div class="swiper-slide" v-for="(item,index) in SaleList[2]" :key="index" @click="toPath(item)">
            <a href="javascript:;;" class="eliminate">
              <img :src="item.ImgUrl" style="width: 100%;height:auto;" alt />
              <div class="SaleList_txt float_l">{{item.Name}}</div>
              <div class="price_txt">
                <span>￥{{item.Price}}</span>
                <span>/{{item.Size | fontlenght(7)}}</span>
              </div>
            </a>
          </div>
        </swiper_t>
      </div>
    </div>
    <div class="empty_box"></div>
  </div>
</template>

<script>
import Vue from "vue";
import lay_head from "@/components/layout/head";
export default {
  data() {
    return {
      SwiperBannerList: [],
      AbsoluteBannerList: [],
      TopIconList: [],
      CenterContentList: [],
      textImgList1: [],
      textImgList2: [],
      textImgList3: [],
      SaleList: [],
      NoticeList: []
    };
  },
  components: {
    lay_head
  },
  mounted() {
    this.pageInit();
  },
  methods: {
    pageInit() {
      this._getIndexData(res => {
        // console.log(res);
        this.SwiperBannerList = res.SwiperBannerList;
        this.AbsoluteBannerList = res.AbsoluteBannerList;
        this.TopIconList = res.TopIconList;
        this.CenterContentList = res.CenterContentList;
        this.textImgList1 = res.SaleList[0];
        this.textImgList2 = res.SaleList[1];
        this.textImgList3 = res.SaleList[2];
        this.NoticeList = res.NoticeList;

        res.SaleList.map(item => {
          this.SaleList.push(JSON.parse(item.CakeList));
        });
        this.SaleList.map(item => {
          item.map(item => {
            item.ImgUrl = this.$global.setUrl(item);
          });
        });
      });
    },

    toPath(item) {
      this.$router.push({
        path: "/show",
        query: {
          City: this.$store.state.City,
          SupplyNo: item.SupplyNo,
          Name: item.Name,
          ID: item.Id || item.ID,
          Size: item.Size,
          Sort: item.Sort,
          Price: item.Price,
          OType: item.OType,
          Num: item.Num,
          ImgUrl: item.ImgUrl
        }
      });
    },

    _getIndexData(callback) {
      this.$apis.getIndexData().then(res => {
        callback(res.data.Tag.mainresult);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#index {
  // 轮播
  .box {
    .title {
      display: inline-block;
      width: 100vw;
      height: 9.6vw;
    }
    #top_carousel {
      width: 91.46vw;
      height: 48vw;
      margin: 0 auto;

      .top_carousel {
        width: 100%;
        height: 100%;
        border-radius: 2.133vw;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  // 吐司活动
  .tusi {
    display: block;
    width: 91.4667vw;
    height: 22.93vw;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }

  // 商品列表
  .TopIconList {
    padding: 0 6.667vw;
    padding-bottom: 5.334vw;

    ul {
      li {
        float: left;
        text-align: center;
        width: 15.8667vw;
        margin-right: 7.3vw;
        white-space: nowrap;
        &:nth-child(4) {
          margin-right: 0 !important;
        }

        a {
          font-size: 3.2vw;

          img {
            width: 13.8667vw;
            height: 13.8667vw;
            display: block;
            margin: 0 auto;
            margin-top: 4.2667vw;
          }

          p {
            margin-top: 2.9334vw;
          }
        }
      }
    }
  }

  // 通知
  .notification {
    height: 15vw;
    margin: 0 auto;
    color: #1fb1b8;
    position: relative;
    overflow: hidden;
    border-top: 2.1334vw solid #fafafa;
    border-bottom: 2.1334vw solid #fafafa;
    box-sizing: border-box;

    .notification_text {
      display: inline;
      width: 9.6vw;
      height: 4.8vw;
      line-height: 4.8vw;
      text-align: center;
      margin-left: 4.2667vw;
      background: #1fb1b8;
      margin-top: 3vw;
      border-radius: 1.0667vw;
      color: #fff;
    }

    .roll {
      position: relative;
      margin-right: 6.4vw;
      width: 78.4vw;
      height: 100%;
      top: 0;
      overflow: hidden;
      p {
        height: 4.8vw;
        line-height: 4.8vw;
        position: absolute;
        top: 3vw;
        white-space: nowrap;
        animation: play 25s linear infinite;
        @keyframes play {
          from {
            transform: translateX(30%);
          }
          to {
            transform: translateX(-100%);
          }
        }
      }
    }
  }

  // 优惠商品
  .discounts {
    padding: 4.2667vw;
    box-sizing: border-box;

    ul {
      li {
        width: 44.533vw;
        height: 26.667vw;
        margin-right: 2.4vw;
        margin-bottom: 2.4vw;
        border-radius: 1.6vw;
        overflow: hidden;
        float: left;
        &:nth-child(even) {
          margin-right: 0;
        }

        a {
          content: "";
          display: block;
          clear: both;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }

  // 一口美妙时刻
  .textImgList {
    height: 40vw;
    border-top: 2.1334vw solid #fafafa;
  }

  .top_txt {
    width: 100%;
    height: 40vw;
    border-top: 2.1334vw solid #fafafa;
    box-sizing: border-box;
  }

  .SaleList_txt {
    width: 40.5vw;
    height: 10.667vw;
    margin: 0 auto;
    margin-top: 1.334vw;
    overflow: hidden;
    line-height: 5.33vw;
    font-weight: bold;
    font-size: 3.7333vw;
  }

  .price_txt {
    width: 31.5vw;
    margin: 0 auto;

    span {
      &:nth-child(1) {
        color: #cc2825;
        font-size: 4.2667vw;
      }
      &:nth-child(2) {
        color: #999;
        font-size: 3.7333vw;
      }
    }
  }

  .empty_box {
    height: 12vw;
    width: 100%;
  }
}
</style>
