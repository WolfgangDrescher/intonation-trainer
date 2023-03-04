<script setup>
defineProps({
    open: Boolean,
});

const emit = defineEmits(['itemSelected'])

const localePath = useLocalePath();

function onClick() {
    emit('itemSelected');
}
</script>

<template>
    <nav class="bg-gray-100 py-3 md:py-5 hidden shadow md:shadow-none" :class="{'is-open': open}" id="header-navigation">
        <Container>
            <div class="w-full md:block md:w-auto">
                <ul class="flex flex-col md:flex-row md:space-x-8">
                    <NavigationItem :href="localePath('index')" @click="onClick">{{ $t('home') }}</NavigationItem>
                    <NavigationItem :href="localePath('exercises')" @click="onClick">{{ $t('exercises') }}</NavigationItem>
                </ul>
            </div>
        </Container>
    </nav>
</template>

<style scoped>
#header-navigation.is-open {
    @apply block;
}

@screen md {
    #header-navigation {
        @apply block;
    }
}
</style>
