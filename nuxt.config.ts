import { fileURLToPath } from 'node:url';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: 'src/',
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/i18n-edge',
        '@nuxt/content',
        '@pinia/nuxt',
    ],
    vite: {
        worker: {
            format: 'es',
        },
    },
    i18n: {
        strategy: 'prefix_except_default',
        locales: [
            { code: 'de', iso: 'de-DE', file: 'de.yaml', dir: 'ltr' },
        ],
        defaultLocale: 'de',
        langDir: 'locales/',
        vueI18n: {
            fallbackLocale: 'de',
            legacy: false,
            locale: 'de',
        },
    },
    content: {
        // defaultLocale: 'de',
        sources: {
            root: {
                driver: 'fs',
                // prefix: '/data',
                base: fileURLToPath(new URL('./intonation-trainer-data', import.meta.url)),
            },
        },
    },
});
