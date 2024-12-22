// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://gilabrewing.com',
  output: 'server',
  integrations: [
    tailwind({
      applyBaseStyles: false
    }),
    react()
  ],
  build: {
    inlineStylesheets: 'auto'
  },
  image: {
    domains: ['gilabrewing.com'],
    remotePatterns: [{ protocol: 'https' }]
  }
});
