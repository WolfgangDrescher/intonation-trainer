function normalize(str) {
    return str?.normalize('NFD').replace(/[\u0300-\u036f]/g, '') || '';
}

const filterByComposerPart = (composer, element) => {
    if (!composer) return true;
    return normalize(element.composer?.toLowerCase()).includes(normalize(composer?.toLowerCase()));
};

const filterByComposer = (composer, element) => {
    if (!composer) return true;
    return normalize(element.composer?.toLowerCase()) === normalize(composer?.toLowerCase());
};

const filterBySearchText = (searchText, element) => {
    if (!searchText) return true;
    return filterByTitle(searchText, element) || filterByComposerPart(searchText, element) || filterByYearString(searchText, element);
};

const filterByTitle = (title, element) => {
    if (!title) return true;
    return normalize(element.title?.toLowerCase()).includes(normalize(title?.toLowerCase()));
};

const filterByYear = ([min, max], element) => {
    if (typeof min !== 'number' || typeof max !== 'number') return true;
    const year = parseInt(`${element.year}`.replaceAll(/\D/g, '') || 0, 10);
    // if (isNaN(year)) return false;
    return year >= min && year <= max;
};

const filterByYearString = (year, element) => {
    if (!year) return true;
    return `${element.year}`.includes(year);
};

const filterByDifficulty = (difficulty, element) => {
    if (!difficulty) return true;
    return element.variants?.find(v => v.difficulty === parseInt(difficulty, 10)) ?? false;
};

const filterByInstrumentation = (instrumentation, element) => {
    if (!instrumentation) return true;
    return sluggifyInstrumentation(element.instrumentation) === instrumentation;
};

export function useExerciseFilter(elements) {

    const filter = useExerciseFilterStore();

    const filteredElements = computed(() => {
        const filteredElements = elements.filter(element => {
            const searchTextMatched = filterBySearchText(filter.searchText, element);
            const composerMatches = filterByComposer(filter.composer, element);
            const yearMatched = filterByYear(filter.yearRange, element);
            const difficultyMatched = filterByDifficulty(filter.difficulty, element);
            const instrumentationMatched = filterByInstrumentation(filter.instrumentation, element);

            return (
                searchTextMatched
                && composerMatches
                && yearMatched
                && difficultyMatched
                && instrumentationMatched
            );
        });

        filteredElements.sort((a, b) => {
            if (filteredElements.orderBy === 'id') {
                return a.id > b.id ? 1 : -1;
            }
            return 0;
        });

        return filteredElements;
    });

    return {
        filteredElements,
    };
}
