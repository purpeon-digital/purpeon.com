# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Astro 5 website with Vue 3 components for Purpeon Digital IT consulting. Statically generated site with bilingual support (English/Norwegian).

## Tech Stack

- **Framework**: Astro 6 (static output)
- **UI Components**: Vue 3 with `<script setup>` and TypeScript
- **Package Manager**: Bun - always use bun commands!
- **Testing**: Vitest with Vue Test Utils and jsdom
- **Styling**: Tailwind CSS 4 with `@tailwindcss/vite` plugin, plus custom CSS for complex gradients/animations
- **Theme**: Light/dark mode via `data-theme` attribute on `<html>`, with Tailwind `dark:` and `light:` variants
- **i18n**: Custom composable-based system supporting English and Norwegian

## Key Patterns

### Vue Components
- Use `<script setup lang="ts">` for all components
- Static components render server-side (no directive needed)
- Interactive components use `client:load` in Astro pages
- Component tests go in `src/components/__tests__/` with `.spec.ts` extension
- Test pattern: use Vue Test Utils `mount()` with `jsdom` environment

### i18n System
- Bilingual site: Norwegian (default at `/`) and English (at `/en/`)
- Routes generated via `getStaticPaths()` in `src/pages/[...lang].astro`
- Client-side locale management via `useI18n()` composable from `src/composables/useI18n.ts`
- Translation files: `src/i18n/en.json` and `src/i18n/no.json`
- `useI18n()` returns: `locale` (computed), `messages` (computed), `t()` function, `setLocale()` function
- Pass `locale` prop from Astro to interactive components; they sync via `onMounted()`

### Styling
- Tailwind CSS 4 via `@tailwindcss/vite` plugin (configured in `astro.config.mjs`)
- Entry point: `src/styles/app.css` — `@theme` tokens, `@variant` for dark/light, `@utility` for shared patterns, base styles, CSS custom properties
- Streak gradient backgrounds: `src/styles/streaks.css` — per-section decorative backgrounds
- Shared animations: `src/styles/animations.css`
- Use Tailwind utility classes in templates for layout, spacing, typography, responsive breakpoints
- Keep scoped CSS in components only for things Tailwind can't express (complex gradients, SVG animations, filter presets, pseudo-elements)
- Custom `section-viewport` utility for fullscreen scroll-snap sections
- Custom `section-grid` utility for 2-column section layouts
- Breakpoints: `sm` (480px), `md` (768px), `lg` (1200px), `xl` (1400px)
- Theme switching uses `@variant dark` and `@variant light` mapped to `[data-theme]` attribute

### File Organization
- Pages: `src/pages/*.astro`
- Components: `src/components/*.vue`
- Composables: `src/composables/*.ts`
- Layouts: `src/layouts/*.astro`
- Styles: `src/styles/app.css`, `src/styles/streaks.css`, `src/styles/animations.css`
- Translations: `src/i18n/*.json`
- Tests: `src/**/__tests__/*.spec.ts`
- Test setup: `src/test/setup.ts`
- Static assets: `public/`

## Commands

```bash
bun dev              # Development server (hot reload)
bun run build        # Production build (static HTML output)
bun preview          # Preview production build locally
bun test             # Run tests in watch mode
bun test:run         # Run tests once (CI mode)
bun test:coverage    # Run tests with coverage report
```

## Path Aliases

`@/*` maps to `src/*` (configured in both `tsconfig.json` and `vitest.config.ts`)
