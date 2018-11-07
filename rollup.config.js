import pkg from './package.json';
import buble from 'rollup-plugin-buble';
import { uglify } from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

const globals = {
  signature_pad: 'SignaturePad',
  'merge-images': 'mergeImages'
};
const isProduction = process.env.NODE_ENV === 'production';

const config = {
  input: 'src/index.js',
  external: ['signature_pad', 'merge-images'],
  plugins: [
    buble({
      objectAssign: 'Object.assign'
    }),
    nodeResolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs()
  ],
  output: [
    { file: pkg.main, format: 'cjs', globals },
    {
      file: pkg.module,
      format: 'es',
      globals
    },
    {
      file: pkg.unpkg,
      format: 'umd',
      name: 'vue-signature-pad',
      globals
    }
  ]
};

if (isProduction) {
  config.plugins.push(
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  );
  config.plugins.push(uglify({}, minify));
}

export default config;
