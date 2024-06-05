<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


gsap.registerPlugin(ScrollTrigger)

const main = ref()
let ctx

onMounted(() => {
    ctx = gsap.context((self) => {
        const boxes = self.selector('.box')
        boxes.forEach((box) => {
            gsap.to(box, {
                rotate: 360,
                scrollTrigger: {
                    trigger: box,
                    start: 'bottom bottom',
                    end: 'top 20%',
                    scrub: true
                }
            })
        })
    }, main.value) // <- Scope!
})

onUnmounted(() => {
    ctx.revert() // <- Easy Cleanup!
})
</script>

<template>
    <main>
        <section class="panel h-screen bg-red-50 center column gradient-blue text-dark"></section>
        <section ref="main" class="panel h-screen flex items-center bg-red-15 center column gradient-blue text-dark">
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
