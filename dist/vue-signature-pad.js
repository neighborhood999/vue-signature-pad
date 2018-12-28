(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('signature_pad'), require('merge-images')) :
  typeof define === 'function' && define.amd ? define(['signature_pad', 'merge-images'], factory) :
  (global = global || self, global['vue-signature-pad'] = factory(global.SignaturePad, global.mergeImages));
}(this, function (SignaturePad, mergeImages) { 'use strict';

  SignaturePad = SignaturePad && SignaturePad.hasOwnProperty('default') ? SignaturePad['default'] : SignaturePad;
  mergeImages = mergeImages && mergeImages.hasOwnProperty('default') ? mergeImages['default'] : mergeImages;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var SAVE_TYPE = ['image/png', 'image/jpeg', 'image/svg+xml'];
  var checkSaveType = function checkSaveType(type) {
    return SAVE_TYPE.includes(type);
  };
  var DEFAULT_OPTIONS = {
    dotSize: (0.5 + 2.5) / 2,
    minWidth: 0.5,
    maxWidth: 2.5,
    throttle: 16,
    minDistance: 5,
    backgroundColor: 'rgba(0,0,0,0)',
    penColor: 'black',
    velocityFilterWeight: 0.7,
    onBegin: function onBegin() {},
    onEnd: function onEnd() {}
  };
  var convert2NonReactive = function convert2NonReactive(observerValue) {
    return JSON.parse(JSON.stringify(observerValue));
  };
  var TRANSPARENT_PNG = {
    src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
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
        default: function _default() {
          return {};
        }
      },
      images: {
        type: Array,
        default: function _default() {
          return [];
        }
      }
    },
    data: function data() {
      return {
        signaturePad: {},
        cacheImages: [],
        signatureData: TRANSPARENT_PNG,
        onResizeHandler: null
      };
    },
    mounted: function mounted() {
      var options = this.options;
      var canvas = this.$refs.signaturePadCanvas;
      var signaturePad = new SignaturePad(canvas, _objectSpread({}, DEFAULT_OPTIONS, options));
      this.signaturePad = signaturePad;
      this.onResizeHandler = this.resizeCanvas.bind(this);
      window.addEventListener('resize', this.onResizeHandler, false);
      this.resizeCanvas();
    },
    beforeDestroy: function beforeDestroy() {
      if (this.onResizeHandler) {
        window.removeEventListener('resize', this.onResizeHandler, false);
      }
    },
    methods: {
      resizeCanvas: function resizeCanvas() {
        var canvas = this.$refs.signaturePadCanvas;
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
        var signaturePad = this.signaturePad,
            saveType = this.saveType;
        var status = {
          isEmpty: false,
          data: undefined
        };

        if (!checkSaveType(saveType)) {
          throw new Error('Image type is incorrect!');
        }

        if (signaturePad.isEmpty()) {
          return _objectSpread({}, status, {
            isEmpty: true
          });
        } else {
          this.signatureData = signaturePad.toDataURL(saveType);
          return _objectSpread({}, status, {
            data: this.signatureData
          });
        }
      },
      undoSignature: function undoSignature() {
        var signaturePad = this.signaturePad;
        var record = signaturePad.toData();

        if (record) {
          return signaturePad.fromData(record.slice(0, -1));
        }
      },
      mergeImageAndSignature: function mergeImageAndSignature(customSignature) {
        this.signatureData = customSignature;
        return mergeImages([].concat(_toConsumableArray(this.images), _toConsumableArray(this.cacheImages), [this.signatureData]));
      },
      addImages: function addImages() {
        var images = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        this.cacheImages = [].concat(_toConsumableArray(this.cacheImages), _toConsumableArray(images));
        return mergeImages([].concat(_toConsumableArray(this.images), _toConsumableArray(this.cacheImages), [this.signatureData]));
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
        return [].concat(_toConsumableArray(nonReactiveProrpImages), _toConsumableArray(nonReactiveCachImages));
      }
    },
    render: function render(createElement) {
      var width = this.width,
          height = this.height,
          customStyle = this.customStyle;
      return createElement('div', {
        style: _objectSpread({
          width: width,
          height: height
        }, customStyle)
      }, [createElement('canvas', {
        style: {
          width: '100%',
          height: '100%'
        },
        ref: 'signaturePadCanvas'
      })]);
    }
  };

  VueSignaturePad.install = function (Vue) {
    return Vue.component(VueSignaturePad.name, VueSignaturePad);
  };

  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueSignaturePad);
  }

  return VueSignaturePad;

}));
