// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: 'src/',
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/i18n-edge',
        '@nuxt/content',
        '@pinia/nuxt',
    ],
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
});
