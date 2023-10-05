<script setup>
const { locale } = useI18n()
const slug = `${locale.value}/legal-notice`;
const { data } = await useAsyncData(slug, () => queryContent(slug).findOne())
</script>

<template>
    <Container>
        <SectionContainer>
            <section>
                <Heading>{{ $t('legalNotice') }}</Heading>
                <ContentRenderer :value="data" />
            </section>
        </SectionContainer>
    </Container>
</template>
