import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

const app = createApp(App);

app.config.errorHandler = (err) => {
    console.log(err)
};

// app.component('TodoDeleteButton', TodoDeleteButton);

app.mount('#app');
