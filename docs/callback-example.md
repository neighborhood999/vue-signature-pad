# Call Back Examples

[vue-signature-pad](https://github.com/neighborhood999/vue-signature-pad) use [szimek/signature_pad](https://github.com/szimek/signature_pad) default setting as `options`, feel free custom you wanted options. In [v1.1](https://github.com/neighborhood999/vue-signature-pad/releases/tag/1.1.0) add `onBegin` and `onEnd` event callback:

```html
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
};
</script>
```
