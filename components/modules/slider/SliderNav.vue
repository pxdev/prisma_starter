<script setup>
// Using Swiper instance
const swiper = useSwiper()

// Defining component props
const props = defineProps({
    current: {
        type: Number,
        default: 1,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
})
</script>

<template>
    <!-- Slider navigation container -->
    <div class="slider-nav bottom-0 p-6 absolute right-[5%] z-50 flex items-center" dir="ltr">
        <!-- Previous button -->
        <div class="swiper-circle cursor-pointer swiper-prev group" @click="swiper.slidePrev()">
            <div
                class="container-inner w-[65px] h-[45px] relative flex justify-center items-center after:h-[0.5px] after:bg-white after:w-[45px] after:absolute after:transition-all after:left-8 group-hover:after:left-6 group-hover:after:w-[25px]"
            >
                <!-- Left arrow icon -->
                <icon
                    class="w-8 h-8 group-hover:-translate-x-1/3 transition text-white"
                    name="ri:arrow-drop-left-fill"
                />
                <!-- Circle SVG for animation -->
                <svg class="circle h-[45px] w-[45px] absolute" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g
                        class="circle-wrap"
                        fill="none"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width="0.5"
                    >
                        <circle
                            class="stroke-white/60 transition-all duration-500 ease-in-out"
                            cx="12"
                            cy="12"
                            r="10.5"
                        />
                    </g>
                </svg>
            </div>
        </div>

        <!-- Slider counter -->
        <div v-if="count" class="slider-counter relative mx-10 text-white flex items-center">
            <span class="slider-current-index mx-3">{{ useNumberFormatter(current) }}</span>
            <span class="slider-counter-delimiter h-[25px] border-r rotate-[30deg]" />
            <span class="slider-total-index mx-3 text-xl">{{ useNumberFormatter(count) }}</span>
        </div>

        <!-- Next button -->
        <div class="swiper-circle cursor-pointer swiper-next group" @click="swiper.slideNext()">
            <div
                class="container-inner w-[65px] h-[45px] relative flex justify-center items-center after:h-[0.5px] after:bg-white after:w-[45px] after:absolute after:transition-all after:right-8 group-hover:after:right-6 group-hover:after:w-[25px]"
            >
                <!-- Right arrow icon -->
                <icon
                    class="w-8 h-8 group-hover:translate-x-1/3 transition text-white"
                    name="ri:arrow-drop-right-fill"
                />
                <!-- Circle SVG for animation -->
                <svg class="circle h-[45px] w-[45px] absolute" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g
                        class="circle-wrap"
                        fill="none"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width="0.5"
                    >
                        <circle
                            class="stroke-white/60 transition-all duration-500 ease-in-out"
                            cx="12"
                            cy="12"
                            r="10.5"
                        />
                    </g>
                </svg>
            </div>
        </div>
    </div>
</template>

<style>
/* Circle animation for the swiper circle */
.swiper-circle .circle circle {
    stroke-dasharray: 95;
    stroke-dashoffset: 0;
}

/* Animation on hover for the swiper circle */
.swiper-circle:hover .circle circle {
    stroke-dasharray: 95;
    stroke-dashoffset: 95;
}
</style>
