import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Features from '../Features.vue';

const mockFeatures = [
  { icon: 'mdi:test', title: 'Feature 1', description: 'Description 1' },
  { icon: 'mdi:test2', title: 'Feature 2', description: 'Description 2' },
  { icon: 'mdi:test3', title: 'Feature 3', description: 'Description 3' },
  { icon: 'mdi:test4', title: 'Feature 4', description: 'Description 4' }
];

describe('Features', () => {
  describe('rendering', () => {
    it('renders without errors', () => {
      const wrapper = mount(Features, {
        props: { features: mockFeatures }
      });
      expect(wrapper.exists()).toBe(true);
    });

    it('renders all feature cards', () => {
      const wrapper = mount(Features, {
        props: { features: mockFeatures }
      });
      const cards = wrapper.findAll('.feature-card');
      expect(cards.length).toBe(4);
    });

    it('renders feature titles and descriptions', () => {
      const wrapper = mount(Features, {
        props: { features: mockFeatures }
      });
      expect(wrapper.text()).toContain('Feature 1');
      expect(wrapper.text()).toContain('Description 1');
    });

    it('renders icon wrappers for each feature', () => {
      const wrapper = mount(Features, {
        props: { features: mockFeatures }
      });
      const iconWrappers = wrapper.findAll('.feature-icon-wrapper');
      expect(iconWrappers.length).toBe(4);
    });
  });

  describe('forceTwoLines prop', () => {
    it('applies features-force-two-lines class when forceTwoLines is true', () => {
      const wrapper = mount(Features, {
        props: { features: mockFeatures, forceTwoLines: true }
      });
      expect(wrapper.find('.features').classes()).toContain('features-force-two-lines');
    });

    it('does not apply features-force-two-lines class when forceTwoLines is false', () => {
      const wrapper = mount(Features, {
        props: { features: mockFeatures, forceTwoLines: false }
      });
      expect(wrapper.find('.features').classes()).not.toContain('features-force-two-lines');
    });
  });

  describe('empty state', () => {
    it('renders empty grid with no features', () => {
      const wrapper = mount(Features, {
        props: { features: [] }
      });
      expect(wrapper.find('.features').exists()).toBe(true);
      expect(wrapper.findAll('.feature-card').length).toBe(0);
    });
  });
});
