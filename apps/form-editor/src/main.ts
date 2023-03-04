import "@total-typescript/ts-reset";

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Icon } from '@iconify/vue';
import { useModules } from '@nmyvision/fresca'
import { useLocalComponents } from './components'
import { useLayouts } from './layouts'

import App from './App.vue'
import router from './router'

// register tailwind css
import './assets/main.css'

// load modules
import "../modules"

const app = createApp(App)

// add pinia stores
app.use(createPinia())

// router
app.use(router)

// modules, must be after use(router)
app.use(useModules, router)

// local layouts
app.use(useLayouts)

// local components
app.use(useLocalComponents)

// 3rd party components
app.component('Icon', Icon)

app.mount('#app')