# Vue 3 Examples
_____

Vue 3 Example for adding vue-signature-pad in Single Page Component

## Usage in Single Page Component

```html
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
import { defineComponent } from "vue";
import { VueSignaturePad } from 'vue-signature-pad';

export default defineComponent({
  name: 'MySignaturePad',
  components: { VueSignaturePad },
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
