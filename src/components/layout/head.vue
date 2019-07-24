<template>
  <div>
    <div class="head_top">
      <img src="@/assets/localtion.png" alt />
      <span class="s14 float_l">上海</span>
      <img src="@/assets/more.png" alt />
    </div>

    <div class="location_box">
      <div class="select_c">
        <!-- <span>选择城市</span> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    location() {}
  }
};
</script>
<style scoped lang="scss">
.head_top {
  width: 91.4667vw;
  height: 11.7333vw;
  line-height: 11.7333vw;
  margin: 0 auto;
  img:nth-child(1) {
    display: inline-block;
    width: 5vw;
    height: 5.8667vw;
    float: left;
    margin-top: 2.9333vw;
  }
  span {
    display: inline-block;
    margin: 0 1.0667vw;
    color: #333;
  }

  img:nth-child(3) {
    display: inline-block;
    width: 2.4vw;
    height: 4.2667vw;
    float: left;
    margin-top: 3.7333vw;
  }
  .location_box {
    background: rgb(255, 255, 255);
    position: fixed;
    width: 77.33vw;
    left: 11.47vw;
    top: 8.84vh;
    z-index: 3;
  }
}
</style>