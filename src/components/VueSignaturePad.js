import SignaturePad from 'signature_pad';
import mergeImages from 'merge-images';
import { DEFAULT_OPTIONS, checkSaveType } from '../utils/index';

export default {
  name: 'VueSignaturePad',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    customStyle: {
      type: Object
    },
    saveType: {
      type: String,
      default: 'image/png'
    },
    options: {
      type: Object,
      default: () => ({})
    },
    images: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    signaturePad: {},
    cacheImages: []
  }),
  mounted() {
    const { options } = this;
    const canvas = this.$refs.signaturePadCanvas;
    const signaturePad = new SignaturePad(canvas, {
      ...DEFAULT_OPTIONS,
      ...options
    });
    this.signaturePad = signaturePad;

    window.addEventListener(
      'resize',
      this.resizeCanvas.bind(this, canvas),
      false
    );

    this.resizeCanvas(canvas);
  },
  methods: {
    resizeCanvas(canvas) {
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext('2d').scale(ratio, ratio);
      this.signaturePad.clear();
    },
    saveSignature() {
      const { signaturePad, saveType } = this;
      const status = { isEmpty: false, data: undefined };

      if (!checkSaveType(saveType)) {
        throw new Error('Image type is incorrect!');
      }

      if (signaturePad.isEmpty()) {
        return {
          ...status,
          isEmpty: true
        };
      }

      return {
        ...status,
        data: signaturePad.toDataURL(saveType)
      };
    },
    undoSignature() {
      const { signaturePad } = this;
      const record = signaturePad.toData();

      if (record) {
        return signaturePad.fromData(record.slice(0, -1));
      }
    },
    mergeImageAndSignature(customSignature) {
      this.cacheImages = [...this.cacheImages, customSignature];

      return mergeImages([...this.images, ...this.cacheImages]);
    },
    lockSignaturePad() {
      return this.signaturePad.off();
    },
    openSigaturePad() {
      return this.signaturePad.on();
    },
    getPropsImagesWithCachImages() {
      return this.propsImagesAndCustomImages;
    },
    clearCacheImages() {
      this.cacheImages = [];
    }
  },
  computed: {
    propsImagesAndCustomImages() {
      const nonreactiveCachImages = JSON.parse(
        JSON.stringify(...this.cacheImages)
      );

      return [...this.images, ...nonreactiveCachImages];
    }
  },
  render(createElement) {
    const { width, height, customStyle } = this;

    return createElement(
      'div',
      {
        style: {
          width,
          height,
          ...customStyle
        }
      },
      [
        createElement('canvas', {
          style: {
            width: '100%',
            height: '100%'
          },
          ref: 'signaturePadCanvas'
        })
      ]
    );
  }
};
