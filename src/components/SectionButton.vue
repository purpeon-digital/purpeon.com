<script setup lang="ts">
interface Props {
  variant: 'primary' | 'secondary';
  href?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <a v-if="href" :href="href" :class="[
    'btn inline-block px-8 py-4 text-base font-semibold cursor-pointer no-underline',
    variant === 'primary' ? 'btn-primary' : 'btn-secondary'
  ]">
    <slot />
  </a>
  <button v-else :class="[
    'btn inline-block px-8 py-4 text-base font-semibold cursor-pointer',
    variant === 'primary' ? 'btn-primary' : 'btn-secondary'
  ]">
    <slot />
  </button>
</template>
