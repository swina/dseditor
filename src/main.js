import './assets/base.css'
import './index.css'
import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import DialogService from 'primevue/dialogservice';
const app = createApp(App)
app.mount('#app')
app.use(PrimeVue)
app.use(DialogService);
// app.component('t-button',TButton)