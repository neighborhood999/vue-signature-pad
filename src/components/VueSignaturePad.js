import SignaturePad from "signature_pad";
import mergeImages from "merge-images";
import {
  DEFAULT_OPTIONS,
  TRANSPARENT_PNG,
  checkSaveType,
  convert2NonReactive
} from "../utils/index";

export default {
  name: "VueSignaturePad",
  props: {
    color: {
      type: String,
      default: "black"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "100%"
    },
    customStyle: {
      type: Object
    },
    saveType: {
      type: String,
      default: "image/png"
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
    signatureData: TRANSPARENT_PNG,
    onResizeHandler: null
  }),
  mounted() {
    const { options } = this;
    const canvas = this.$refs.signaturePadCanvas;
    const signaturePad = new SignaturePad(canvas, {
      ...DEFAULT_OPTIONS,
      ...options
    });
    this.signaturePad = signaturePad;

    this.onResizeHandler = this.resizeCanvas.bind(this);

    window.addEventListener("resize", this.onResizeHandler, false);

    this.resizeCanvas();
  },
  beforeDestroy() {
    if (this.onResizeHandler) {
      window.removeEventListener("resize", this.onResizeHandler, false);
    }
  },
  methods: {
    resizeCanvas() {
      const canvas = this.$refs.signaturePadCanvas;
      const data = this.signaturePad.toData();
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext("2d").scale(ratio, ratio);
      this.signaturePad.clear();
      this.signatureData = TRANSPARENT_PNG;
      this.signaturePad.fromData(data);
    },
    saveSignature() {
      const { signaturePad, saveType } = this;
      const status = { isEmpty: false, data: undefined };

      if (!checkSaveType(saveType)) {
        throw new Error("Image type is incorrect!");
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
    fromDataURL(data) {
      return this.signaturePad.fromDataURL(data);
    },
    lockSignaturePad() {
      return this.signaturePad.off();
    },
    openSignaturePad() {
      return this.signaturePad.on();
    },
    isEmpty() {
      return this.signaturePad.isEmpty();
    },
    getPropImagesAndCacheImages() {
      return this.propsImagesAndCustomImages;
    },
    clearCacheImages() {
      this.cacheImages = [];

      return this.cacheImages;
    },
    clearSignature() {
      return this.signaturePad.clear();
    }
  },
  computed: {
    propsImagesAndCustomImages() {
      const nonReactiveProrpImages = convert2NonReactive(this.images);
      const nonReactiveCachImages = convert2NonReactive(this.cacheImages);

      return [...nonReactiveProrpImages, ...nonReactiveCachImages];
    }
  },
  updated() {
    this.signaturePad.penColor = this.props.color;
  },
  render(createElement) {
    const { width, height, customStyle } = this;

    return createElement(
      "div",
      {
        style: {
          width,
          height,
          ...customStyle
        }
      },
      [
        createElement("canvas", {
          style: {
            width: "100%",
            height: "100%"
          },
          ref: "signaturePadCanvas"
        })
      ]
    );
  }
};
