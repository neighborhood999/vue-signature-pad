import pkg from './package.json';
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

const GLOBALS = {
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
    { file: pkg.main, format: 'cjs', globals: GLOBALS },
    {
      file: pkg.module,
      format: 'es',
      globals: GLOBALS
    },
    {
      file: pkg.unpkg,
      format: 'umd',
      name: 'vue-signature-pad',
      globals: GLOBALS
    }
  ]
};

if (isProduction) {
  config.plugins.push(
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  );
  config.plugins.push(uglify());
}

export default config;
