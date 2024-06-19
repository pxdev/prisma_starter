<script setup>
const homeSlider = ref(null);

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
  <div>
    <swiper
      dir="auto"
      ref="homeSlider"
      :creative-effect="{
        prev: {
          translate: [0, '-50%', -1],
          scale: 0.6,
        },
        next: {
          translate: [0, '100%', 1],
          scale: 1,
        },
      }"
      :modules="[SwiperParallax, SwiperEffectCreative]"
      :parallax="true"
      class="h-screen w-screen overflow-hidden"
      effect="creative"
      :speed="800"
      @init="onSwiperInit"
      @slide-change="onSwiperSlideChange"
    >
      <swiper-slide v-for="n in 4">
        <div class="relative flex h-full w-full">
          <div
            class="absolute inset-0 z-10 flex justify-between bg-gradient-to-t from-primary-950 to-primary-950/30"
          ></div>
          <div class="absolute h-full w-full img-wrap">
            <img
              alt=""
              class="absolute inset-0 h-full w-full object-cover"
              src="/images/cozy-modern-loft-b.webp"
            />
          </div>
        </div>
      </swiper-slide>
      <div class="absolute inset-0 z-20 flex flex-1 items-center text-white">
        <div class="flex-1">
          <u-container>
            <div class="max-w-4xl mx-auto">
              <div class="text-center space-y-2">
                <h1 class="text-6xl text-center text-white">
                  Amazing House Architect
                </h1>
                <p>Start With Our Listing.</p>
              </div>
              <home-search />
            </div>
          </u-container>
        </div>
      </div>
      <slider-nav :count="sliderCount" :current="sliderCurrent" />
    </swiper>
  </div>
</template>
<style scoped>
.text {
  mask: url("/svg/circles-mask-whole.svg") no-repeat right;
  mask-composite: add;
  object-fit: cover;
}

.highlight {
  background-image: linear-gradient(120deg, #829698, #829698);
  background-repeat: no-repeat;
  background-size: 100% 0.3em;
  background-position: 0 80%;
  font-weight: inherit;
}
</style>
