import { fileURLToPath } from 'node:url';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: 'src/',
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/i18n',
        '@nuxt/content',
        '@pinia/nuxt',
        'nuxt-icon',
        '@nuxtjs/google-fonts',
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
                prefix: '/exercises',
                dir: "exercises",
            },
        },
    },
    googleFonts: {
        stylePath: 'css/fonts.css',
        download: true,
        preload: true,
        prefetch: true,
        preconnect: true,
        display: 'swap',
        families: {
            'Vollkorn': {
                wght: [400, 700],
                ital: [400],
            },
        },
    },
});
