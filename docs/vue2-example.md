# Vue 2 Examples

Vue 2 Example for adding vue-signature-pad

## 1. Registering Component

```js
import Vue from 'vue';
import VueSignaturePad from 'vue-signature-pad';

Vue.use(VueSignaturePad);
```

## 2. Using Component

```vue
<template>
  <div id="app">
    <VueSignaturePad width="500px" height="500px" ref="signaturePad" />
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
};
</script>
```

### Demo

[![Edit Vue Signature Pad Demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/n5qjp3oqv4)



