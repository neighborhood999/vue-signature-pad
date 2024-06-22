import fs from 'fs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import vue from 'rollup-plugin-vue';
import postCSS from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

import minimist from 'minimist';

const esbrowserslist = fs
  .readFileSync('./.browserslistrc')
  .toString()
  .split('\n')
  .filter(entry => entry && entry.substring(0, 2) !== 'ie');

const argv = minimist(process.argv.slice(2));

const external = ['vue', 'merge-images', 'signature_pad'];
const globals = {
  vue: 'Vue',
  signature_pad: 'SignaturePad',
  'merge-images': 'mergeImages'
};

const baseConfig = {
  input: 'src/entry.js',
  plugins: {
    replace: {
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production')
    },
    postVue: [
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
      }),
      postCSS({
        modules: {
          generateScopedName: '[local]___[hash:base64:5]'
        },
        include: /&module=.*\.css$/
      }),
      postCSS({ include: /(?<!&module=.*)\.css$/ }),
      commonjs()
    ],
    babel: {
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      babelHelpers: 'bundled'
    }
  }
};

const buildFormats = [];
if (!argv.format || argv.format === 'es') {
  const esConfig = {
    ...baseConfig,
    input: 'src/entry.esm.js',
    external,
    output: {
      file: 'dist/vue-signature-pad.esm.js',
      format: 'esm',
      exports: 'named'
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      babel({
        ...baseConfig.plugins.babel,
        presets: [
          [
            '@babel/preset-env',
            {
              targets: esbrowserslist
            }
          ]
        ]
      })
    ]
  };
  buildFormats.push(esConfig);
}

if (!argv.format || argv.format === 'cjs') {
  const umdConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: 'dist/vue-signature-pad.ssr.js',
      format: 'cjs',
      name: 'VueSignaturePad',
      exports: 'auto',
      globals
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      babel(baseConfig.plugins.babel)
    ]
  };
  buildFormats.push(umdConfig);
}

if (!argv.format || argv.format === 'iife') {
  const unpkgConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: 'dist/vue-signature-pad.min.js',
      format: 'iife',
      name: 'VueSignaturePad',
      exports: 'auto',
      globals
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      babel(baseConfig.plugins.babel),
      terser({
        output: {
          ecma: 5
        }
      })
    ]
  };
  buildFormats.push(unpkgConfig);
}

export default buildFormats;
