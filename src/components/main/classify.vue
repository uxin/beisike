<template>
  <div>
    <div class="classify_top eliminate">
      <div >
        <div v-for="(item,index) in tabTitle" :key="index" class="top_list float_l" :class="{'bor_btm':index==tabShow}"  @click="sel(index),claName(index)">{{item}}</div>
      </div>
      <!-- <div class="top_list float_r" @click="sel(2)">贝式严选</div> -->
    </div>
    <tab_list v-if="tabData.lenght!=0" :tablist="tabData"></tab_list>
  </div>
</template>
<script>
import tab_list from "@/components/main/classify_commodity";
export default {
  data() {
    return {
      tabList: [
        { title: "经典", mark: "KSK", list: [] },
        { title: "女神", mark: "NS", list: [] },
        { title: "伴手礼", mark: "JZ", list: [] },
        { title: "乳品", mark: "RP", list: [] }
      ],
      tabData: [],
      tabTitle:["自营","贝式严选"],
      tabShow:0
    };
  },
  mounted() {
    this.pageInit(); //初始化
  },
  methods: {
    pageInit() {
      this._getNsCakeCenter(res => {
        this.tabList.map((item, index) => {
          res.map(el => {
            if (el.SupplyNo.indexOf(item.mark) != -1) {
              el.ImgUrl = this.$global.setUrl(el);
              item.list.push(el);
            }
          });
        });
        this.sel(0); //初始化就有1条数据
      });
    },
    sel(num) {
      if (num == 0) {
        this.tabData = this.tabList.slice(0, 3);
      } else {
        this.tabData = this.tabList.slice(3);
      }
    },

    // 样式切换
    claName(index){
      this.tabShow=index;
    },
    _getNsCakeCenter(callBcak) {
      this.$apis.getNsCakeCenter().then(res => {
        callBcak(res.data.Tag.cakelist);
      });
    }
  },
  components: {
    tab_list
  }
};
</script>
<style scoped lang="scss">
.classify_top {
  .bor_btm {
    border-bottom: 0.5333vw solid #1db0b8 !important;
    color: #1db0b8;
  }

  .top_list {
    width: 50%;
    height: 12vw;
    line-height: 12vw;
    font-size: 4.266vw;
    text-align: center;
    border-bottom: 0.2667vw solid #ccc;
  }
}
</style>