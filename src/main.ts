import './assets/main.css'
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import it from './i18n/locales/it.json'
import en from './i18n/locales/en.json'

const app = createApp(App)
const messages = { en, it }

const i18n = createI18n({
    legacy: false,
    locale: 'it',
    fallbackLocale: 'en',
    messages
})

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
app.use(i18n)
app.use(createPinia())
app.use(router)

app.mount('#app')
