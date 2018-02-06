# Vue Signature Pad

## Installation

```sh
yarn add vue-signature-pad
```

## Props

| Name     | Type   | Default                                                                                            | Description                                                         |
| :------- | :----- | :------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------ |
| width    | String | `100%`                                                                                             | Set the canvas parent `div` width                                   |
| height   | String | `100%`                                                                                             | Set the canvas parent `div` height                                  |
| saveType | String | `image/png`                                                                                        | Save image type, Support `image/png`, `image/jpeg`, `image/svg+xml` |
| options  | Object | [Here](https://github.com/neighborhood999/vue-signature-pad/blob/master/src/utils/index.js#L3-L11) | Set the signature pad options                                       |
| images   | Array  | `[]`                                                                                               | You can merge signature with provide image                          |


## Credits

[szimek/signature_pad](https://github.com/szimek/signature_pad) - HTML5 canvas based smooth signature drawing

## LICENSE

MIT © [Peng Jie](https://github.com/neighborhood999/)
