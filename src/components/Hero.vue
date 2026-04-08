<script setup lang="ts">
import { computed } from 'vue';
import { useI18n, type Locale } from '@/composables/useI18n';
import Features from '@/components/Features.vue';
import SectionButton from '@/components/SectionButton.vue';
import SectionImage from '@/components/SectionImage.vue';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const props = defineProps<{
  locale: Locale;
}>();

const { t, locale } = useI18n(props.locale);

const features = computed(() => {
  // Track locale for reactivity
  const _ = locale.value;
  return t('hero.features');
});
</script>

<template>
  <section class="hero section-viewport streak-hero text-[var(--hero-text-color)] pt-28 px-8 pb-8 max-md:pt-20 max-md:px-6 max-sm:pt-[4.5rem] max-sm:px-4 max-sm:pb-8">
    <div class="hero-content section-grid gap-12 mt-auto mb-auto max-lg:gap-8 max-md:grid-cols-1 max-md:gap-8 max-sm:grid-cols-1 max-sm:gap-6">
      <div class="hero-text max-md:text-center">
        <h1 class="hero-heading text-[clamp(2.5rem,6vw,4rem)] mb-6 leading-[1.1] font-bold text-[var(--hero-text-color)]">{{ t('hero.title') }}</h1>
        <p class="text-[clamp(1rem,2vw,1.2rem)] leading-relaxed mb-4 text-[var(--hero-text-color)]" :style="{ opacity: 'var(--hero-text-opacity)' }">{{ t('hero.subtitle') }}</p>
        <p class="hero-tagline text-[clamp(1.1rem,2vw,1.3rem)] mb-8 text-[var(--hero-text-color)]" :style="{ opacity: 'var(--hero-text-opacity)' }">{{ t('hero.tagline') }}</p>
        <div class="hero-buttons flex gap-4 flex-wrap max-sm:flex-col max-sm:mb-12">
          <SectionButton variant="primary" href="#services">
            {{ t('hero.cta.services') }}
          </SectionButton>
          <SectionButton variant="secondary" href="#contact">
            {{ t('hero.cta.sales') }}
          </SectionButton>
        </div>
      </div>
      <div class="hero-image flex items-center" style="max-height: min(600px, 50vh)">
        <!-- <img src="/logo.svg" /> -->
        <SectionImage
          src="/logo.svg"
          alt="Logo"
          width="400"
          height="600"
          maxWidth="400px"
          alignment="center"
          filterPreset="hero"
          :animate-on-scroll="true"
          animation-direction="right"
          fetchpriority="high"
        />
      </div>
    </div>

    <Features :features="features" />
  </section>
</template>

<style scoped>
/* Short viewport height adjustments */
@media (max-height: 800px) {
  .hero {
    padding-top: 4rem;
  }

  .hero-content {
    gap: 2rem;
  }
}

@media (max-height: 650px) {
  .hero {
    padding-top: 3rem;
  }

  .hero-content {
    gap: 1.5rem;
  }
}
</style>
