import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import SectionImage from '../SectionImage.vue';

describe('SectionImage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('renders an image with correct src and alt', () => {
      const wrapper = mount(SectionImage, {
        props: {
          src: '/test.jpg',
          alt: 'Test image'
        }
      });

      const img = wrapper.find('img');
      expect(img.exists()).toBe(true);
      expect(img.attributes('src')).toBe('/test.jpg');
      expect(img.attributes('alt')).toBe('Test image');
    });

    it('applies width and height attributes', () => {
      const wrapper = mount(SectionImage, {
        props: {
          src: '/test.jpg',
          alt: 'Test',
          width: '400',
          height: '600'
        }
      });

      const img = wrapper.find('img');
      expect(img.attributes('width')).toBe('400');
      expect(img.attributes('height')).toBe('600');
    });

    it('applies custom maxWidth and borderRadius via style', () => {
      const wrapper = mount(SectionImage, {
        props: {
          src: '/test.jpg',
          alt: 'Test',
          maxWidth: '300px',
          borderRadius: '16px'
        }
      });

      const img = wrapper.find('img');
      expect(img.attributes('style')).toContain('max-width: 300px');
      expect(img.attributes('style')).toContain('border-radius: 16px');
    });

    it('renders slot content for badge', () => {
      const wrapper = mount(SectionImage, {
        props: {
          src: '/test.jpg',
          alt: 'Test'
        },
        slots: {
          badge: '<div class="test-badge">Badge</div>'
        }
      });

      expect(wrapper.find('.test-badge').exists()).toBe(true);
      expect(wrapper.find('.test-badge').text()).toBe('Badge');
    });
  });

  describe('alignment', () => {
    it('applies start alignment class by default', () => {
      const wrapper = mount(SectionImage, {
        props: {
          src: '/test.jpg',
          alt: 'Test'
        }
      });

      expect(wrapper.find('.section-image').classes()).toContain('justify-start');
    });

    it('applies end alignment class', () => {
      const wrapper = mount(SectionImage, {
        props: {
          src: '/test.jpg',
          alt: 'Test',
          alignment: 'end'
        }
      });

      expect(wrapper.find('.section-image').classes()).toContain('justify-end');
    });

    it('applies center alignment class', () => {
      const wrapper = mount(SectionImage, {
        props: {
          src: '/test.jpg',
          alt: 'Test',
          alignment: 'center'
        }
      });

      expect(wrapper.find('.section-image').classes()).toContain('justify-center');
    });
  });

  describe('filter presets', () => {
    it('applies services filter preset by default', () => {
      const wrapper = mount(SectionImage, {
        props: {
          src: '/test.jpg',
          alt: 'Test'
        }
      });

      expect(wrapper.find('.section-image').classes()).toContain('section-image--services');
    });

    it('applies hero filter preset', () => {
      const wrapper = mount(SectionImage, {
        props: {
          src: '/test.jpg',
          alt: 'Test',
          filterPreset: 'hero'
        }
      });

      expect(wrapper.find('.section-image').classes()).toContain('section-image--hero');
    });

    it('applies about filter preset', () => {
      const wrapper = mount(SectionImage, {
        props: {
          src: '/test.jpg',
          alt: 'Test',
          filterPreset: 'about'
        }
      });

      expect(wrapper.find('.section-image').classes()).toContain('section-image--about');
    });

    it('applies contact filter preset', () => {
      const wrapper = mount(SectionImage, {
        props: {
          src: '/test.jpg',
          alt: 'Test',
          filterPreset: 'contact'
        }
      });

      expect(wrapper.find('.section-image').classes()).toContain('section-image--contact');
    });
  });

  describe('scroll animation', () => {
    it('is visible immediately when animateOnScroll is false', () => {
      const wrapper = mount(SectionImage, {
        props: {
          src: '/test.jpg',
          alt: 'Test',
          animateOnScroll: false
        }
      });

      expect(wrapper.find('.section-image').classes()).toContain('is-visible');
      expect(wrapper.find('.section-image').classes()).not.toContain('section-image--animate');
    });

    it('applies animation classes when animateOnScroll is true', () => {
      const wrapper = mount(SectionImage, {
        props: {
          src: '/test.jpg',
          alt: 'Test',
          animateOnScroll: true
        }
      });

      expect(wrapper.find('.section-image').classes()).toContain('section-image--animate');
    });

    it('applies from-left animation direction by default', () => {
      const wrapper = mount(SectionImage, {
        props: {
          src: '/test.jpg',
          alt: 'Test',
          animateOnScroll: true,
          animationDirection: 'left'
        }
      });

      expect(wrapper.find('.section-image').classes()).toContain('section-image--from-left');
    });

    it('applies from-right animation direction', () => {
      const wrapper = mount(SectionImage, {
        props: {
          src: '/test.jpg',
          alt: 'Test',
          animateOnScroll: true,
          animationDirection: 'right'
        }
      });

      expect(wrapper.find('.section-image').classes()).toContain('section-image--from-right');
    });

    it('becomes visible when IntersectionObserver triggers', async () => {
      const wrapper = mount(SectionImage, {
        props: {
          src: '/test.jpg',
          alt: 'Test',
          animateOnScroll: true
        }
      });

      // The mock IntersectionObserver in setup.ts immediately triggers isIntersecting
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.section-image').classes()).toContain('is-visible');
    });
  });
});
