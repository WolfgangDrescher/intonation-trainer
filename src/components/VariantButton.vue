<script setup>
defineProps({
    to: String,
    active: Boolean,
    difficulty: Number,
});
</script>

<template>
    <NuxtLink :to="to" class="px-4 py-3 border border-primary-500 rounded hover:ring-primary-200 hover:ring-4 hover:border-purple-300" :class="{'bg-primary-500 text-white': active, 'text-primary-500': !active}">
        <slot></slot>
        <div v-if="difficulty" class="ml-2 inline-block align-text-bottom">
            <Icon v-for="n in (difficulty ?? 0)" name="heroicons:star-solid" />
        </div>
    </NuxtLink>
</template>
