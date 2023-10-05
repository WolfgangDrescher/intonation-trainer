import { defineStore } from 'pinia';
import { Howl } from 'howler';

export const useHowlerStore = defineStore('howler', {
    state: () => ({ instances: [] }),
    actions: {
        add(url) {
            const found = this.getInstanceByUrl(url);
            if (found) return found;
            const instance = {
                url,
                howler: new Howl({
                    src: [url],
                    html5: true, // allow playing audio on muted phones
                    preload: false,
                }),
            };
            this.instances.push(instance);
            return instance;
        },
        remove(url) {
            this.getHowlerByUrl(url)?.unload();
            this.instances = this.instances.filter(i => i.url !== url);
        },
        play(url) {
            this.instances.forEach((instance) => {
                instance.howler.stop();
            });
            const howler = this.getHowlerByUrl(url);
            if (howler.state() === 'loaded') {
                howler.play();
            } else if (howler.state() === 'unloaded') {
                howler.load();
                howler.once('load', () => {
                    if (!howler.playing()) {
                        howler.play();
                    }
                });
            }
        },
        stop(url) {
            this.getHowlerByUrl(url).stop();
        },
    },
    getters: {
        getHowlerByUrl: (state) => (url) => state.instances.find(i => i.url === url)?.howler ?? null,
        getInstanceByUrl: (state) => (url) => state.instances.find(i => i.url === url) ?? null,
    },
});
