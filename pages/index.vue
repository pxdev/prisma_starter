<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const mainBanner = ref()
let ctx


onMounted(() => {

    ctx = gsap.context((self) => {

        const banner = self.selector('.banner')
        const headingA = self.selector('.heading-a')

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: mainBanner.value,
                start: 'center center',
                end: '+=300%',
                anticipatePin: 1,
                pin: true,
                scrub: 1
            }
        })

        tl.to(banner, {
            width: '50%',
            duration: 1,
        })
        tl.to(headingA, {
            duration: 1,
            opacity: 0,
         })

    }, mainBanner.value) // <- Scope!


})

onUnmounted(() => {
    ctx.revert() // <- Easy Cleanup!
})

</script>

<template>

  <loader></loader>

    <main>


        <section ref="mainBanner" class="panel overflow-hidden bg-primary-800/100 h-screen flex items-center justify-center center relative">
            <div class="banner absolute bottom-0 right-0 overflow-hidden  mx-auto h-[450px] z-20">
                <img alt=""
                     class=" absolute object-cover w-full h-full"
                     src="/images/arabic-happy-family-lifestyle-moments-at-home-2023-11-27-05-02-21-utc.jpg">
            </div>

            <div class="relative flex-1 z-30 text-white">
                <h1 class="heading-a text-5xl font-black text-center mb-10">If you pay attention to</h1>
            </div>

<!--            <div class=" absolute bg-gradient-to-b from-primary-900/70 from-0% to-80% object-cover w-full h-full z-20"></div>-->
            
        </section>
        <section class="panel h-screen flex items-center bg-red-15 center column gradient-blue text-dark">
            <div class="text-center">
            </div>
            <u-container>
                <div class="flex flex-col gap-10">
                    <div class="box h-48 w-48 bg-teal-100 gradient-green"></div>
                    <div class="box h-48 w-48 bg-teal-200 gradient-green"></div>
                    <div class="box h-48 w-48 bg-teal-300 gradient-green"></div>
                </div>
            </u-container>
        </section>
        <section class="panel h-screen bg-red-200 center gradient-orange column text-dark">
        </section>
    </main>
</template>

<style lang="css">

</style>
