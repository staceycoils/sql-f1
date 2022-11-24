import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

const app = createApp(App);

app.config.errorHandler = (err) => {
    throw new Error(err)
    console.log(err)
};

app.mount('#app');
