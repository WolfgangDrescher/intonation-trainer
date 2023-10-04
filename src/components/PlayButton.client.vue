<script setup>

const props = defineProps({
    url: String,
    keyboardShortcuts: Boolean,
});

const howlerStore = useHowlerStore();

const audio = howlerStore.add(props.url).howler;

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
        howlerStore.stop(props.url);
    } else {
        howlerStore.play(props.url);
    }
}
</script>

<template>
    <div @click="toggle" class="cursor-pointer">
        <Icon v-if="isPlaying" name="heroicons:pause-circle-solid" />
        <Icon v-else name="heroicons:play-circle-solid" />
    </div>
</template>
