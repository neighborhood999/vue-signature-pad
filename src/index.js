import SignaturePad from './components/VueSignaturePad';

function install(Vue) {
  if (install.installed) {
    return;
  }

  install.installed = true;
  Vue.component(SignaturePad.name, SignaturePad);
}

const plugin = {
  install
};

let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
}

if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default plugin;
