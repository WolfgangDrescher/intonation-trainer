import { serverQueryContent } from '#content/server';

const runtimeConfig = useRuntimeConfig();

function sprintf(format, args) {
    return format?.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
}

function buildPath(fileName, exerciseId) {
    return sprintf(runtimeConfig.public.dataBaseUrl, [fileName, exerciseId]);
}

export default defineEventHandler(async (event) => {
    const { id, variantId } = event.context.params;

    const exercise = await serverQueryContent(event).where({
        _source: 'exercises',
        _path: {
            $eq: `/exercises/${id}`,
        },
    }).findOne();

    if (!exercise) {
        throw createError({
            statusCode: 404,
            statusMessage: `Exercise ${id} does not exist`,
        });
    }

    const variant = exercise.variants.find(v => String(v.id) === variantId);

    if (!variant) {
        throw createError({
            statusCode: 404,
            statusMessage: `Variant ${variantId} does not exist for ${id}`,
        });
    }

    return {
        scoreUrl: `https://raw.githubusercontent.com/WolfgangDrescher/intonation-trainer-data/master/scores/${exercise.scoreFilename}`,
        correctAudioUrl: buildPath(exercise.audioFilename, exercise.id),
        composer: exercise.composer,
        title: exercise.title,
        instrumentation: exercise.instrumentation,
        performers: exercise.performers,
        license: exercise.license,
        year: exercise.year,
        description: exercise.description,
        difficulty: variant.difficulty,
        wrongAudioUrl: buildPath(variant.audioFilename, exercise.id),
        markers: variant.markers,
    }
;
});
