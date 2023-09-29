import { defineStore } from 'pinia';

const defaultFilter = {
    searchText: null,
    composer: null,
    difficulty: null,
    instrumentation: null,
    yearRange: [0, new Date().getFullYear()],
};

export const useExerciseFilterStore = defineStore('exercise_filter', {
    state: () => ({ ...defaultFilter }),
    actions: {
        update(prop, value) {
            this[prop] = value;
        },
        reset() {
            this.$patch({ ...defaultFilter });
        },
    },
});
