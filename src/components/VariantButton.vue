<script setup>
defineProps({
    to: String,
    active: Boolean,
});
</script>

<template>
    <NuxtLink :to="to" class="px-4 py-3 bg-primary-400 text-white rounded" :class="{'bg-primary-600': active}">
        <slot></slot>
    </NuxtLink>
</template>
