<script setup>
const { params } = useRoute();
const { data: exercise } = await useAsyncData(`/exercises/${params.id}`, () => queryContent(`/exercises/${params.id}`).findOne());

const variant = exercise.value.variants.find(v => String(v.id) === params.variant);

if (!variant) {
    throw createError({
        statusCode: 404,
        statusMessage: `Variant ${params.variant} does not esist for ${params.id}`,
    });
}
</script>

<template>
    <Container fluid>
        <SectionContainer>
            <section>
                <Heading>{{ exercise.title }}</Heading>
                <div class="lg:h-[1000px]">
                    <IntonationChecker
                        :url="`/api${exercise._path}/${variant.id}`"
                        locale="de"
                    />
                </div>
            </section>
        </SectionContainer>
    </Container>
</template>
