<template>
  <div :style="{width, height}">
    <canvas
      class="signature-pad"
      ref="signaturePadCanvas"
    />
  </div>
</template>

<script>
import SignaturePad from 'signature_pad';
import { checkSaveType, undo } from '../utils';

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
      default: () => ({
        minWidth: 0.5,
        maxWidth: 2.5,
        throttle: 16,
        minDistance: 5,
        backgroundColor: 'rgba(0,0,0,0)',
        penColor: 'black',
        velocityFilterWeight: 0.7
      })
    }
  },
  data: () => ({
    signaturePad: {}
  }),
  mounted() {
    const canvas = this.$refs.signaturePadCanvas;
    const signaturePad = new SignaturePad(canvas, this.options);
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
  }
};
</script>
<style scoped>
.signature-pad {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: white;
}
</style>
