<template>
    <li>
        <NuxtLink
            v-bind="{ ...$props, ...$attrs }"
            class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 md:p-0"
            :class="{ active: $route.fullPath === $attrs.href }"
        >
            <slot></slot>
        </NuxtLink>
    </li>
</template>

<style scoped>
a.active {
    @apply text-primary-500;
}
</style>
