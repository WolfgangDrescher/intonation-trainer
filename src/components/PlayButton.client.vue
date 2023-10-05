<script setup>
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '@@/tailwind.config.js';

const {theme: {colors: {primary: {['500']: primary500} }}} = resolveConfig(tailwindConfig);

const props = defineProps({
    url: String,
    keyboardShortcuts: Boolean,
});

const howlerStore = useHowlerStore();

const audio = howlerStore.add(props.url).howler;

const isPlaying = ref(false);
const seek = ref(0);
const duration = ref(0);
const state = ref(audio.state());

audio.on('load', () => {
    state.value = 'loaded';
    // isReady.value = true;
    duration.value = audio.duration();
});

audio.on('loaderror', () => {
    state.value = 'loaderror';
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
    if (state.value === 'loaderror') return;
    if (state.value === 'unloaded') {
        state.value = 'loading';
    }
    if (audio.playing()) {
        howlerStore.stop(props.url);
    } else {
        howlerStore.play(props.url);
    }
}

const radius = 50;
const strokeWidth = 12;

function getCoords(radius, angle) {
    return {
        x: radius * Math.sin(Math.PI * 2 * angle / 360),
        y: radius * Math.cos(Math.PI * 2 * angle / 360),
    };
}

const audioSeekAngle = computed(() => {
    const s = parseFloat(seek.value ?? 0);
    const d = parseFloat(duration.value ?? 0);
    return d !== 0 ? s / d * 360 : 0;
});

const circlePath = computed(() => {
    const { x, y }  = getCoords(radius - strokeWidth / 2, audioSeekAngle.value ?? 0);
    return `M ${radius} ${strokeWidth / 2} A ${radius - strokeWidth / 2} ${radius - strokeWidth / 2} 0 ${audioSeekAngle.value > 180 ? 1 : 0} ${audioSeekAngle.value > 0 ? 1 : 0} ${radius + x} ${radius - y}`;
});

onUnmounted(() => {
    howlerStore.remove(props.url);
});
</script>

<template>
    <div class="w-[1em] flex justify-center">
        <div class="text-primary-500 flex items-center text-lg">
            <div v-if="state === 'loaderror'" class="text-red-500 flex items-center">
                <Icon name="heroicons:exclamation-triangle-solid" />
            </div>
            <div v-else-if="isPlaying" class="relative cursor-pointer flex items-center" @click="toggle">
                <Icon name="heroicons:pause-circle-solid" />
                <div class="absolute z-1 pointer-events-none w-[1.2em] h-[1.2em] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <svg :viewBox="`0 0 ${radius * 2} ${radius * 2}`" class="w-full h-full">
                        <g :stroke="primary500" fill="none" :stroke-width="strokeWidth">
                            <path :d="circlePath" />
                        </g>
                    </svg>
                </div>
            </div>
            <div v-else-if="state === 'loading'" class="flex items-center">
                <Icon name="heroicons:arrow-path" class="inline-block spin" />
            </div>
            <div v-else class="cursor-pointer flex items-center" @click="toggle">
                <Icon name="heroicons:play-circle-solid" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.spin {
    animation-name: spin;
    animation-duration: 2000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
