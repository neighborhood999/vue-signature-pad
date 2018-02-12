import { mount } from '@vue/test-utils';
import VueSignaturePad from '../VueSignaturePad';

const Wrapper = mount(VueSignaturePad);
const vm = Wrapper.vm;

describe('VueSignaturePad Component', () => {
  it('should be pass', () => {
    expect(true).toBe(true);
  });
});
