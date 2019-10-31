# Vue Signature Pad

[![Build Status](https://flat.badgen.net/travis/neighborhood999/vue-signature-pad)](https://travis-ci.org/neighborhood999/vue-signature-pad)
[![npm](https://flat.badgen.net/npm/v/vue-signature-pad)](https://www.npmjs.com/package/vue-signature-pad)
[![styled with prettier](https://flat.badgen.net/badge/style%20with/prettier/ff69b4)](https://github.com/prettier/prettier)
![](https://flat.badgen.net/badge/module%20formats/cjs,%20esm,%20umd/green)

> Vue component wrap for [signature pad](https://github.com/szimek/signature_pad)

## Demo

[![Edit Vue Signature Pad Demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/n5qjp3oqv4)

## Installation

```sh
yarn add vue-signature-pad
```

## Usage

```js
import Vue from 'vue';
import VueSignaturePad from 'vue-signature-pad';

Vue.use(VueSignaturePad);
```

```vue
<template>
  <div id="app">
    <VueSignaturePad
      width="500px"
      height="500px"
      ref="signaturePad"
    />
    <div>
      <button @click="save">Save</button>
      <button @click="undo">Undo</button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'MySignaturePad',
    methods: {
      undo() {
        this.$refs.signaturePad.undoSignature();
      },
      save() {
        const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
        console.log(isEmpty);
        console.log(data);
      }
    }
  }
</script>
```

[vue-signature-pad](https://github.com/neighborhood999/vue-signature-pad) use [szimek/signature_pad](https://github.com/szimek/signature_pad) default setting as `options`, feel free custom you wanted options. In [v1.1](https://github.com/neighborhood999/vue-signature-pad/releases/tag/1.1.0) add `onBegin` and `onEnd` event callback:

```vue
<template>
  <div id="app">
    <VueSignaturePad
      width="500px"
      height="500px"
      ref="signaturePad"
      :options="{ onBegin, onEnd }"
    />
  </div>
</template>
<script>
export default {
  methods: {
    onBegin() {
      console.log('=== Begin ===');
    },
    onEnd() {
      console.log('=== End ===');
    }
  }
}
</script>
```

## Props

| Name        | Type   | Default                                                                                                 | Description                                                     | Example                                                                                                                         |
| :---------- | :----- | :------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| width       | String | `100%`                                                                                                  | Set the `div` width.                                            | -                                                                                                                               |
| height      | String | `100%`                                                                                                  | Set the `div` height.                                           | -                                                                                                                               |
| saveType    | String | `image/png`                                                                                             | Image type, support `image/png`, `image/jpeg`, `image/svg+xml`. | -                                                                                                                               |
| options     | Object | [Reference](https://github.com/neighborhood999/vue-signature-pad/blob/master/src/utils/index.js#L5-L13) | Set the signature pad options.                                  | [Reference](https://github.com/neighborhood999/vue-signature-pad/blob/master/src/utils/index.js#L5-L13)                         |
| images      | Array  | `[]`                                                                                                    | Merge signature with the provide images.                        | `['A.png', 'B.png', 'C.png']` or `[{ src: 'A.png', x: 0, y: 0 }, { src: 'B.png', x: 0, y: 10 }, { src: 'C.png', x: 0, y: 20 }]` |
| customStyle | Object | `{}`                                                                                                    | Custom `div` style.                                             | `{ border: black 3px solid }`                                                                                                   |

## Methods

| Name                                   | Argument Type                | Description                                                                 |
| :------------------------------------- | :--------------------------- | --------------------------------------------------------------------------- |
| `saveSignature()`                      | -                            | Will return target canvas **status** and **data**.                          |
| `undoSignature()`                      | -                            | Undo                                                                        |
| `clearSignature()`                     | -                            | Clear                                                                       |
| `mergeImageAndSignature(signature)`    | `Object` or `String`         | Provide `images` as props and will merge with signature.                    |
| `addImages(images)`                    | `Array`                      | Provide the images merge with signature. Reference above `images` property. |
| `lockSignaturePad()`                   | -                            | Lock target signature pad.                                                  |
| `openSignaturePad()`                   | -                            | Open target signature pad.                                                  |
| `getPropImagesAndCacheImages()`        | -                            | Get all the images information.                                             |
| `clearCacheImages()`                   | -                            | Clear cache images.                                                         |
| `fromDataURL(data, options, callback)` | `(String, Object, callback)` | Draw image from data URL.                                                   |
| `fromData(data)`                       | `String`                     | Returns signature image as an array of point groups.                        |
| `toData()`                             | -                            | Draws signature image from an array of point groups.                        |
| `isEmpty()`                            | -                            | Return signature canvas have data.                                          |


## Credits

[szimek/signature_pad](https://github.com/szimek/signature_pad) - HTML5 canvas based smooth signature drawing

## LICENSE

MIT © [Peng Jie](https://github.com/neighborhood999/)
