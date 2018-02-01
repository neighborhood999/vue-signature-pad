import SignaturePad from 'signature_pad';
import { DEFAULT_OPTIONS, checkSaveType, undo } from '../utils/index';

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
    saveType: {
      type: String,
      default: 'image/png'
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    signaturePad: {}
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
      if (this.signaturePad.isEmpty()) return;

      if (!checkSaveType(this.saveType)) {
        throw new Error('Image type is incorrect!');
      }

      const data = this.signaturePad.toDataURL(this.saveType);

      return data;
    },
    undoSignature() {
      undo(this.signaturePad);
    }
  },
  render(createElement) {
    const { width, height } = this;

    return createElement(
      'div',
      {
        style: {
          width,
          height
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
