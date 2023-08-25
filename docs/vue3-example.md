# Vue 3 Examples

Vue 3 Example for adding vue-signature-pad


## 1. Registering Component Globally

```js
import { createApp } from 'vue'
import App from './App.vue'
import { VueSignaturePad } from 'vue-signature-pad';

const app = createApp(App)
app.component("VueSignaturePad", VueSignaturePad);
app.mount('#app')
```

## 2. Using Component

```html
<template>
  <div id="app">
    <VueSignaturePad ref="signaturePad" />
    <div>
      <button @click="save">Save</button>
      <button @click="undo">Undo</button>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
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
});
</script>
```

## Demo Vue 3

[![Edit Vue Signature Pad Demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/broken-flower-22ot7m)
