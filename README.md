# Vue Signature Pad

[![Build Status](https://img.shields.io/travis/neighborhood999/vue-signature-pad.svg?style=flat-square)](https://travis-ci.org/neighborhood999/vue-signature-pad)
[![npm](https://img.shields.io/npm/v/vue-signature-pad.svg?style=flat-square)](https://www.npmjs.com/package/vue-signature-pad)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![](https://img.shields.io/badge/module%20formats-cjs%2C%20esm%2C%20umd-green.svg?style=flat-square)

> Vue component wrap for [signature pad](https://github.com/szimek/signature_pad)

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

```js
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

## Props

| Name        | Type   | Default                                                                                                 | Description                                                         | Example                                                                                                                         |
| :---------- | :----- | :------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------ |
| width       | String | `100%`                                                                                                  | Set the canvas parent `div` width                                   | -                                                                                                                               |
| height      | String | `100%`                                                                                                  | Set the canvas parent `div` height                                  | -                                                                                                                               |
| saveType    | String | `image/png`                                                                                             | Save image type, support `image/png`, `image/jpeg`, `image/svg+xml` | -                                                                                                                               |
| options     | Object | [Reference](https://github.com/neighborhood999/vue-signature-pad/blob/master/src/utils/index.js#L3-L11) | Set the signature pad options                                       | [Reference](https://github.com/neighborhood999/vue-signature-pad/blob/master/src/utils/index.js#L3-L11)                         |
| images      | Array  | `[]`                                                                                                    | Merge signature with provide image                                  | `['A.png', 'B.png', 'C.png']` or `[{ src: 'A.png', x: 0, y: 0 }, { src: 'B.png', x: 0, y: 10 }, { src: 'C.png', x: 0, y: 20 }]` |
| customStyle | Object | `{}`                                                                                                    | Custom canvas parent `div` style                                    | `{ border: black 3px solid }`                                                                                                   |

## Methods

| Method Name                         | Argument Type    | Description                                              |
| :---------------------------------- | :--------------- | -------------------------------------------------------- |
| `saveSignature()`                   | -                | Will return target canvas **status** and **data**.       |
| `undoSignature()`                   | -                | Undo                                                     |
| `mergeImageAndSignature(signature)` | Object or String | Provide `images` as props and will merge with signature. |
| `addImages(images)`                 | Array            | Add more images merge with signature.                    |
| `lockSignaturePad()`                | -                | Lock target signature pad.                               |
| `openSignaturePad()`                | -                | Open target signature pad.                               |
| `getPropImagesAndCacheImages()`     | -                | Get all the images information.                          |
| `clearCacheImages()`                | -                | Clear cache images.                                      |

## Credits

[szimek/signature_pad](https://github.com/szimek/signature_pad) - HTML5 canvas based smooth signature drawing

## LICENSE

MIT © [Peng Jie](https://github.com/neighborhood999/)
