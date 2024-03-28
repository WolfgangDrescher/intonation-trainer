<script setup>
const localePath = useLocalePath();
const isOpen = ref(false);

function toggle() {
    isOpen.value = !isOpen.value;
}
</script>

<template>
    <header class="bg-primary-500 text-white">
        <div class="flex justify-between items-center py-2 px-4 gap-4">
            <div class="grow flex items-center gap-4">
                <div class="font-extrabold text-lg md:text-2xl">
                    <NuxtLink :to="localePath('/')" @click="isOpen = false">
                        {{ `${$t('app.title')} ${$t('app.subtitle')}`}}
                    </NuxtLink>
                </div>
            </div>
        </div>
        <TheNavigation :open="isOpen" @item-selected="isOpen = false" />
    </header>
</template>
