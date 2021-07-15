import plugin, * as components from './entry.esm';

Object.entries(components).forEach(([componentName, component]) => {
  if (componentName !== 'default') {
    const key = componentName;
    const val = component;

    plugin[key] = val;
  }
});

export default plugin;
