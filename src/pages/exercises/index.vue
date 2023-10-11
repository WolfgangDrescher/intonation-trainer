<script setup>
const { data } = await useAsyncData('exercises', () => queryContent('/exercises').find());
const localePath = useLocalePath();
const runtimeConfig = useRuntimeConfig();
const { t } = useI18n();
import { storeToRefs } from 'pinia'

const tableHeaders = [
    { value: 'audio', text: '', align: 'center' },
    { value: 'composer', text: t('composer') },
    { value: 'title', text: t('title') },
    { value: 'sluggifyInstrumentation', text: t('instrumentation') },
    { value: 'year', text: t('year') },
];

function sprintf(format, args) {
    return format?.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
}

function buildPath(fileName, exerciseId) {
    return sprintf(runtimeConfig.public.dataBaseUrl, [fileName, exerciseId]);
}

const { filteredElements } = useExerciseFilter(data.value);

const tableItems = computed(() => {
    return filteredElements.value.map(item => {
        return {
            _path: item._path,
            id: item._path.split('/').pop(),
            composer: item.composer,
            title: item.title,
            year: item.year,
            difficulty: item.difficulty,
            audioFilename: item.audioFilename,
            instrumentation: item.instrumentation,
            sluggifyInstrumentation: sluggifyInstrumentation(item.instrumentation),
            variants: item.variants,
        };
    });
});

const { difficulty } = storeToRefs(useExerciseFilterStore());

const variantCount = computed(() => {
    return filteredElements.value.reduce((total, exercise) => total + (difficulty.value ? exercise.variants.filter(v => v.difficulty === parseInt(difficulty.value, 10)).length : exercise.variants.length), 0);
});

const variantTotal = data.value.reduce((total, exercise) => total + exercise.variants.length, 0);
</script>

<template>
    <Container>
        <SectionContainer>
            <section>
                <Heading>{{ $t('exercises') }}</Heading>

                <ExerciseFilter />

                <div class="my-4 flex items-center">
                    {{ $t('nOutOfTotalExercisesFoundForSerachParams', {
                        n: filteredElements.length,
                        total: data.length,
                        variantCount,
                        variantTotal, 
                    }) }}
                </div>

                <DataTable :items="tableItems" :headers="tableHeaders" small>
                    <template #[`item.sluggifyInstrumentation`]="{ item }">
                        {{ item.sluggifyInstrumentation && $t(`instrumentation.${item.sluggifyInstrumentation}`) }}
                    </template>
                    <template #[`item.audio`]="{ item }">
                        <div class="text-center">
                            <PlayButton :url="buildPath(item.audioFilename, item.id)"></PlayButton>
                        </div>
                    </template>
                    <template #[`item.title`]="{ item }">
                        <!-- <NuxtLink :href="localePath({ name: 'exercises-id-variant', params: { id: item.id, variant: item.variantId } })"> -->
                        <div>
                            <NuxtLink :href="localePath({ name: 'exercises-id', params: { id: item.id } })">
                                {{ item.title }}
                            </NuxtLink>
                        </div>
                        <div v-if="item.variants.length > 1" class="text-xs flex gap-2">
                            <template v-for="variant in item.variants">
                                <div v-if="!difficulty || parseInt(difficulty, 10) === variant.difficulty">
                                    <NuxtLink :href="localePath({ name: 'exercises-id-variant', params: { id: item.id, variant: variant.id } })">
                                        {{ $t('variantName', {name: variant.id}) }}
                                    </NuxtLink>
                                </div>
                            </template>
                        </div>
                    </template>
                </DataTable>
            </section>
        </SectionContainer>
    </Container>
</template>
