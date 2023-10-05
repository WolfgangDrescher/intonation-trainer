import { purple } from 'tailwindcss/colors';
import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/layouts/**.{vue,html,js}',
        './src/components/**/*.{vue,html,js}',
        './src/pages/**/*.{vue,html,js}',
    ],
    theme: {
        extend: {
            colors: {
                primary: purple,
            },
            fontFamily: {
                ...fontFamily,
                serif: ['Vollkorn', 'serif'],
            },
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                md: '3rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '6rem',
            },
        },
    },
};
