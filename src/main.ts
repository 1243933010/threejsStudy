import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'

import App from './App.vue'
import router from './router'

// import './assets/main.css'
// import './assets/index.css'
import 'element-plus/dist/index.css'

// import { validateLogin } from './common/validateLogin'

const app = createApp(App)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)
// validateLogin();
app.mount('#app')
