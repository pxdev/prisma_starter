// https://nuxt.com/docs/api/configuration/nuxt-config
import pkg from "./package.json";

export default defineNuxtConfig({
  devtools: { enabled: false },

  typescript: {
    strict: false,
  },
  runtimeConfig: {
    public: {
      version: pkg.version,
    },
    mailerUser: "",
    mailerPass: "",
    mailerLog: "",
    mailerDriver: "",
    mailerHost: "",
    mailerPort: "",
    mailerSmtpTls: "",
    mailerFromAddress: "",
    mailerToAddress: "",
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  plugins: ["~/plugins/error-handler.js"],

  modules: [
    "@vueuse/nuxt",
    "@nuxt/ui",
    "nuxt-icon",
    "@nuxtjs/fontaine",
    "@nuxtjs/google-fonts",
    "@nuxtjs/i18n",
    "nuxt-file-storage",
    "nuxt-swiper",
    "nuxt-mailer",
    "@sidebase/nuxt-auth",
  ],
  auth: {
    isEnabled: true,
  },
  fileStorage: {
    mount: "public/uploads",
  },
  i18n: {
    defaultLocale: "en",
    lazy: true,
    langDir: "locales/",
    locales: [
      {
        code: "en",
        flag: "flag:us-4x3",
        iso: "en-US",
        dir: "ltr",
        name: "English",
        file: "en.js",
      },
    ],
  },

  colorMode: {
    preference: "light",
    fallback: "light",
  },

  ui: {
    icons: ["solar"],
  },

  fontMetrics: {
    fonts: ["Cairo"],
  },

  googleFonts: {
    display: "swap",
    families: {
      Cairo: [300, 400, 500, 700, 900],
    },
    download: false,
    useStylesheet: true,
  },
  build: {
    transpile: ["gsap"],
  },
});
