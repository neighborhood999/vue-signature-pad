'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var SignaturePad = _interopDefault(require('signature_pad'));
var mergeImages = _interopDefault(require('merge-images'));

var SAVE_TYPE = ['image/png', 'image/jpeg', 'image/svg+xml'];

var checkSaveType = function (type) { return SAVE_TYPE.includes(type); };

var DEFAULT_OPTIONS = {
  minWidth: 0.5,
  maxWidth: 2.5,
  throttle: 16,
  minDistance: 5,
  backgroundColor: 'rgba(0,0,0,0)',
  penColor: 'black',
  velocityFilterWeight: 0.7
};

var convert2NonReactive = function (observerValue) { return JSON.parse(JSON.stringify(observerValue)); };

var TRANSPARENT_PNG = {
  src:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
  x: 0,
  y: 0
};

var VueSignaturePad = {
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
      default: function () { return ({}); }
    },
    images: {
      type: Array,
      default: function () { return []; }
    }
  },
  data: function () { return ({
    signaturePad: {},
    cacheImages: [],
    signatureData: TRANSPARENT_PNG
  }); },
  mounted: function mounted() {
    var ref = this;
    var options = ref.options;
    var canvas = this.$refs.signaturePadCanvas;
    var signaturePad = new SignaturePad(canvas, Object.assign({}, DEFAULT_OPTIONS,
      options));
    this.signaturePad = signaturePad;

    window.addEventListener(
      'resize',
      this.resizeCanvas.bind(this, canvas),
      false
    );

    this.resizeCanvas(canvas);
  },
  methods: {
    resizeCanvas: function resizeCanvas(canvas) {
      var data = this.signaturePad.toData();
      var ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext('2d').scale(ratio, ratio);
      this.signaturePad.clear();
      this.signatureData = TRANSPARENT_PNG;
      this.signaturePad.fromData(data);
    },
    saveSignature: function saveSignature() {
      var ref = this;
      var signaturePad = ref.signaturePad;
      var saveType = ref.saveType;
      var status = { isEmpty: false, data: undefined };

      if (!checkSaveType(saveType)) {
        throw new Error('Image type is incorrect!');
      }

      if (signaturePad.isEmpty()) {
        return Object.assign({}, status,
          {isEmpty: true});
      } else {
        this.signatureData = signaturePad.toDataURL(saveType);

        return Object.assign({}, status,
          {data: this.signatureData});
      }
    },
    undoSignature: function undoSignature() {
      var ref = this;
      var signaturePad = ref.signaturePad;
      var record = signaturePad.toData();

      if (record) {
        return signaturePad.fromData(record.slice(0, -1));
      }
    },
    mergeImageAndSignature: function mergeImageAndSignature(customSignature) {
      this.signatureData = customSignature;

      return mergeImages(this.images.concat( this.cacheImages,
        [this.signatureData]
      ));
    },
    addImages: function addImages(images) {
      if ( images === void 0 ) images = [];

      this.cacheImages = this.cacheImages.concat( images);

      return mergeImages(this.images.concat( this.cacheImages,
        [this.signatureData]
      ));
    },
    fromDataURL: function fromDataURL(data) {
      return this.signaturePad.fromDataURL(data);
    },
    lockSignaturePad: function lockSignaturePad() {
      return this.signaturePad.off();
    },
    openSignaturePad: function openSignaturePad() {
      return this.signaturePad.on();
    },
    isEmpty: function isEmpty() {
      return this.signaturePad.isEmpty();
    },
    getPropImagesAndCacheImages: function getPropImagesAndCacheImages() {
      return this.propsImagesAndCustomImages;
    },
    clearCacheImages: function clearCacheImages() {
      this.cacheImages = [];

      return this.cacheImages;
    },
    clearSignature: function clearSignature() {
      return this.signaturePad.clear();
    }
  },
  computed: {
    propsImagesAndCustomImages: function propsImagesAndCustomImages() {
      var nonReactiveProrpImages = convert2NonReactive(this.images);
      var nonReactiveCachImages = convert2NonReactive(this.cacheImages);

      return nonReactiveProrpImages.concat( nonReactiveCachImages);
    }
  },
  render: function render(createElement) {
    var ref = this;
    var width = ref.width;
    var height = ref.height;
    var customStyle = ref.customStyle;

    return createElement(
      'div',
      {
        style: Object.assign({}, {width: width,
          height: height},
          customStyle)
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

VueSignaturePad.install = function (Vue) { return Vue.component(VueSignaturePad.name, VueSignaturePad); };

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueSignaturePad);
}

module.exports = VueSignaturePad;
