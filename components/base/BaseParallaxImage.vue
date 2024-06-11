<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
    src: {
        type: String,
        required: true
    }
})

const parallax = ref()
let ctx

onMounted(() => {

    ctx = gsap.context((self) => {
        const parallaxElement = self.selector('.parallax-element')
        const parallaxImage = self.selector('.parallax-img')
        const parallaxLoader = self.selector('.parallax-loader')

        //  parallax.value.addEventListener('mouseenter', () => {
        //     gsap.to(parallaxImage, {
        //         scale: 1.1,
        //         duration: 0.5
        //     })
        // })
        //  parallax.value.addEventListener('mouseleave', () => {
        //     gsap.to(parallaxImage, {
        //         scale: 1,
        //         duration: 0.5
        //     })
        // })


        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: parallax.value,
                start: 'top bottom',
                end: '+=100%',
                scrub: 1
            }
        })

        tl.from(parallaxElement, {
            width: '10%',
            duration: 4,
        })



        tl.to(parallaxLoader, {
            alpha: 0,
            duration: 2,
            ease: 'none'
        })

        tl.from(parallaxImage, {
            scale: 1.1,
            width: '100%',
            duration: 4,
            ease: 'none'
        })

        tl.to(parallaxImage, {
            force3D: true,
            duration: 4,
            scale: 1.1,
            ease: 'none'
        })

        tl.to(parallaxElement, {
            height: '80%',
            y: '20%',
            yoyo: true,
            duration: 10,
        })


    }, parallax.value)

})


onUnmounted(() => {
    ctx.revert()
})

</script>

<template>
    <div ref="parallax">
        <div  class="parallax-element bg-primary-100 w-full h-full overflow-hidden relative">
            <div class="parallax-loader absolute w-full h-full inset-0 bg-black z-10"></div>
            <img :src="props.src" alt="" class="parallax-img absolute w-full h-full object-cover">
        </div>
    </div>
</template>

