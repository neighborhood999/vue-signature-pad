import pkg from './package.json';
import bubble from '@rollup/plugin-buble';
import minify from 'rollup-plugin-babel-minify';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

const globals = {
  signature_pad: 'SignaturePad',
  'merge-images': 'mergeImages'
};
const isProduction = process.env.NODE_ENV === 'production';

const config = {
  input: 'src/index.js',
  external: ['signature_pad', 'merge-images'],
  plugins: [
    bubble({
      exclude: 'node_modules/**',
      objectAssign: true
    }),
    nodeResolve({ browser: true }),
    commonjs({
      include: 'node_modules/**'
    })
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
  config.plugins.push(minify());
  config.plugins.push(sizeSnapshot());
}

export default config;
