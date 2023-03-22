import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'
import Notifications from '@kyvg/vue3-notification'

// Create Pinia Instance
const pinia = createPinia()

createApp(App).use(Notifications).use(router).use(pinia).mount('#app')
