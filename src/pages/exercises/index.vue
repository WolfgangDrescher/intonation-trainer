<script setup>
const { data } = await useAsyncData('exercises', () => queryContent('/exercises').find());
const localePath = useLocalePath();
const runtimeConfig = useRuntimeConfig();
const { t } = useI18n();

const tableItems = data.value.reduce((accumulator, currentItem) => {
    currentItem.variants.forEach((variant) => {
        accumulator.push({
            _path: currentItem._path,
            id: currentItem.id,
            variantId: variant.id,
            composer: currentItem.composer,
            title: currentItem.variants.length === 1 ? currentItem.title : `${currentItem.title} – ${t('variantName', {name: variant.id})}`,
            year: currentItem.year,
            difficulty: currentItem.difficulty,
            audioFilename: currentItem.audioFilename,
            variantAudioFilename: variant.audioFilename,
            instrumentation: 'TODO'
        });
    });
    return accumulator;
}, []);

const tableHeaders = [
    { value: 'audio', text: '', align: 'center' },
    { value: 'composer', text: t('composer') },
    { value: 'title', text: t('title') },
    { value: 'instrumentation', text: 'instrumentation' },
    { value: 'year', text: t('year') },
    { value: 'difficulty', text: t('difficulty') },
];

function sprintf(format, args) {
    return format?.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
}

function buildPath(fileName, exerciseId) {
    return sprintf(runtimeConfig.public.dataBaseUrl, [fileName, exerciseId]);
}
</script>

<template>
    <Container>
        <SectionContainer>
            <section>
                <Heading>{{ $t('exercises') }}</Heading>

                <DataTable :items="tableItems" :headers="tableHeaders" small>
                    <template #[`item.audio`]="{ item }">
                        <div class="text-center">
                            <PlayButton :url="buildPath(item.audioFilename, item.variantId)"></PlayButton>
                        </div>
                    </template>
                    <template #[`item.title`]="{ item }">
                        <!-- <NuxtLink :href="localePath({ name: 'exercises-id-variant', params: { id: item.id, variant: item.variantId } })"> -->
                        <NuxtLink :to="`${item._path}/${item.variantId}`">
                            {{ item.title }}
                        </NuxtLink>
                    </template>
                    <template #[`item.difficulty`]="{ item }">
                        <Icon v-for="n in (item.difficulty ?? 0)" name="heroicons:star-solid" />
                        <Icon v-for="n in 3 - (item.difficulty ?? 0)" name="heroicons:star" />
                    </template>
                </DataTable>
            </section>
        </SectionContainer>
    </Container>
</template>
