import * as components from './components';

const install = function installVSignature(Vue) {
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
};

export default install;

export * from './components';
