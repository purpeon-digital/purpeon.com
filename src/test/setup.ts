import { config } from '@vue/test-utils';
import { vi } from 'vitest';

// Mock iconify-icon web component
config.global.stubs = {
  'iconify-icon': {
    template: '<span class="iconify-icon-stub"><slot /></span>',
    props: ['icon', 'width', 'height', 'style']
  }
};

// Mock IntersectionObserver for scroll animations
const mockIntersectionObserver = vi.fn(function(callback) {
  return {
    observe: function(element: Element) {
      // Immediately trigger the callback with isIntersecting: true for testing
      callback([{ isIntersecting: true, target: element }]);
    },
    unobserve: function() {},
    disconnect: function() {}
  };
});

vi.stubGlobal('IntersectionObserver', mockIntersectionObserver);

// Mock window globals used by components
Object.defineProperty(window, '__INITIAL_LOCALE__', {
  value: 'no',
  writable: true,
  configurable: true
});

Object.defineProperty(window, '__INITIAL_THEME__', {
  value: 'light',
  writable: true,
  configurable: true
});

// Mock document.documentElement for theme tests
Object.defineProperty(document.documentElement, 'dataset', {
  value: { theme: 'light' },
  writable: true,
  configurable: true
});
