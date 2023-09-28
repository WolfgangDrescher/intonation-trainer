<script setup>
import { Howl } from 'howler';

const props = defineProps({
    url: String,
    keyboardShortcuts: Boolean,
});

const audio = new Howl({
    src: [props.url],
    html5: true, // allow playing audio on muted phones
});

const isReady = ref(false);
const isPlaying = ref(false);
const seek = ref(0);

if (audio.state() === 'loaded') {
    isReady.value = true;
}

audio.on('load', () => {
    // isReady.value = true;
});

audio.on('play', () => {
    isPlaying.value = true;
    requestAnimationFrame(updateLoop);
});

audio.on('end', () => {
    isPlaying.value = false;
});

audio.on('pause', () => {
    isPlaying.value = false;
});

audio.on('stop', () => {
    isPlaying.value = false;
});

audio.on('seek', () => {
    updateLoop();
});

function updateLoop() {
    seek.value = audio.seek() || 0;
    if (audio.playing()) {
        requestAnimationFrame(updateLoop);
    }
}

function toggle() {
    if (audio.state() !== 'loaded') return;
    if (audio.playing()) {
        audio.pause();
        audio.stop();
    } else {
        audio.play();
    }
}
</script>

<template>
    <div @click="toggle" class="cursor-pointer">
        <Icon v-if="isPlaying" name="heroicons:pause-circle-solid" />
        <Icon v-else name="heroicons:play-circle-solid" />
    </div>
</template>
