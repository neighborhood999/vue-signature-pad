# Vue Signature Pad

[![Build Status](https://img.shields.io/travis/neighborhood999/vue-signature-pad.svg?style=flat-square)](https://travis-ci.org/neighborhood999/vue-signature-pad)
[![npm](https://img.shields.io/npm/v/vue-signature-pad.svg?style=flat-square)](https://www.npmjs.com/package/vue-signature-pad)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![](https://img.shields.io/badge/module%20formats-cjs%2C%20esm%2C%20umd-green.svg?style=flat-square)

## Installation

```sh
yarn add vue-signature-pad
```

## Props

| Name     | Type   | Default                                                                                            | Description                                                         | Example                                                                                                                         |
| :------- | :----- | :------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------ |
| width    | String | `100%`                                                                                             | Set the canvas parent `div` width                                   | -                                                                                                                               |
| height   | String | `100%`                                                                                             | Set the canvas parent `div` height                                  | -                                                                                                                               |
| saveType | String | `image/png`                                                                                        | Save image type, Support `image/png`, `image/jpeg`, `image/svg+xml` | -                                                                                                                               |
| options  | Object | [Here](https://github.com/neighborhood999/vue-signature-pad/blob/master/src/utils/index.js#L3-L11) | Set the signature pad options                                       | Please Reference [Here](https://github.com/neighborhood999/vue-signature-pad/blob/master/src/utils/index.js#L3-L11)             |
| images   | Array  | `[]`                                                                                               | You can merge signature with provide image                          | `['A.png', 'B.png', 'C.png']` or `[{ src: 'A.png', x: 0, y: 0 }, { src: 'B.png', x: 0, y: 10 }, { src: 'C.png', x: 0, y: 20 }]` |


## Credits

[szimek/signature_pad](https://github.com/szimek/signature_pad) - HTML5 canvas based smooth signature drawing

## LICENSE

MIT © [Peng Jie](https://github.com/neighborhood999/)
