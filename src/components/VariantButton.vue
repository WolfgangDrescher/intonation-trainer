<script setup>
defineProps({
    to: String,
    active: Boolean,
});
</script>

<template>
    <NuxtLink :to="to" class="px-4 py-3 border border-primary-500 rounded hover:ring-purple-200 hover:ring-4 hover:border-purple-300" :class="{'bg-primary-500 text-white': active, 'text-primary-500': !active}">
        <slot></slot>
    </NuxtLink>
</template>
