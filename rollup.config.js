import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import vue from 'rollup-plugin-vue';
import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

const globals = {
  vue: 'Vue',
  signature_pad: 'SignaturePad',
  'merge-images': 'mergeImages'
};
const external = ['vue', 'signature_pad', 'merge-images'];

const baseConfig = {
  input: 'src/entry.js',
  plugins: [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    vue({
      css: true,
      template: {
        isProduction: true
      }
    }),
    resolve({ browser: true }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.vue'],
      babelHelpers: 'bundled'
    }),
    sizeSnapshot()
  ]
};

const buildFormats = [
  {
    ...baseConfig,
    external,
    output: {
      file: 'dist/vue-signature-pad.esm.js',
      format: 'esm',
      exports: 'named'
    }
  },
  {
    ...baseConfig,
    external,
    plugins: [
      ...baseConfig.plugins,
      vue({
        ...baseConfig.plugins.vue,
        template: {
          isProduction: true,
          optimizeSSR: true
        }
      })
    ],
    output: {
      compact: true,
      file: 'dist/vue-signature-pad.ssr.js',
      format: 'cjs',
      name: 'VueSignaturePad',
      exports: 'auto',
      globals
    }
  },
  {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: 'dist/vue-signature-pad.min.js',
      format: 'iife',
      name: 'VueSignaturePad',
      exports: 'named',
      globals
    },
    plugins: [
      ...baseConfig.plugins,
      terser({
        output: {
          ecma: 5
        }
      })
    ]
  }
];

export default buildFormats;
