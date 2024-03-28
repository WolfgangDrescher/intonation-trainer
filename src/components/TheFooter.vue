<script setup>
const localePath = useLocalePath();
</script>

<template>
    <footer class="py-6 md:py-12 bg-primary-500 text-white">
        <Container>
            <div class="grid md:grid-cols-3 gap-4">
                <div>
                    <h4 class="text-lg font-bold mb-2">{{ $t('sitemap') }}</h4>
                    <ul class="grid grid-cols-2 gap-x-2">
                        <li>
                            <NuxtLink :href="localePath('index')">{{ $t('home') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink :href="localePath('about')">{{ $t('about') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink :href="localePath('exercises')">{{ $t('exercises') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink :href="localePath('docs')">{{ $t('documentation') }}</NuxtLink>
                        </li>
                    </ul>
                </div>
                <div></div>
                <div>
                    <h4 class="text-lg font-bold mb-2">{{ $t('legal') }}</h4>
                    <ul class="grid grid-cols-2 gap-x-2">
                        <li>
                            <NuxtLink :href="localePath('legal-notice')">{{ $t('legalNotice') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink :href="localePath('privacy-policy')">{{ $t('privacyPolicy') }}</NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </Container>
    </footer>
</template>
