<script setup>
const { params } = useRoute();
const { data: exercise } = await useAsyncData(`/exercises/${params.id}`, () => queryContent(`/exercises/${params.id}`).findOne());

const runtimeConfig = useRuntimeConfig();

const variant = exercise.value.variants.find(v => String(v.id) === params.variant);

if (!variant) {
    throw createError({
        statusCode: 404,
        statusMessage: `Variant ${params.variant} does not esist for ${params.id}`,
    });
}

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
    <Container fluid>
        <SectionContainer>
            <section>
                <Heading>{{ exercise.title }}</Heading>
                <div class="lg:h-[1000px]">
                    <IntonationChecker
                        :score-url="buildPath(exercise.scoreFilename, params.id)"
                        :correct-audio-url="buildPath(exercise.audioFilename, params.id)"
                        :wrong-audio-url="buildPath(variant.audioFilename, params.id)"
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
