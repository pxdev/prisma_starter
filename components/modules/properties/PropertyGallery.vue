<script setup>
const props = defineProps({
  media: {
    type: Array,
    required: true,
    default: () => [],
  }
});
const thumbsSwiper = ref(null);

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
}

</script>

<template>

  <swiper
      :modules="[SwiperFreeMode, SwiperNavigation, SwiperThumbs]"
      :navigation="true"
      :spaceBetween="10"
      :thumbs="{ swiper: thumbsSwiper }"
      class="mySwiper2"
  >
    <swiper-slide v-for="image in props.media ">
      <img alt="" :src="`/uploads${image.path}`" />
    </swiper-slide>

  </swiper>
  <swiper
      :freeMode="true"
      :modules="[SwiperFreeMode, SwiperNavigation, SwiperThumbs]"
      :slidesPerView="4"
      :spaceBetween="10"
      :watchSlidesProgress="true"
      class="mySwiper"
      @swiper="setThumbsSwiper"
  >
    <swiper-slide v-for="image in props.media ">
      <img alt="" :src="`/uploads${image.path}`" />
    </swiper-slide>

  </swiper>
</template>

