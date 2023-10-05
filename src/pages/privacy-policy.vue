<script setup>
const { locale } = useI18n()
const slug = `${locale.value}/privacy-policy`;
const { data } = await useAsyncData(slug, () => queryContent(slug).findOne())
</script>

<template>
    <Container>
        <SectionContainer>
            <section>
                <Heading>{{ $t('privacyPolicy') }}</Heading>
                <ContentRenderer :value="data" />
            </section>
        </SectionContainer>
    </Container>
</template>
