// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://gilabrewing.com',
  output: 'server',
  adapter: cloudflare(),
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
