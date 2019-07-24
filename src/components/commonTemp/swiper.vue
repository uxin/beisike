<template>
  <div>
    <div class="swiper-container swiper-container-horizontal swiper-container-free-mode">
      <div class="swiper-wrapper" style="transform: translate3d(0px, 0px, 0px);">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.pageInit();
  },
  methods: {
    pageInit() {
      this.$nextTick(()=>{
        new Swiper(".swiper-container", {
        pagination: ".swiper-pagination",
        paginationClickable: false,
        freeMode: true,
        slidesPerView: 2.17,
        spaceBetween: -10,
      });
      })
    }
  }
};
</script>
<style scoped lang="scss">
// 轮播
.swiper-container {
  background: #fafafa;


  .swiper-wrapper {
    height: 67.6667vw !important;

    .swiper-slide {
      margin-top: 3.2vw !important;
      margin-bottom: 6.4vw !important;
      width: 41.6vw !important;
      height: 58.2vw !important;
      padding: 4vw 0 !important;
      margin-left: 3.2vw !important;
      margin-right: 0 !important;
      background: #fff;
      border-radius: 2vw;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      box-sizing: border-box;

      a {
        img {
          width: 32vw !important;
          height: 32vw !important;
          display: block;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>