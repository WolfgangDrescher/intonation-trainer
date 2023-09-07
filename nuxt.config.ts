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
    runtimeConfig: {
        public: {
            dataBaseUrl: '/data/{1}/{0}',
        },
    },
    vite: {
        worker: {
            format: 'es',
        },
        optimizeDeps: {
            exclude: ['verovio'],
        },
    },
    nitro: {
        publicAssets: [
            {
                baseURL: 'data',
                dir: fileURLToPath(new URL('./data', import.meta.url)),
                maxAge: 3600,
            },
        ],
    },
    i18n: {
        strategy: 'prefix_except_default',
        locales: [
            { code: 'de', iso: 'de-DE', file: 'de.yaml', dir: 'ltr' },
        ],
        defaultLocale: 'de',
        langDir: 'locales/',
    },
    content: {
        // defaultLocale: 'de',
        sources: {
            exercises: {
                driver: 'github',
                repo: 'WolfgangDrescher/intonation-trainer-data',
                branch: 'master',
                // prefix: '/exercises',
                // dir: "exercises",
            },
        },
    },
    alias: {
        pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs',
    },
});
