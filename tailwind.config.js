import { fontFamily } from 'tailwindcss/defaultTheme';

const rose = {
    DEFAULT: '#E2007D',
    50: '#FFFAFD',
    100: '#FFDBEF',
    200: '#FF9ED3',
    300: '#FF61B8',
    400: '#FF1F9A',
    500: '#E2007D',
    600: '#C2006B',
    700: '#A3005A',
    800: '#850049',
    900: '#610035',
    950: '#52002D',
};

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
                primary: rose,
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
