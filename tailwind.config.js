// tailwind.config.cjs
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light Theme Colors (Warm Desert Day)
        light: {
          base: '#F5F3EE',      // Warm off-white background
          text: '#4A4B40',      // Deep sage text
          accent: '#7C8B7D',    // Sage green accent
          muted: '#A4A69C',     // Muted sage
          soft: '#E6DED1',      // Soft sand
          card: '#FFFFFF',      // Pure white for cards
        },
        // Dark Theme Colors (Desert Night)
        dark: {
          base: '#1F1D2B',      // Deep desert night sky
          text: '#E4D6A7',      // Desert sand by starlight
          accent: '#E9B872',    // Warm sandstone glow
          muted: '#9B8E7E',     // Desert rock shadows
          soft: '#2A2838',      // Twilight purple-blue
          card: '#1F2937',      // Tailwind's gray-800
        }
      },
      fontFamily: {
        sans: ['Source Sans Pro', 'system-ui', 'sans-serif'],
        serif: ['Bitter', 'Georgia', 'serif'],
      },
      animation: {
        gradient: 'gradient 3s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '-200% 50%' },
        },
      },
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        '200%': '200%',
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
      }),
      backgroundImage: {
        'hero-image': "url('/assets/images/brewery-hero.webp')",
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/aspect-ratio')],
};
