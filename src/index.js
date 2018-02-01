import VueSignaturePad from './components/VueSignaturePad';

VueSignaturePad.install = Vue =>
  Vue.component(VueSignaturePad.name, VueSignaturePad);

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueSignaturePad);
}

export default VueSignaturePad;
