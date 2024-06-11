<script setup>


const homeSlider = ref(null)

const sliderCurrent = ref(0)
const sliderCount = ref(0)

const onSwiperSlideChange = (swiper) => {
    sliderCurrent.value = swiper.activeIndex + 1
    sliderCount.value = swiper.slides.length
}
const onSwiperInit = (swiper) => {
    sliderCount.value = swiper.slides.length
    sliderCurrent.value = swiper.activeIndex + 1
}


</script>

<template>
    <div>
        <client-only>
            <swiper ref="homeSlider" :creative-effect="{
                prev: {
                    translate: [0, '-50%', -1],
                    scale: 0.6,
                  },
                  next: {
                    translate: [0, '100%', 1],
                    scale:1,
                  },
                }"
                    :modules="[SwiperParallax, SwiperEffectCreative ]"
                    :parallax="true"
                    class="h-screen w-screen overflow-hidden"
                    effect="creative"
                    speed="800" @init="onSwiperInit" @slide-change="onSwiperSlideChange">
                <swiper-slide>
                    <div class="relative flex h-full w-full">
                        <div class="relative z-20 flex flex-1 items-center text-white">
                            <div class="flex-1">
                                <u-container>
                                    <div class="max-w-4xl">
                                        <p class="mb-2 inline-flex rounded p-1 text-lg">Al Narjis, North
                                            Riyadh, Riyadh</p>
                                        <h2 class="mb-6 text-7xl font-semibold leading-tight"
                                            data-swiper-parallax-scale="0.1">Villa 234 SQM Facing West
                                            on
                                            12m Width
                                            Street</h2>
                                    </div>
                                </u-container>
                            </div>
                        </div>
                        <div class="absolute bottom-0 left-0 z-20 flex">
                            <div class="bg-white p-10 details">
                                <div class="flex items-center divide-x space-x-12">
                                    <div class="flex flex-col gap-2 px-6">
                                        <icon class="h-8 w-8" name="hugeicons:bed-single-01" />
                                        <p class="text-gray-500">4 Beds</p>
                                    </div>
                                    <div class="flex flex-col gap-2 px-6">
                                        <icon class="h-8 w-8" name="hugeicons:bathtub-01" />
                                        <p class="text-gray-500">4 Baths</p>
                                    </div>
                                    <div class="flex flex-col gap-2 px-6">
                                        <icon class="h-8 w-8" name="hugeicons:tape-measure" />
                                        <p class="text-gray-500">440 </p>
                                    </div>
                                    <div class="flex flex-col gap-2 px-6">
                                        <p class="text-gray-500">Price</p>
                                        <p class="text-4xl font-semibold">230,450,000 </p>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center justify-center px-10 bg-primary-950/50">
                                <base-button :to="'/index2'">More Details</base-button>
                            </div>

                        </div>
                        <div
                            class="absolute inset-0 z-10 flex justify-between bg-gradient-to-t from-primary-950 to-primary-950/30"></div>
                        <div class="absolute h-full w-full img-wrap">
                            <img alt="" class="absolute inset-0 h-full w-full object-cover"
                                 src="/images/cozy-modern-loft-b.webp">
                        </div>
                    </div>
                </swiper-slide>

                <slider-nav :count="sliderCount" :current="sliderCurrent" />

            </swiper>

        </client-only>
    </div>
</template>
<style scoped>
.text {
    mask: url('/svg/circles-mask-whole.svg') no-repeat right;
    mask-composite: add;
    object-fit: cover;
}

.highlight {
    background-image: linear-gradient(120deg, #829698, #829698);
    background-repeat: no-repeat;
    background-size: 100% .3em;
    background-position: 0 80%;
    font-weight: inherit;
}

</style>
