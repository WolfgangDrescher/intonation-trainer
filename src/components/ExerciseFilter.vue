<script setup>
const { t } = useI18n();
const { data: exercisesData } = await useAsyncData('exercises', () => queryContent('/exercises').find());

const filter = useExerciseFilterStore();

function updateFilter(prop, value) {
    filter.update(prop, value);
}

function resetFilter() {
    filter.reset();
}

const composerOptions = [...new Set(exercisesData.value.map(exercise => exercise.composer).filter(n => n))].map(composer => ({
    value: composer,
    text: composer,
}));

const instrumentationOptions = [...new Set(exercisesData.value.map(exercise => sluggifyInstrumentation(exercise.instrumentation)).filter(n => n))].map(instrumentation => ({
    value: instrumentation,
    text: t(`instrumentation.${instrumentation}`),
}));

const difficultyOptions = [
    { value: '1', text: '★' },
    { value: '2', text: '★★' },
    { value: '3', text: '★★★' },
 ];

const years = toRaw(exercisesData.value).map(e => parseInt(`${e.year}`.replaceAll(/\D/g, '') || 0, 10)).filter(y => y);

const minYear = Math.min(...years);
const maxYear = Math.max(...years);
</script>

<template>
    <ClientOnly>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-4">
            <div>
                <FormInputField :model-value="filter.searchText" @update:model-value="updateFilter('searchText', $event)" :label="$t('searchText')" :placeholder="$t('titleComposerYear')" />
            </div>
            <div>
                <FormDropdown :model-value="filter.composer" @update:model-value="updateFilter('composer', $event)" :label="$t('composer')" :options="composerOptions" :search-enabled="true" />
            </div>
            <div>
                <FormDropdown :model-value="filter.difficulty" @update:model-value="updateFilter('difficulty', $event)" :label="$t('difficulty')" :options="difficultyOptions" :search-enabled="false" />
            </div>
            <div>
                <FormDropdown :model-value="filter.instrumentation" @update:model-value="updateFilter('instrumentation', $event)" :label="$t('instrumentation')" :options="instrumentationOptions" :search-enabled="false" />
            </div>
            <div>
                <FormRangeSlider :model-value="filter.yearRange" @update:model-value="updateFilter('yearRange', $event)" :group-label="$t('year')" :min="minYear" :max="maxYear" />
            </div>
            <div>
                <FormGroup :label="''">
                    <Button @click="resetFilter" block>{{ $t('clear') }}</Button>
                </FormGroup>
            </div>
        </div>
    </ClientOnly>
</template>
