import SignaturePad from 'signature_pad';
import mergeImages from 'merge-images';
import {
  DEFAULT_OPTIONS,
  TRANSPARENT_PNG,
  checkSaveType
} from '../utils/index';

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
    cacheImages: [],
    signatureData: { src: TRANSPARENT_PNG, x: 0, y: 0 }
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
      this.signatureData = { src: TRANSPARENT_PNG, x: 0, y: 0 };
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
      } else {
        this.signatureData = signaturePad.toDataURL(saveType);

        return {
          ...status,
          data: this.signatureData
        };
      }
    },
    undoSignature() {
      const { signaturePad } = this;
      const record = signaturePad.toData();

      if (record) {
        return signaturePad.fromData(record.slice(0, -1));
      }
    },
    mergeImageAndSignature(customSignature) {
      this.signatureData = customSignature;

      return mergeImages([
        ...this.images,
        ...this.cacheImages,
        this.signatureData
      ]);
    },
    addImages(images = []) {
      this.cacheImages = [...this.cacheImages, ...images];

      return mergeImages([
        ...this.images,
        ...this.cacheImages,
        this.signatureData
      ]);
    },
    lockSignaturePad() {
      return this.signaturePad.off();
    },
    openSignaturePad() {
      return this.signaturePad.on();
    },
    getPropImagesAndCacheImages() {
      return this.propsImagesAndCustomImages;
    },
    clearCacheImages() {
      this.cacheImages = [];
    }
  },
  computed: {
    propsImagesAndCustomImages() {
      const nonReactiveProrpImages = JSON.parse(JSON.stringify(this.images));
      const nonReactiveCachImages = JSON.parse(
        JSON.stringify(this.cacheImages)
      );

      return [...nonReactiveProrpImages, ...nonReactiveCachImages];
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
