<script setup lang="ts">
import { ref } from 'vue';
import { useI18n, type Locale } from '@/composables/useI18n';
import LanguagePicker from './LanguagePicker.vue';
import ThemeToggle from './ThemeToggle.vue';

const props = defineProps<{
  locale: Locale;
}>();

const { t } = useI18n(props.locale);
const mobileMenuOpen = ref(false);

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  document.body.style.overflow = mobileMenuOpen.value ? 'hidden' : '';
}

function scrollToSection(e: Event, href: string) {
  e.preventDefault();

  // Close mobile menu if open
  if (mobileMenuOpen.value) {
    mobileMenuOpen.value = false;
    document.body.style.overflow = '';
  }

  // Handle scrolling to top for home/logo
  if (href === '#' || href === '#top') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    return;
  }

  const target = document.querySelector(href);
  if (target) {
    const headerOffset = 80;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}
</script>

<template>
  <header class="header-bar">
    <nav class="max-w-[1400px] mx-auto px-8 flex justify-between items-center w-full h-full max-md:px-4 max-md:h-auto max-md:min-h-[52px]">
      <a href="#" class="logo" @click.prevent="scrollToSection($event, '#')">
        <span class="logo-icon">
          <img src="/bell_logo.svg" alt="Logo" class="h-full w-full" />
        </span>
        <span class="logo-text">Purpeon <span class="font-normal opacity-85">Digital</span></span>
      </a>

      <button class="hamburger hidden max-md:flex" @click="toggleMobileMenu" :class="{ open: mobileMenuOpen }" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="nav-right" :class="{ 'mobile-open': mobileMenuOpen }">
        <ul class="nav-links">
          <li><a href="#services" @click="(e) => scrollToSection(e, '#services')">{{ t('nav.services') }}</a></li>
          <li><a href="#about" @click="(e) => scrollToSection(e, '#about')">{{ t('nav.about') }}</a></li>
          <li><a href="#contact" @click="(e) => scrollToSection(e, '#contact')">{{ t('nav.contact') }}</a></li>
        </ul>
        <div class="nav-controls">
          <LanguagePicker :locale="props.locale" />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
/* Header bar */
.header-bar {
  background: var(--header-bg);
  color: white;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 56px;
  z-index: 100;
  box-shadow: 0 2px 20px var(--color-shadow);
  backdrop-filter: blur(12px);
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .header-bar {
    height: 52px;
  }
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: white;
}

@media (max-width: 768px) {
  .logo {
    gap: 0.5rem;
  }
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .logo-icon {
    width: 32px;
    height: 32px;
  }
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.3px;
}

@media (max-width: 768px) {
  .logo-text {
    font-size: 1.1rem;
  }
}

/* Navigation right side */
.nav-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 0.25rem;
}

.nav-links a {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: all 0.2s ease;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  position: relative;
  font-size: 0.925rem;
  font-weight: 500;
  letter-spacing: 0.01em;
}

.nav-links a:hover {
  color: white;
  background: rgba(255, 255, 255, 0.12);
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 50%;
  width: 0;
  height: 2px;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.25s ease;
  transform: translateX(-50%);
  border-radius: 1px;
}

.nav-links a:hover::after {
  width: 60%;
}

/* Nav Controls */
.nav-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-left: 1rem;
  border-left: 1px solid rgba(255, 255, 255, 0.15);
}

/* Hamburger Menu */
.hamburger {
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 1001;
}

.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger.open span:nth-child(1) {
  transform: rotate(45deg) translateY(9px);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: rotate(-45deg) translateY(-9px);
}

/* Mobile nav drawer */
@media (max-width: 768px) {
  .nav-right {
    position: fixed;
    top: 52px;
    left: 0;
    right: 0;
    width: 100%;
    max-height: 0;
    background: var(--header-bg);
    flex-direction: column;
    padding: 0 1.5rem;
    gap: 1.5rem;
    overflow: hidden;
    transition: max-height 0.3s ease, padding 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  .nav-right.mobile-open {
    max-height: calc(100vh - 52px);
    padding: 2rem 1.5rem;
    overflow-x: hidden;
    overflow-y: visible;
  }

  .nav-links {
    flex-direction: column;
    gap: 0.25rem;
    width: 100%;
  }

  .nav-links li {
    width: 100%;
  }

  .nav-links a {
    display: block;
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    text-align: left;
  }

  .nav-controls {
    padding-left: 0;
    border-left: none;
    gap: 0.5rem;
    width: 100%;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    justify-content: flex-start;
  }
}
</style>
