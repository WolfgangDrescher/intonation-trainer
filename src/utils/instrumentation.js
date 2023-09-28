export function sluggifyInstrumentation(instrumentation) {
    return instrumentation?.replaceAll(' ', '').replaceAll(/\([^)]+\)/g, '');
}
