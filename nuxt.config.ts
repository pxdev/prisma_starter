// https://nuxt.com/docs/api/configuration/nuxt-config
import pkg from "./package.json";

export default defineNuxtConfig({

   alias: {
    cookie: "cookie",
  },

  typescript: {
    strict: false,
  },

  runtimeConfig: {
    public: {
      version: pkg.version,
      authJs: {
        baseUrl: process.env.NUXT_NEXTAUTH_URL, // The URL of your deployed app (used for origin Check in production)
        verifyClientOnEveryRequest: true, // whether to hit the /auth/session endpoint on every client request
      },
    },
    authJs: {
      secret: process.env.NUXT_NEXTAUTH_SECRET, // You can generate one with `openssl rand -base64 32`
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
    "@hebilicious/authjs-nuxt",
    'nuxt-mapbox',
  ],

  mapbox: {
    accessToken: 'pk.eyJ1IjoiZHJweGRldiIsImEiOiJjbHFtNHN6eTkycm12MmptZXBhNmNid3VxIn0.evaD_4vhETepxx_9IfCAVw'
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

  compatibilityDate: "2024-07-23",
});
