<script setup lang="ts">
import { useI18n, type Locale } from '@/composables/useI18n';
import IconLangNo from '~icons/circle-flags/lang-no';
import IconLangEn from '~icons/circle-flags/lang-en';

// Accept locale prop from SSR - this is the source of truth for display
const props = defineProps<{
  locale: Locale;
}>();

const { setLocale } = useI18n();

function toggleLanguage() {
  const newLocale: Locale = props.locale === 'en' ? 'no' : 'en';
  setLocale(newLocale);
}
</script>

<template>
  <div class="relative">
    <button
      class="bg-transparent border-none p-0.5 cursor-pointer grid grid-cols-2 gap-1 items-center relative isolate"
      @click="toggleLanguage"
      :aria-label="`Switch to ${props.locale === 'en' ? 'Norwegian' : 'English'}`"
      :aria-pressed="props.locale === 'no'"
    >
      <span
        class="flex items-center justify-center relative z-1 leading-none transition-all duration-200"
        :class="props.locale === 'no' ? 'opacity-100 grayscale-0' : 'opacity-50 grayscale-[0.95]'"
      >
        <IconLangNo />
      </span>
      <span
        class="flex items-center justify-center relative z-1 leading-none transition-all duration-200"
        :class="props.locale === 'en' ? 'opacity-100 grayscale-0' : 'opacity-50 grayscale-[0.95]'"
      >
        <IconLangEn />
      </span>
    </button>
  </div>
</template>
