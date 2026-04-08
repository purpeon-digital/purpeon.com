<script setup lang="ts">
interface Props {
  variant: 'primary' | 'secondary';
  href?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <a v-if="href" :href="href" :class="[
    'btn inline-block px-8 py-4 text-base font-semibold rounded-lg cursor-pointer transition-all duration-300 no-underline',
    variant === 'primary' ? 'btn-primary' : 'btn-secondary'
  ]">
    <slot />
  </a>
  <button v-else :class="[
    'btn inline-block px-8 py-4 text-base font-semibold rounded-lg cursor-pointer transition-all duration-300',
    variant === 'primary' ? 'btn-primary' : 'btn-secondary'
  ]">
    <slot />
  </button>
</template>

<style scoped>
.btn-primary {
  background: var(--color-btn-primary);
  color: white;
  border: none;
}

.btn-primary:hover {
  background: var(--color-btn-primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(124, 58, 237, 0.4);
}

.btn-secondary {
  background: transparent;
  color: var(--btn-secondary-color);
  border: 2px solid var(--btn-secondary-border);
}

.btn-secondary:hover {
  background: var(--btn-secondary-hover-bg);
  border-color: var(--btn-secondary-hover-border);
}

:global([data-theme="light"]) .btn-primary {
  background: var(--color-btn-primary-light);
  color: white;
}

:global([data-theme="light"]) .btn-primary:hover {
  background: var(--color-btn-primary-light-hover);
}

:global([data-theme="light"]) .btn-secondary {
  background: rgba(0, 0, 0, 0.08);
  color: var(--color-text-primary);
  border: 2px solid rgba(107, 70, 193, 0.3);
}

:global([data-theme="light"]) .btn-secondary:hover {
  background: rgba(107, 70, 193, 0.15);
  border-color: rgba(107, 70, 193, 0.5);
}

@media (max-width: 480px) {
  .btn {
    width: 100%;
    text-align: center;
  }
}
</style>
