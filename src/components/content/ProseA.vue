<script setup>
// import resolveConfig from 'tailwindcss/resolveConfig';
// import tailwindConfig from '@@/tailwind.config.js';
// const { theme: { colors: { primary: { [500]: primaryColor } } } } = resolveConfig(tailwindConfig);
const primaryColor = '#E2007D';
</script>

<template>
    <a>
        <slot></slot>
    </a>
</template>

<style scoped>
a {
    position: relative;
    display: inline-block;
    outline: none;
    color: v-bind('primaryColor');
    vertical-align: bottom;
    text-decoration: none;
}

a:hover {
    color: white;
}

a:hover::before, a:focus::before {
    opacity: 1;
    transform: scale(1);
}

a::before {
    position: absolute;
    top: 0;
    left: -5px;
    z-index: -1;
    box-sizing: content-box;
    padding: 0 5px;
    width: 100%;
    height: 100%;
    background-color: v-bind('primaryColor');
    content: '';
    opacity: 0;
    transition: transform 0.2s, opacity 0.2s;
    transition-timing-function: cubic-bezier(0.25,0.25,0.325,1.39);
    transform: scale(0);
}
</style>
