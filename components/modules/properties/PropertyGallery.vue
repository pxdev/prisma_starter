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

const sliderCurrent = ref(0);
const sliderCount = ref(0);

const onSwiperSlideChange = (swiper) => {
  sliderCurrent.value = swiper.activeIndex + 1;
  sliderCount.value = swiper.slides.length;
};
const onSwiperInit = (swiper) => {
  sliderCount.value = swiper.slides.length;
  sliderCurrent.value = swiper.activeIndex + 1;
};

</script>

<template>
  <u-card v-if="media.length > 0" class="mb-6">
    <div class="mx-auto mb-4 bg-gray-900 relative w-full overflow-hidden">

      <swiper
          :modules="[SwiperFreeMode, SwiperNavigation, SwiperThumbs]"
          :thumbs="{ swiper: thumbsSwiper }"

          @init="onSwiperInit"
          @slide-change="onSwiperSlideChange"
      >

        <swiper-slide v-for="image in props.media ">
          <div class="w-full flex items-center justify-center overflow-hidden">
            <img :src="`/uploads${image.path}`" alt="" class="block w-full h-full object-cover"/>
          </div>
        </swiper-slide>

        <slider-nav v-if="media.length > 1" :count="sliderCount" :current="sliderCurrent"/>
      </swiper>

    </div>
    <div v-if="media.length > 1" class="mx-auto relative">
      <swiper
          :freeMode="true"
          :modules="[SwiperFreeMode, SwiperNavigation, SwiperThumbs]"
          :slidesPerView="4"
          :spaceBetween="10"
          :watchSlidesProgress="true"
          @swiper="setThumbsSwiper"
      >
        <swiper-slide v-for="image in props.media ">
          <img :src="`/uploads${image.path}`" alt=""/>
        </swiper-slide>

      </swiper>
    </div>
  </u-card>
</template>

