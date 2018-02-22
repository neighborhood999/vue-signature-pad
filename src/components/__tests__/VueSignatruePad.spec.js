import { shallow } from '@vue/test-utils';
import VueSignaturePad from '../VueSignaturePad';
import { signatureMockData, mockEncodeDataURL } from './mock';

describe('VueSignaturePad Component', () => {
  it('should be receive default props', () => {
    const wrapper = shallow(VueSignaturePad);

    const expectedWidth = '100%';
    const expectedHeight = '100%';
    const expectedSaveType = 'image/png';
    const expectedOptions = {};
    const expectedImages = [];

    expect(wrapper.props().width).toBe(expectedWidth);
    expect(wrapper.props().height).toBe(expectedHeight);
    expect(wrapper.props().options).toEqual(expectedOptions);
    expect(wrapper.props().images).toEqual(expectedImages);
  });

  it('should it throw incorrect image error message', () => {
    const addOptionsWrapper = shallow(VueSignaturePad, {
      propsData: {
        saveType: 'text/html'
      }
    });

    expect(() => addOptionsWrapper.vm.saveSignature()).toThrow();
  });

  it('should it return signaturePad status and data', () => {
    const wrapper = shallow(VueSignaturePad);

    wrapper.vm.saveSignature();
    expect(wrapper.vm.saveSignature()).toEqual({
      isEmpty: true,
      data: undefined
    });

    wrapper.setData({
      signaturePad: {
        ...wrapper.vm.signaturePad,
        _data: signatureMockData,
        isEmpty() {
          return false;
        },
        toDataURL(type, ...options) {
          return mockEncodeDataURL;
        }
      }
    });
    expect(wrapper.vm.saveSignature()).toEqual({
      isEmpty: false,
      data: mockEncodeDataURL
    });
  });

  it('should it undo draw action', () => {
    const wrapper = shallow(VueSignaturePad);

    wrapper.setData({
      signaturePad: {
        ...wrapper.vm.signaturePad,
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
});
