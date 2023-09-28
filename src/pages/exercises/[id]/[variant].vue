<script setup>
const { params } = useRoute();
const localePath = useLocalePath();
const { data: exercise } = await useAsyncData(`/exercises/${params.id}`, () => queryContent(`/exercises/${params.id}`).findOne());

const variant = exercise.value.variants.find(v => String(v.id) === params.variant);

if (!variant) {
    throw createError({
        statusCode: 404,
        statusMessage: `Variant ${params.variant} does not esist for ${params.id}`,
    });
}

const { data } = await useAsyncData(`/api${exercise.value._path}/${variant.id}`, () => $fetch(`/api${exercise.value._path}/${variant.id}`));
</script>

<template>
    <Container fluid>
        <SectionContainer>
            <section>
                <Heading>{{ exercise.title }}</Heading>
                <div v-if="exercise.variants.length > 1" class="flex gap-4 my-4">
                    <VariantButton v-for="_variant in exercise.variants" :active="variant.id === _variant.id" :href="localePath({ name: 'exercises-id-variant', params: { id: exercise.id, variant: _variant.id } })">
                        {{ $t('variantName', { name: _variant.id }) }}
                    </VariantButton>
                </div>
                <div class="lg:h-[1000px]">
                    <IntonationChecker
                        :data="data"
                        locale="de"
                    />
                </div>
            </section>
        </SectionContainer>
    </Container>
</template>
