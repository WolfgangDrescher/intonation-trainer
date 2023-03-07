<script setup>
import 'intonation-checker/style.css';
import IntonationChecker from 'intonation-checker';
import { createWorkerVerovioToolkit } from 'vue-verovio-canvas';

const { verovioWorker } = useVerovioWorker();
const toolkit = createWorkerVerovioToolkit(verovioWorker);
</script>

<template>
    <IntonationChecker :toolkit="toolkit" />
</template>
