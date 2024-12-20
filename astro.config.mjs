// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://gilabrewing.com',
  integrations: [tailwind()],
  build: {
    inlineStylesheets: 'auto'
  },
  image: {
    domains: ['gilabrewing.com'],
    remotePatterns: [{ protocol: 'https' }]
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  }
});
