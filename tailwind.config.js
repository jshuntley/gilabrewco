// tailwind.config.cjs
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'forest-green': '#2C4A3E',
        'desert-sand': '#E6D5B8',
        'canyon-red': '#C44536',
        'sky-blue': '#4A90E2',
      },
      fontFamily: {
        sans: ['Source Sans Pro', 'system-ui', 'sans-serif'],
        serif: ['Bitter', 'Georgia', 'serif'],
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.forest-green'),
            a: {
              color: theme('colors.canyon-red'),
              '&:hover': {
                color: theme('colors.sky-blue'),
              },
            },
            h1: {
              color: theme('colors.forest-green'),
            },
            h2: {
              color: theme('colors.forest-green'),
            },
            h3: {
              color: theme('colors.forest-green'),
            },
            h4: {
              color: theme('colors.forest-green'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.desert-sand'),
            a: {
              color: theme('colors.canyon-red'),
              '&:hover': {
                color: theme('colors.sky-blue'),
              },
            },
            h1: {
              color: theme('colors.desert-sand'),
            },
            h2: {
              color: theme('colors.desert-sand'),
            },
            h3: {
              color: theme('colors.desert-sand'),
            },
            h4: {
              color: theme('colors.desert-sand'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
