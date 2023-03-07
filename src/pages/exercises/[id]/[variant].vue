<script setup>
const { params } = useRoute();
const { data: exercise } = await useAsyncData('exercise', () => queryContent(`/exercises/${params.id}`).findOne());

const variant = exercise.value.variants.find(v => String(v.id) === params.variant);

if (!variant) {
    throw createError({
        statusCode: 404,
        statusMessage: `Variant ${params.variant} does not esist for ${params.id}`,
    });
}

function buildPath(fileName) {
    return `/intonation-trainer-data/${params.id}/${fileName}`;
}
</script>

<template>
    <Container fluid>
        <SectionContainer>
            <section>
                <Heading>{{ exercise.title }}</Heading>
                <div class="lg:h-[1000px]">
                    <IntonationChecker
                        :score-url="buildPath(exercise.scoreFilename)"
                        :correct-audio-url="buildPath(exercise.audioFilename)"
                        :wrong-audio-url="buildPath(variant.audioFilename)"
                        :markers="variant.markers ?? []"
                        :title="exercise.title"
                        :description="exercise.description"
                        locale="de"
                    />
                </div>
            </section>
        </SectionContainer>
    </Container>
</template>
