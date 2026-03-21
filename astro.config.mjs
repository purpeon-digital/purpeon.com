import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    vue({
      template: {
        compilerOptions: {
          // Treat iconify web component as custom element to avoid Vue resolution warnings
          isCustomElement: (tag) => tag === 'iconify-icon'
        }
      }
    })
  ],
  site: 'https://purpeon.com',
  i18n: {
    defaultLocale: 'no',
    locales: ['en', 'no'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
