import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SectionButton from '../SectionButton.vue';

describe('SectionButton', () => {
  describe('rendering', () => {
    it('renders as an anchor when href is provided', () => {
      const wrapper = mount(SectionButton, {
        props: { variant: 'primary', href: '#test' },
        slots: { default: 'Click me' }
      });

      expect(wrapper.find('a').exists()).toBe(true);
      expect(wrapper.find('button').exists()).toBe(false);
      expect(wrapper.find('a').attributes('href')).toBe('#test');
    });

    it('renders as a button when href is not provided', () => {
      const wrapper = mount(SectionButton, {
        props: { variant: 'primary' },
        slots: { default: 'Click me' }
      });

      expect(wrapper.find('button').exists()).toBe(true);
      expect(wrapper.find('a').exists()).toBe(false);
    });

    it('renders slot content', () => {
      const wrapper = mount(SectionButton, {
        props: { variant: 'primary' },
        slots: { default: 'Button Text' }
      });

      expect(wrapper.text()).toBe('Button Text');
    });
  });

  describe('variants', () => {
    it('applies btn-primary class for primary variant', () => {
      const wrapper = mount(SectionButton, {
        props: { variant: 'primary' },
        slots: { default: 'Primary' }
      });

      expect(wrapper.find('button').classes()).toContain('btn');
      expect(wrapper.find('button').classes()).toContain('btn-primary');
    });

    it('applies btn-secondary class for secondary variant', () => {
      const wrapper = mount(SectionButton, {
        props: { variant: 'secondary' },
        slots: { default: 'Secondary' }
      });

      expect(wrapper.find('button').classes()).toContain('btn');
      expect(wrapper.find('button').classes()).toContain('btn-secondary');
    });

    it('applies correct classes to anchor element', () => {
      const wrapper = mount(SectionButton, {
        props: { variant: 'secondary', href: '/link' },
        slots: { default: 'Link' }
      });

      expect(wrapper.find('a').classes()).toContain('btn');
      expect(wrapper.find('a').classes()).toContain('btn-secondary');
    });
  });

  describe('interactions', () => {
    it('emits click event on button click', async () => {
      const wrapper = mount(SectionButton, {
        props: { variant: 'primary' },
        slots: { default: 'Click' }
      });

      await wrapper.find('button').trigger('click');
      expect(wrapper.emitted('click')).toBeTruthy();
    });
  });
});
