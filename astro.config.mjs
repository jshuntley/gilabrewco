// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://gilabrewing.com',
  output: 'static',
  integrations: [
    tailwind({
      applyBaseStyles: false
    })
  ],
  build: {
    inlineStylesheets: 'auto'
  },
  image: {
    domains: ['gilabrewing.com'],
    remotePatterns: [{ protocol: 'https' }]
  }
});
