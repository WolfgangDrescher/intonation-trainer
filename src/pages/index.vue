<template>
    <Container>
        <SectionContainer>
            <section class="text-center">
                <!-- <Heading>{{ $t('app.title') }}</Heading> -->
                <div class="flex justify-center">
                    <img src="@/assets/logo.svg" :alt="$t('app.title')" width="300" />
                </div>
                <p class="mb-6">{{ $t('app.title.description') }}</p>
                <div class="my-6"><Subheading>{{ $t('app.subtitle') }}</Subheading></div>
                <p>{{ $t('app.subtitle.description') }}</p>
            </section>
        </SectionContainer>
    </Container>
</template>
