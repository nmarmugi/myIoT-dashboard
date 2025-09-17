import './assets/main.css'
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import Toast from 'primevue/toast'; 
import ToastService from 'primevue/toastservice';
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Stile di default per la libreria UI PrimeVue
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    }
});
app.use(ToastService);
app.component('Toast', Toast);
app.use(createPinia())
app.use(router)

app.mount('#app')
