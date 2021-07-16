<script>
import Vue from 'vue';
import { VueSignaturePad } from '../src/entry.esm';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueSignaturePad
  },
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

<template>
  <div id="app">
    <vue-signature-pad
      id="signature"
      ref="signaturePad"
      width="500px"
      height="500px"
    />
    <div id="buttons">
      <button @click="save">Save</button>
      <button @click="undo">Undo</button>
    </div>
  </div>
</template>
<style>
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

#buttons {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

#signature {
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, #4bc5e8, #9f6274);
  background-origin: border-box;
  background-clip: content-box, border-box;
}
</style>
