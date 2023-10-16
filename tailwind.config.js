import { fontFamily } from 'tailwindcss/defaultTheme';

const rose = {
    DEFAULT: '#E2007D',
    50: '#FF9BD2',
    100: '#FF86C9',
    200: '#FF5DB7',
    300: '#FF35A5',
    400: '#FF0C92',
    500: '#E2007D',
    600: '#AA005E',
    700: '#72003F',
    800: '#3A0020',
    900: '#020001',
    950: '#000000'
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
