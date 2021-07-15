import { shallowMount } from '@vue/test-utils';
import VueSignaturePad from '../VueSignaturePad';
import {
  signatureMockData,
  mockEncodeDataURL,
  signatureMockDataPoints
} from './mock';

describe('VueSignaturePad Component', () => {
  it('should be receive default props', () => {
    const wrapper = shallowMount(VueSignaturePad);
    const expectedWidth = '100%';
    const expectedHeight = '100%';
    const expectedOptions = {};
    const expectedImages = [];

    expect(wrapper.props().width).toBe(expectedWidth);
    expect(wrapper.props().height).toBe(expectedHeight);
    expect(wrapper.props().options).toEqual(expectedOptions);
    expect(wrapper.props().images).toEqual(expectedImages);
  });

  it('should be throw incorrect image error message', () => {
    const addOptionsWrapper = shallowMount(VueSignaturePad);

    expect(() => addOptionsWrapper.vm.saveSignature('text/html')).toThrow();
  });

  it('should be return empty status and undefined data', () => {
    const wrapper = shallowMount(VueSignaturePad);

    expect(wrapper.vm.saveSignature()).toEqual({
      isEmpty: true,
      data: undefined
    });
  });

  it('should be return signaturePad status and data', () => {
    const wrapper = shallowMount(VueSignaturePad);

    wrapper.setData({
      signaturePad: {
        _data: signatureMockData,
        isEmpty() {
          return false;
        },
        toDataURL() {
          return mockEncodeDataURL;
        }
      }
    });

    expect(wrapper.vm.saveSignature()).toEqual({
      isEmpty: false,
      data: mockEncodeDataURL
    });
  });

  it('should be return signature data array', () => {
    const wrapper = shallowMount(VueSignaturePad);

    wrapper.setData({
      signaturePad: {
        _data: signatureMockData
      },
      toData() {
        return signatureMockData;
      }
    });

    expect(wrapper.vm.toData()).toEqual(signatureMockData);
  });

  it('should be set signature from data array', () => {
    const wrapper = shallowMount(VueSignaturePad);

    expect(wrapper.vm.fromData(signatureMockDataPoints)).toEqual(undefined);
    expect(wrapper.vm.toData()).toEqual(signatureMockDataPoints);
  });

  it('should be throw incorrect data array', () => {
    const wrapper = shallowMount(VueSignaturePad);

    expect(() => wrapper.vm.fromData('Not an array')).toThrow();
  });

  it('should be undo draw action', () => {
    const wrapper = shallowMount(VueSignaturePad);

    wrapper.setData({
      signaturePad: {
        _data: signatureMockData,
        isEmpty() {
          return false;
        },
        toData() {
          return signatureMockData;
        },
        toDataURL(type, ...options) {
          return mockEncodeDataURL;
        },
        fromData(data) {
          return data;
        }
      }
    });

    expect(wrapper.vm.undoSignature()).toEqual([]);
  });

  it('should be lock or open signatrue pad', () => {
    const wrapper = shallowMount(VueSignaturePad);

    wrapper.setData({
      signaturePad: {
        _data: signatureMockData,
        isEmpty() {
          return false;
        },
        toData() {
          return signatureMockData;
        },
        toDataURL(type, ...options) {
          return mockEncodeDataURL;
        },
        fromData(data) {
          return data;
        },
        off() {
          return 'lock';
        },
        on() {
          return 'open';
        }
      }
    });

    expect(wrapper.vm.lockSignaturePad()).toBe('lock');
    expect(wrapper.vm.openSignaturePad()).toBe('open');
  });

  it('should be get props images and cache images', () => {
    const wrapper = shallowMount(VueSignaturePad);

    wrapper.setData({ cacheImages: ['foo', 'bar'] });
    expect(wrapper.vm.getPropImagesAndCacheImages()).toEqual(['foo', 'bar']);
  });

  it('should be clear cache images', () => {
    const wrapper = shallowMount(VueSignaturePad);

    wrapper.setData({ cacheImages: ['foo', 'bar'] });
    expect(wrapper.vm.getPropImagesAndCacheImages()).toEqual(['foo', 'bar']);

    wrapper.vm.clearCacheImages();
    expect(wrapper.vm.cacheImages).toEqual([]);
  });

  it('should be clear signatrue', () => {
    const wrapper = shallowMount(VueSignaturePad);

    wrapper.setData({
      signaturePad: {
        clear() {
          return true;
        }
      }
    });

    expect(wrapper.vm.clearSignature()).toBe(true);
  });

  it('should be read signature from given data', () => {
    const giveSignatureData =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

    const wrapper = shallowMount(VueSignaturePad, {
      propsData: {
        giveSignatureData
      }
    });

    wrapper.setData({
      signaturePad: {
        fromDataURL(data) {
          return data;
        }
      }
    });

    expect(wrapper.vm.fromDataURL(giveSignatureData)).toEqual(
      giveSignatureData
    );
  });

  it('should be return siganture pad empty status', () => {
    const wrapper = shallowMount(VueSignaturePad);

    wrapper.setData({
      signaturePad: {
        _data: '',
        isEmpty() {
          return this._data.length > 0 ? false : true;
        }
      }
    });

    expect(wrapper.vm.isEmpty()).toBe(true);
  });
});
