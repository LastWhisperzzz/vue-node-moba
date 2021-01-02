<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide
        ><img class="w-100" src="../assets/images/1.jpeg"
      /></swiper-slide>
      <swiper-slide
        ><img class="w-100" src="../assets/images/2.jpeg"
      /></swiper-slide>
      <swiper-slide
        ><img class="w-100" src="../assets/images/3.jpeg"
      /></swiper-slide>
      <div
        class="swiper-pagination text-right px-3 pb-1"
        slot="pagination"
      ></div>
    </swiper>
    <!-- end of swiper -->
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/variables';
.swiper-pagination {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, 'white');
    &.swiper-pagination-bullet-active {
      background: map-get($colors, 'info');
    }
  }
}
</style>
