<script setup lang="ts">
import { computed } from 'vue';
import { useI18n, type Locale } from '@/composables/useI18n';
import { registerFoxClick } from '@/composables/useFoxEasterEgg';
import Features from '@/components/Features.vue';
import SectionButton from '@/components/SectionButton.vue';
// Inlined rather than loaded through <img>: an SVG in an <img> only runs its animation
// when the image is decoded, so a cached 304 shows the finished mark. Inline, the
// keyframes are ordinary page CSS and restart on every page load.
import logoAnimated from '@/assets/logo-animated.svg?raw';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const props = defineProps<{
  locale: Locale;
}>();

const { t, locale } = useI18n(props.locale);

function handleFoxClick(e: MouseEvent) {
  registerFoxClick(e.currentTarget as HTMLElement);
}

const features = computed(() => {
  // Track locale for reactivity
  const _ = locale.value;
  return t('hero.features');
});
</script>

<template>
  <section class="hero section-viewport streak-hero text-[var(--hero-text-color)] pt-28 px-8 pb-8 max-md:pt-20 max-md:px-6 max-sm:pt-[4.5rem] max-sm:px-4 max-sm:pb-8">
    <div class="hero-content section-grid gap-12 mt-auto mb-auto max-lg:gap-8 max-md:gap-6 max-sm:gap-4">
      <div class="hero-text">
        <div class="hero-title-row flex items-start gap-4 max-md:mb-4 md:block">
          <div class="flex-1 min-w-0">
            <h1 class="section-title hero-heading mb-6 max-md:mb-0 text-[var(--hero-text-color)]">
              {{ t('hero.titleStart') }}
              <em>{{ t('hero.titleEm') }}</em>
            </h1>
          </div>
        </div>
        <p class="text-[clamp(1rem,2vw,1.2rem)] leading-relaxed mb-4 text-[var(--hero-text-color)]" :style="{ opacity: 'var(--hero-text-opacity)' }">{{ t('hero.subtitle') }}</p>
        <p class="hero-tagline text-[clamp(1.1rem,2vw,1.3rem)] mb-8 text-[var(--hero-text-color)]" :style="{ opacity: 'var(--hero-text-opacity)' }">{{ t('hero.tagline') }}</p>
        <div class="hero-buttons flex gap-4 flex-wrap mb-3">
          <SectionButton variant="primary" href="#services">
            {{ t('hero.cta.services') }}
          </SectionButton>
          <SectionButton variant="secondary" href="#contact">
            {{ t('hero.cta.sales') }}
          </SectionButton>
        </div>
      </div>
      <div class="hero-image flex items-center" style="max-height: min(600px, 50vh)">
        <div class="hero-mark cursor-pointer select-none" v-html="logoAnimated" @click="handleFoxClick"></div>
      </div>
    </div>

    <Features :features="features" />
  </section>
</template>

<style scoped>
/* Desktop hero mark. Size and filter match what SectionImage's hero preset gave the
   old <img>. The entrance is now the drawing sequence itself, so SectionImage's 1.2s
   opacity fade is gone: it only washed out the first second of the ring. */
.hero-mark {
  width: 100%;
  max-width: 400px;
  margin-inline: auto;
  filter: brightness(1) contrast(1.15);
}
.hero-mark :deep(svg) {
  width: 100%;
  height: auto;
  display: block;
}
:global([data-theme="dark"]) .hero-mark {
  filter: brightness(0.9) contrast(1.1);
  mix-blend-mode: lighten;
}

/* Below md the same mark moves above the heading and drops to about 60% of the
   desktop 400px. It used to be a separate 72px <img> with a plain fade, which
   is why the phone never showed the drawing sequence: the animation lives in
   the inline SVG, and the inline SVG was the element being hidden.
   `min()` rather than a flat 240px so the narrowest phones do not have the
   mark eating the full width. */
/* The mark keeps a column of its own well below the md breakpoint. The text
   block does not need the full width there: at 700px it wraps at about half,
   which is the empty space the old layout wasted while showing a 72px logo. */
@media (max-width: 767px) {
  /* Uneven columns here, not the even split `section-grid` gives. The ratio is
     measured, not guessed: at 0.5 the mark only reached 187px and the CTA
     buttons wrapped to a stack by 640px, and at 0.78 they wrapped again at
     580px. 0.72 puts the mark at the full 240px on the widest phones in this
     band while the buttons stay on one row all the way down to 560. */
  .hero-content {
    grid-template-columns: 1.28fr 0.72fr;
  }
  .hero-mark {
    max-width: min(240px, 33vw);
  }
}

/* Under 560px there genuinely is no room beside the text, so the mark moves
   above the heading and takes about 60% of the desktop 400px. */
@media (max-width: 560px) {
  .hero-content {
    grid-template-columns: 1fr;
  }
  .hero-image {
    order: -1;
    justify-content: center;
    max-height: none !important;
  }
  .hero-mark {
    max-width: min(240px, 62vw);
  }
}

/* Tablet: the hero stays two-column down to 768px, so its text column gets
   narrow. Trim the CTA buttons' padding and gap a touch so they stay on one
   row instead of wrapping to a stack. */
@media (max-width: 860px) {
  .hero-buttons {
    gap: 0.75rem;
  }
  .hero-buttons :deep(.btn) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

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
