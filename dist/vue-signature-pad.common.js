'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var SignaturePad = _interopDefault(require('signature_pad'));
var mergeImages = _interopDefault(require('merge-images'));

var SAVE_TYPE = ['image/png', 'image/jpeg', 'image/svg+xml'];

var DEFAULT_OPTIONS = {
  minWidth: 0.5,
  maxWidth: 2.5,
  throttle: 16,
  minDistance: 5,
  backgroundColor: 'rgba(0,0,0,0)',
  penColor: 'black',
  velocityFilterWeight: 0.7
};

var checkSaveType = function (type) { return SAVE_TYPE.includes(type); };

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
    signaturePad: {}
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
      var ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext('2d').scale(ratio, ratio);
      this.signaturePad.clear();
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
      }

      return Object.assign({}, status,
        {data: signaturePad.toDataURL(saveType)});
    },
    undoSignature: function undoSignature() {
      var ref = this;
      var signaturePad = ref.signaturePad;
      var record = signaturePad.toData();

      if (record) {
        return signaturePad.fromData(record.slice(0, -1));
      }

      return;
    },
    mergeImageAndSignature: function mergeImageAndSignature(customSignature) {
      return mergeImages(this.images.concat( [customSignature]));
    }
  },
  render: function render(createElement) {
    var ref = this;
    var width = ref.width;
    var height = ref.height;

    return createElement(
      'div',
      {
        style: {
          width: width,
          height: height
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

VueSignaturePad.install = function (Vue) { return Vue.component(VueSignaturePad.name, VueSignaturePad); };

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueSignaturePad);
}

module.exports = VueSignaturePad;
