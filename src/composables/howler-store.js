import { defineStore } from 'pinia';
import { Howl } from 'howler';

export const useHowlerStore = defineStore('howler', {
    state: () => ({ instances: [] }),
    actions: {
        add(url) {
            const found = this.getHowlerByUrl(url);
            if (found) return found;
            const instance = {
                url,
                howler: new Howl({
                    src: [url],
                    html5: true, // allow playing audio on muted phones
                }),
            };
            this.instances.push(instance);
            return instance;
        },
        play(url) {
            this.instances.forEach((instance) => {
                instance.howler.stop();
            });
            this.getHowlerByUrl(url).play();
        },
        stop(url) {
            this.getHowlerByUrl(url).stop();
        },
    },
    getters: {
        getHowlerByUrl: (state) => (url) => state.instances.find(i => i.url === url)?.howler ?? null,
    },
});
