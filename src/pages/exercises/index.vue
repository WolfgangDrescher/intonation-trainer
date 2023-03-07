<script setup>
const { data } = await useAsyncData('exercises', () => queryContent('/exercises').find());
</script>

<template>
    <Container>
        <SectionContainer>
            <section>
                <Heading>{{ $t('exercises') }}</Heading>
                <ul>
                    <template v-for="exercise in data" :key="exercise._id">
                        <li v-for="variant in exercise.variants" :key="`${exercise._id}${variant.id}`">
                            <NuxtLink :to="`${exercise._path}/${variant.id}`">
                                {{ exercise.title }} / {{ variant?.title || `Variante ${variant.id}` }}
                            </NuxtLink>
                        </li>
                    </template>
                </ul>
            </section>
        </SectionContainer>
    </Container>
</template>
