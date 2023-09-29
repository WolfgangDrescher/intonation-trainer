<script setup>
const { params } = useRoute();
const localePath = useLocalePath();
const { data: exercise } = await useAsyncData(`/exercises/${params.id}`, () => queryContent(`/exercises/${params.id}`).findOne());
const { data } = await useFetch(`/api${exercise.value._path}/${exercise.value.variants[0].id}`);
</script>

<template>
    <Container fluid>
        <SectionContainer>
            <section>
                <Heading>{{ exercise.title }}</Heading>
                <div v-if="exercise.variants.length === 1" class="lg:h-[1000px]">
                    <IntonationChecker
                        :data="data"
                        locale="de"
                    />
                </div>
                <div v-else class="flex gap-4 my-4">
                    <VariantButton v-for="variant in exercise.variants" :href="localePath({ name: 'exercises-id-variant', params: { id: exercise.id, variant: variant.id } })" :difficulty="variant.difficulty">
                        {{ $t('variantName', { name: variant.id }) }}
                    </VariantButton>
                </div>
            </section>
        </SectionContainer>
    </Container>
</template>
