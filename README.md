# Vue Signature Pad

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
