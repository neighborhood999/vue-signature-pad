# Getting Started

::: info
Note: If you are still using Vue 2, please install 2.0.5 version, for Vue 3 you can install the latest publish version.
:::

::: info
Vue component wrap for signature pad
:::

### Installation

```cmd
yarn add vue-signature-pad
```

## Props

| Name                    | Type    | Default                                                                                                 | Description                                                                                                                      | Example                                                                                                                         |
|:------------------------|:--------|:--------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------|
| width                   | String  | `100%`                                                                                                  | Set the `div` width.                                                                                                             | -                                                                                                                               |
| height                  | String  | `100%`                                                                                                  | Set the `div` height.                                                                                                            | -                                                                                                                               |
| options                 | Object  | [Reference](https://github.com/neighborhood999/vue-signature-pad/blob/master/src/utils/index.js#L5-L13) | Set the signature pad options.                                                                                                   | [Reference](https://github.com/neighborhood999/vue-signature-pad/blob/master/src/utils/index.js#L5-L13)                         |
| images                  | Array   | `[]`                                                                                                    | Merge signature with the provide images.                                                                                         | `['A.png', 'B.png', 'C.png']` or `[{ src: 'A.png', x: 0, y: 0 }, { src: 'B.png', x: 0, y: 10 }, { src: 'C.png', x: 0, y: 20 }]` |
| customStyle             | Object  | `{}`                                                                                                    | Custom `div` style.                                                                                                              | `{ border: black 3px solid }`                                                                                                   |
| scaleToDevicePixelRatio | Boolean | `true`                                                                                                  | Scale the canvas up to match the [device pixel ratio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio). | -                                                                                                                               |

## Methods

| Name                                   | Argument Type                | Description                                                                 |
| :------------------------------------- | :--------------------------- | --------------------------------------------------------------------------- |
| `saveSignature(type, encoderOptions)`  | `(String, Number)`           | Will return target canvas **status** and **data**.                          |
| `undoSignature()`                      | -                            | Undo                                                                        |
| `clearSignature()`                     | -                            | Clear                                                                       |
| `mergeImageAndSignature(signature)`    | `Object` or `String`         | Provide `images` as props and will merge with signature.                    |
| `addImages(images)`                    | `Array`                      | Provide the images merge with signature. Reference above `images` property. |
| `lockSignaturePad()`                   | -                            | Lock target signature pad.                                                  |
| `openSignaturePad()`                   | -                            | Open target signature pad.                                                  |
| `getPropImagesAndCacheImages()`        | -                            | Get all the images information.                                             |
| `clearCacheImages()`                   | -                            | Clear cache images.                                                         |
| `fromDataURL(data, options, callback)` | `(String, Object, Callback)` | Draw image from data URL.                                                   |
| `fromData(data)`                       | `String`                     | Returns signature image as an array of point groups.                        |
| `toData()`                             | -                            | Draws signature image from an array of point groups.                        |
| `isEmpty()`                            | -                            | Return signature canvas have data.                                          |

## Credits

[szimek/signature_pad](https://github.com/szimek/signature_pad) - HTML5 canvas based smooth signature drawing
