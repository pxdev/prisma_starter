<script setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const mainBanner = ref();
let ctx;

const files = ref([]);

onMounted(() => {
  ctx = gsap.context((self) => {
    const bannerSlider = self.selector(".banner-slider");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainBanner.value,
        start: "center center",
        end: "+=100%",
        scrub: 1,
      },
    });

    tl.to(bannerSlider, {
      duration: 3,
    });
  }, mainBanner.value);
});

onUnmounted(() => {
  ctx.revert();
});

const searchParams = ref({});
</script>

<template>
  <base-scroll>
    <loader />

    <main>
      <section
        ref="mainBanner"
        class="panel overflow-hidden relative bg-gray-950 h-screen w-full"
      >
        <home-slider class="absolute h-full" />
      </section>
      <section class="panel w-full bg-white">
        <u-container>
          <div class="py-24 grid gap-6 items-center lg:grid-cols-2">
            <base-parallax-image
              class="w-full h-[450px]"
              src="/images/cozy-modern-loft-b.webp"
            />
          </div>
        </u-container>
      </section>
      <section class="panel w-full">
        <u-container>
          <base-media-management v-model="files" />
        </u-container>
      </section>
    </main>
  </base-scroll>
</template>

<style lang="css"></style>
