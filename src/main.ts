import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import 'virtual:windi-devtools'
import { createPinia } from 'pinia'
import './assets/main.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
