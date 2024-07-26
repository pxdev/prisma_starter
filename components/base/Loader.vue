<script setup>
import gsap from "gsap";

let ctx;
const loader = ref();

onMounted(() => {
  ctx = gsap.context((self) => {
    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";
    const svg = self.selector(".svg-path");
    const loaderWrap = self.selector(".loader-wrap");
    const loaderWrapContent = self.selector(".loader-wrap-content");

    const tl = gsap.timeline();

    tl.to(loaderWrapContent, {
      delay: 1,
      y: -100,
      opacity: 0,
    });

    tl.to(svg, {
      duration: 0.5,
      attr: { d: curve },
      ease: "power2.easeIn",
    }).to(svg, {
      duration: 0.5,
      attr: {
        d: flat,
      },
      ease: "power2.easeOut",
    });

    tl.to(loaderWrap, {
      y: -1500,
    });

    tl.to(loaderWrap, {
      zIndex: -1,
      display: "none",
    });
  }, loader.value);
});

onUnmounted(() => {
  ctx.revert();
});
</script>

<template>
  <div ref="loader">
    <div
      class="loader-wrap fixed flex items-center justify-center h-[110svh]  w-screen z-50 top-0 left-0"
    >
      <svg
        class="absolute inset-0 h-[102svh] w-screen fill-primary-900"
        preserveAspectRatio="none"
        viewBox="0 0 1000 1000"
      >
        <path
          id="svg"
          class="svg-path"
          d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"
        ></path>
      </svg>
      <div class="loader-wrap-content relative">
        <icon class="w-16 h-16 text-white" name="svg-spinners:pulse-3"></icon>
      </div>
    </div>
  </div>
</template>
