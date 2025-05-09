import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '@/assets/scss/theme.scss';
import '@splidejs/vue-splide/css';
import '@splidejs/vue-splide/css/core';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
