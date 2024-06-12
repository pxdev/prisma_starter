<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
    src: {
        type: String,
        required: true,
    },
})

const parallax = ref()
let ctx

onMounted(() => {
    ctx = gsap.context((self) => {
        const parallaxElement = self.selector('.parallax-element')
        const parallaxImage = self.selector('.parallax-img')
        const parallaxLoader = self.selector('.parallax-loader')

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: parallax.value,
                start: 'top bottom',
                end: '+=100%',
                scrub: 1,
            },
        })

        tl.to(parallaxLoader, {
            duration: 1,
            opacity: 0,
        })

        tl.from(parallaxImage, {
            scale: 1.1,
            duration: 1,
        })
    }, parallax.value)
})

onUnmounted(() => {
    ctx.revert()
})
</script>

<template>
    <div ref="parallax">
        <div class="relative h-full w-full overflow-hidden parallax-element">
            <div class="absolute inset-0 z-10 h-full w-full bg-black parallax-loader"></div>
            <img :src="props.src" alt="" class="absolute h-full w-full object-cover parallax-img" />
        </div>
    </div>
</template>
