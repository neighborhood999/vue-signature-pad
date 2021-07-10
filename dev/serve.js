import { createApp } from 'vue';

import Dev from './serve.vue';
import VueSignaturePad from '../src/entry.esm';

const app = createApp(Dev);

app.use(VueSignaturePad);
app.mount('#app');
