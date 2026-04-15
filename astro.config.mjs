import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

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
    }),
    sitemap({
      i18n: {
        defaultLocale: 'no',
        locales: {
          no: 'no',
          en: 'en'
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
