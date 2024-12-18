// tailwind.config.cjs
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light Theme Colors (Sage/Tan)
        light: {
          base: '#E5E6DC',      // Light sage background
          text: '#7D7F6B',      // Darker sage text
          accent: '#C4B19B',    // Warm tan accent
          muted: '#B8B99E',     // Muted sage
          soft: '#E6D5B8',      // Soft tan
        },
        // Dark Theme Colors (Desert Night)
        dark: {
          base: '#1F1D2B',      // Deep desert night sky
          text: '#E4D6A7',      // Desert sand by starlight
          accent: '#E9B872',    // Warm sandstone glow
          muted: '#9B8E7E',     // Desert rock shadows
          soft: '#2A2838',      // Twilight purple-blue
        }
      },
      fontFamily: {
        sans: ['Source Sans Pro', 'system-ui', 'sans-serif'],
        serif: ['Bitter', 'Georgia', 'serif'],
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.light.text'),
            a: {
              color: theme('colors.light.accent'),
              '&:hover': {
                color: theme('colors.light.muted'),
              },
            },
            'h1,h2,h3,h4': {
              color: theme('colors.light.text'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.dark.text'),
            a: {
              color: theme('colors.dark.accent'),
              '&:hover': {
                color: theme('colors.dark.muted'),
              },
            },
            'h1,h2,h3,h4': {
              color: theme('colors.dark.text'),
            },
          },
        },
      })
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
