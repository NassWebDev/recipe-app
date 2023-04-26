import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { RiEdit2Fill } from "oh-vue-icons/icons";

addIcons(RiEdit2Fill); 

createApp(App).use(createPinia()).use(router).component("fa", OhVueIcon).mount('#app')
