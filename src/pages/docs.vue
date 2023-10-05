<script setup>
const { locale } = useI18n()
const slug = `${locale.value}/docs`;
const { data } = await useAsyncData(slug, () => queryContent(slug).findOne())
</script>

<template>
    <Container>
        <SectionContainer>
            <section>
                <Heading>{{ $t('documentation') }}</Heading>
                <ContentRenderer :value="data" />
            </section>
        </SectionContainer>
    </Container>
</template>
