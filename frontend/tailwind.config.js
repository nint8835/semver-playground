/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {},
        heroPatterns: {
            topography: require('tailwindcss-hero-patterns/src/patterns').topography,
        },
        heroPatternsColors: ['zinc'],
    },
    plugins: [require('tailwindcss-hero-patterns')],
};
