// https://nuxt.com/docs/api/configuration/nuxt-config
import pkg from './package.json'

export default defineNuxtConfig({
    devtools: { enabled: false },
    typescript: {
        strict: false,
    },
    runtimeConfig: {
        public: {
            version: pkg.version,
            JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET,
        },
    },

    components: [
        {
            path: '~/components',
            pathPrefix: false,
        },
    ],

    plugins: ['~/plugins/error-handler.js'],

    modules: [
        '@pinia/nuxt',
        '@vueuse/nuxt',
        '@nuxt/ui',
        'nuxt-icon',
        '@nuxtjs/fontaine',
        '@nuxtjs/google-fonts',
        '@nuxtjs/i18n',
        'nuxt-file-storage',
    ],
    fileStorage: {
        mount: 'public/uploads',
    },
    i18n: {
        defaultLocale: 'en',
        lazy: true,
        langDir: 'locales/',
        locales: [
            {
                code: 'en',
                flag: 'flag:us-4x3',
                iso: 'en-US',
                dir: 'ltr',
                name: 'English',
                file: 'en.js',
            },
            {
                code: 'ar',
                flag: 'flag:sa-4x3',
                iso: 'ar-SA',
                dir: 'rtl',
                name: 'Arabic',
                file: 'ar.js',
            },
        ],
    },

    colorMode: {
        preference: 'light',
        fallback: 'light',
    },

    ui: {
        icons: ['solar'],
    },

    fontMetrics: {
        fonts: ['Noto Kufi Arabic'],
    },

    googleFonts: {
        display: 'swap',
        families: {
            'Noto+Kufi+Arabic': [100, 200, 300, 400],
        },
    },
    build: {
        transpile: ['gsap'],
    },
})
