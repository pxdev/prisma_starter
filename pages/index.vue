<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const mainBanner = ref()
let ctx

const files = ref([])


onMounted(() => {

    ctx = gsap.context((self) => {

        const bannerSlider = self.selector('.banner-slider')

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: mainBanner.value,
                start: 'center center',
                end: '+=100%',
                scrub: 1
            }
        })

        tl.to(bannerSlider, {
            duration: 3
        })

    }, mainBanner.value)

})

onUnmounted(() => {
    ctx.revert()
})

</script>

<template>
    <!--    <loader />-->

    <main>
        <section ref="mainBanner" class="panel overflow-hidden relative bg-gray-950 h-screen w-full">
            <home-slider class="absolute h-full" />
        </section>
        <section class="panel  w-full">
            <u-container>
                <div class="py-24 grid gap-6 items-center grid-cols-2">
                    <base-parallax-image class="w-full h-[600px]" src="/images/cozy-modern-loft-b.webp" />
                    <home-search />
                </div>
            </u-container>
        </section>
        <section class="panel h-screen  center gradient-orange column text-dark">

            <base-media-management v-model="files"  />


        </section>
    </main>
</template>

<style lang="css">

</style>
